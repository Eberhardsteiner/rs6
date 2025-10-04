// src/components/multiplayer/GameChat.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react'; 
import { ChatService } from '@/services/chatService';
import type { ChatMessage } from '@/services/chatService';
import type { RoleId } from '@/core/models/domain';
import { Send, MessageSquare, X, Minimize2, Maximize2, Download } from 'lucide-react';

interface GameChatProps {
  gameId: string;
  playerName: string;
  playerRole: RoleId;
  isGM?: boolean;
}

export default function GameChat({ gameId, playerName, playerRole, isGM }: GameChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [othersTyping, setOthersTyping] = useState<Map<string, boolean>>(new Map());
  const [isMinimized, setIsMinimized] = useState(false);
const [unreadCount, setUnreadCount] = useState(0);
const [showCommands, setShowCommands] = useState(false);

// NEU: State für die Position des Chat-Kastens und den Ziehstatus
const [position, setPosition] = useState({ x: window.innerWidth - 350 - 16, y: window.innerHeight - 450 - 16 }); // Startposition (rechts unten)
const [isDragging, setIsDragging] = useState(false);
const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Offset vom Mauszeiger zur Ecke des Kastens

const chatBoxRef = useRef<HTMLDivElement>(null); // NEU: Referenz für den Chat-Kasten


  
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const chatService = ChatService.getInstance();

  // Load initial messages and subscribe to updates
  useEffect(() => {
    loadMessages();
    
    chatService.subscribeToMessages(
      (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
        
        // Increment unread count if minimized
        if (isMinimized && chatService.shouldNotifyForMessage(newMessage, playerRole)) {
          setUnreadCount(prev => prev + 1);
        }
        
        // Play notification sound (optional)
        if (chatService.shouldNotifyForMessage(newMessage, playerRole)) {
          playNotificationSound();
        }
      },
      (typingMap) => {
        setOthersTyping(typingMap);
      }
    );

    return () => {
      chatService.unsubscribe();
    };
  }, [gameId, playerRole]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
// Auto-scroll to bottom
useEffect(() => { /* ... */ }, [messages]);

// NEU: Globale Event-Listener für das Ziehen
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (isDragging) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  } else {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, [isDragging, dragOffset]); // Abhängigkeiten von isDragging und dragOffset

  // Clear unread when opened
  useEffect(() => {
    if (!isMinimized) {
      setUnreadCount(0);
    }
  }, [isMinimized]);

  const loadMessages = async () => {
    try {
      const history = await chatService.getMessages(50);
      setMessages(history);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    // Simple beep using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      // Ignore audio errors
    }
  };


// NEU: Event-Handler für das Ziehen des Chat-Kastens
const handleMouseDown = useCallback((e: React.MouseEvent) => {
  if (isMinimized) return; // Nur im maximierten Zustand verschiebbar

  setIsDragging(true);
  if (chatBoxRef.current) {
    setDragOffset({
      x: e.clientX - chatBoxRef.current.offsetLeft,
      y: e.clientY - chatBoxRef.current.offsetTop,
    });
  }
  e.preventDefault(); // Verhindert Textauswahl beim Ziehen
}, [isMinimized]); // Abhängigkeit von isMinimized

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const content = inputValue.trim();
    
    // Check for commands
    if (content.startsWith('/')) {
      await handleCommand(content);
      setInputValue('');
      return;
    }

    try {
      await chatService.sendMessage(content);
      setInputValue('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCommand = async (command: string) => {
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case '/help':
        setShowCommands(true);
        break;
        
      case '/announce':
        if (isGM && args) {
          await chatService.sendAnnouncement(args);
        }
        break;
        
      case '/system':
        if (isGM && args) {
          await chatService.sendSystemMessage(args);
        }
        break;
        
      case '/role':
        // Send message to specific role
        const [targetRole, ...messageParts] = args.split(' ');
        if (targetRole && messageParts.length > 0) {
          await chatService.sendRoleMessage(
            messageParts.join(' '),
            targetRole as RoleId
          );
        }
        break;
        
      case '/export':
        await handleExportChat();
        break;
        
      case '/clear':
        setMessages([]);
        break;
        
      case '/stats':
        await showChatStats();
        break;
        
      default:
        await chatService.sendSystemMessage(`Unbekannter Befehl: ${cmd}`);
    }
  };

  const handleExportChat = async () => {
    try {
      const log = await chatService.exportChatLog();
      const blob = new Blob([log], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-log-${gameId}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting chat:', error);
    }
  };

  const showChatStats = async () => {
    try {
      const stats = await chatService.getChatStats();
      const message = `📊 Chat-Statistiken:
• Nachrichten gesamt: ${stats.totalMessages}
• Nach Typ: Chat: ${stats.messagesByType.chat}, System: ${stats.messagesByType.system}, Ankündigungen: ${stats.messagesByType.announcement}
• Aktivster Spieler: ${stats.mostActivePlayer || 'N/A'}`;
      
      await chatService.sendSystemMessage(message);
    } catch (error) {
      console.error('Error getting stats:', error);
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      chatService.setTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      chatService.setTyping(false);
    }, 2000);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const roleColors: Record<RoleId, string> = {
    CEO: '#0ea5e9',
    CFO: '#10b981',
    OPS: '#f59e0b',
    HRLEGAL: '#8b5cf6'
  };

  // Minimized view
  if (isMinimized) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: '#3b82f6',
          color: 'white',
          padding: '12px 16px',
          borderRadius: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 1000
        }}
        onClick={() => setIsMinimized(false)}
      >
        <MessageSquare size={20} />
        <span>Chat</span>
        {unreadCount > 0 && (
          <span style={{
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600
          }}>
            {unreadCount}
          </span>
        )}
      </div>
    );
  }

