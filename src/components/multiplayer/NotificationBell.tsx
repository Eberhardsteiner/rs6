// src/components/multiplayer/NotificationBell.tsx
import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Check, X, Volume2, VolumeX, Monitor } from 'lucide-react';
import { NotificationService } from '@/services/notificationService';
import type { Notification } from '@/services/notificationService';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [desktopEnabled, setDesktopEnabled] = useState(false);
  
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    // Load initial notifications
    setNotifications(notificationService.getAll());
    
    // Subscribe to new notifications
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 20));
    });

    // Check settings
    const settings = localStorage.getItem('notification_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      setSoundEnabled(parsed.soundEnabled ?? true);
      setDesktopEnabled(parsed.desktopEnabled ?? false);
    }

    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      // Mark all as read when opening
      setTimeout(() => {
        notifications.forEach(n => {
          notificationService.markAsRead(n.id);
        });
        setNotifications([...notifications]);
      }, 1000);
    }
  };

  const handleClearAll = () => {
    notificationService.removeAll();
    setNotifications([]);
  };

  const handleRemove = (id: string) => {
    notificationService.remove(id);
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleToggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    notificationService.setSoundEnabled(newValue);
  };

  const handleToggleDesktop = async () => {
    const newValue = !desktopEnabled;
    
    if (newValue && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setDesktopEnabled(true);
        notificationService.setDesktopEnabled(true);
      }
    } else {
      setDesktopEnabled(false);
      notificationService.setDesktopEnabled(false);
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'decision': return '🎯';
      case 'chat': return '💬';
      case 'day_change': return '📅';
      default: return 'ℹ️';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'decision': return '#8b5cf6';
      case 'chat': return '#3b82f6';
      case 'day_change': return '#6366f1';
      default: return '#6b7280';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Gerade eben';
    if (minutes < 60) return `vor ${minutes} Min.`;
    if (hours < 24) return `vor ${hours} Std.`;
    if (days < 7) return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Icon */}
      <button
        onClick={handleToggleDropdown}
        style={{
          position: 'relative',
          padding: '8px',
          background: unreadCount > 0 ? '#fee2e2' : '#f3f4f6',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Bell 
          size={20} 
          color={unreadCount > 0 ? '#ef4444' : '#6b7280'}
        />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: -4,
            right: -4,
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: 18,
            height: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 8,
          width: 360,
          maxHeight: 500,
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          zIndex: 1001
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f9fafb'
          }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>Benachrichtigungen</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  padding: '4px 8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                title="Einstellungen"
              >
                ⚙️
              </button>
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  style={{
                    padding: '4px 8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                  title="Alle löschen"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div style={{
              padding: 16,
              background: '#f3f4f6',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    Ton-Benachrichtigungen
                  </span>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={handleToggleSound}
                    style={{ cursor: 'pointer' }}
                  />
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Monitor size={16} />
                    Desktop-Benachrichtigungen
                  </span>
                  <input
                    type="checkbox"
                    checked={desktopEnabled}
                    onChange={handleToggleDesktop}
                    style={{ cursor: 'pointer' }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div style={{
            maxHeight: showSettings ? 300 : 400,
            overflowY: 'auto'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: 40,
                textAlign: 'center',
                color: '#9ca3af'
              }}>
                <BellOff size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                <div>Keine Benachrichtigungen</div>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f3f4f6',
                    background: notification.read ? 'white' : '#f0f9ff',
                    position: 'relative',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.read ? 'white' : '#f0f9ff';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: 12
                  }}>
                    <div style={{
                      fontSize: 20,
                      flexShrink: 0
                    }}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: notification.read ? 400 : 600,
                        fontSize: 14,
                        marginBottom: 4,
                        color: '#111827'
                      }}>
                        {notification.title}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 4
                      }}>
                        {notification.message}
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: '#9ca3af'
                      }}>
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(notification.id);
                      }}
                      style={{
                        padding: 4,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                        opacity: 0.5
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.5';
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Colored indicator bar */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: getTypeColor(notification.type)
                  }} />
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '8px 16px',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
              fontSize: 12,
              color: '#6b7280',
              textAlign: 'center'
            }}>
              {unreadCount > 0 
                ? `${unreadCount} ungelesene Benachrichtigung${unreadCount !== 1 ? 'en' : ''}`
                : 'Alle Benachrichtigungen gelesen'
              }
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {showDropdown && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}