// Full chat view
return (
  <div
    ref={chatBoxRef} // <-- NEU: Referenz hinzufügen
    style={{
      position: 'fixed',
      top: position.y, // <-- NEU: top statt bottom
      left: position.x, // <-- NEU: left statt right
      width: 350,
      height: 450,
      background: 'white',
      borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      border: '1px solid #e5e7eb',
      cursor: isDragging ? 'grabbing' : 'grab', // <-- NEU: Cursor-Stil
      userSelect: 'none', // <-- NEU: Verhindert Textauswahl beim Ziehen
    }}
  >

     {/* Header */}
<div
  onMouseDown={handleMouseDown} // <-- NEU: onMouseDown-Handler hinzufügen
  style={{
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: isDragging ? 'grabbing' : 'grab', // <-- NEU: Cursor-Stil auch hier anpassen
  }}
>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageSquare size={18} />
          <span style={{ fontWeight: 600 }}>Team Chat</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleExportChat}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: 4
            }}
            title="Chat exportieren"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: 4
            }}
          >
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
        {messages.map(message => {
          const formatted = ChatService.formatMessage(message);
          const isOwnMessage = message.player?.name === playerName;
          
          return (
            <div
              key={message.id}
              style={{
                display: 'flex',
                flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                gap: 8,
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '70%',
                padding: '8px 12px',
                background: isOwnMessage ? '#3b82f6' : '#f3f4f6',
                color: isOwnMessage ? 'white' : '#374151',
                borderRadius: 8,
                borderTopLeftRadius: isOwnMessage ? 8 : 2,
                borderTopRightRadius: isOwnMessage ? 2 : 8
              }}>
                <div style={{
                  fontSize: 11,
                  opacity: 0.8,
                  marginBottom: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  {formatted.icon && <span>{formatted.icon}</span>}
                  <span style={{ fontWeight: 600 }}>
                    {formatted.displayName}
                  </span>
                  <span>• {formatTimestamp(message.created_at)}</span>
                </div>
                <div style={{ fontSize: 14, wordBreak: 'break-word' }}>
                  {formatted.displayContent}
                </div>
                {message.metadata?.is_private && (
                  <div style={{
                    fontSize: 11,
                    opacity: 0.8,
                    marginTop: 4,
                    fontStyle: 'italic'
                  }}>
                    Privat an {message.metadata.target_role}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Typing indicators */}
        {othersTyping.size > 0 && (
          <div style={{
            fontSize: 12,
            color: '#9ca3af',
            fontStyle: 'italic',
            marginLeft: 8
          }}>
            Jemand tippt...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: 12,
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        gap: 8
      }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleTyping();
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Nachricht eingeben... (/help für Befehle)"
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
            fontSize: 14,
            outline: 'none'
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          style={{
            padding: '8px 12px',
            background: inputValue.trim() ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Send size={16} />
        </button>
      </div>

      {/* Command help modal */}
      {showCommands && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          padding: 16
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: 16,
            maxWidth: '90%'
          }}>
            <h3 style={{ margin: '0 0 12px' }}>Chat-Befehle</h3>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <div><strong>/help</strong> - Diese Hilfe anzeigen</div>
              <div><strong>/clear</strong> - Chat leeren (nur lokal)</div>
              <div><strong>/export</strong> - Chat als Textdatei exportieren</div>
              <div><strong>/stats</strong> - Chat-Statistiken anzeigen</div>
              <div><strong>/role [rolle] [text]</strong> - Nachricht an Rolle</div>
              {isGM && (
                <>
                  <div><strong>/announce [text]</strong> - Ankündigung senden</div>
                  <div><strong>/system [text]</strong> - Systemnachricht senden</div>
                </>
              )}
            </div>
            <button
              onClick={() => setShowCommands(false)}
              style={{
                marginTop: 12,
                padding: '6px 12px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}