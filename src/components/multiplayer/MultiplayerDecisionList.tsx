// src/components/multiplayer/MultiplayerDecisionList.tsx
import React, { useState, useEffect } from 'react';
import { DecisionQueueService } from '@/services/decisionQueueService';
import type { DecisionBlock, RoleId } from '@/core/models/domain';
import type { QueuedDecision } from '@/services/decisionQueueService';
import AttachmentModal from '@/components/dialogs/AttachmentModal'; // NEU: Import der AttachmentModal-Komponente
import { attachmentContents } from '@/data/attachmentContents'; // NEU: Import der Attachment-Inhalte


interface MultiplayerDecisionListProps {
  blocks: DecisionBlock[];
  day: number;
  role: RoleId;
  currentGameDay: number;
  onDecisionMade?: () => void;
}

export default function MultiplayerDecisionList({
  blocks,
  day,
  role,
  currentGameDay,
  onDecisionMade
}: MultiplayerDecisionListProps) {
  const [selectedOptions, setSelectedOptions] = useState<Map<string, 'a' | 'b' | 'c' | 'd'>>(new Map());
  const [customTexts, setCustomTexts] = useState<Map<string, string>>(new Map());
  const [submitting, setSubmitting] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());
  const [otherDecisions, setOtherDecisions] = useState<QueuedDecision[]>([]);
  const [myDecisions, setMyDecisions] = useState<QueuedDecision[]>([]);
  const [showAttachment, setShowAttachment] = useState<string | null>(null); // NEU: State für das Attachment-Modal

  const dqService = DecisionQueueService.getInstance();

  // Load existing decisions
  useEffect(() => {
    const loadDecisions = async () => {
      try {
        // Load my decisions for today
        const myDecs = await dqService.getMyDecisionsForDay(day);
        setMyDecisions(myDecs);
        
        // Pre-fill selections
        const selections = new Map<string, 'a' | 'b' | 'c' | 'd'>();
        const texts = new Map<string, string>();
        const submittedSet = new Set<string>();
        
        myDecs.forEach(dec => {
          if (dec.option_id) {
            selections.set(dec.block_id, dec.option_id);
          }
          if (dec.custom_text) {
            texts.set(dec.block_id, dec.custom_text);
          }
          submittedSet.add(dec.block_id);
        });
        
        setSelectedOptions(selections);
        setCustomTexts(texts);
        setSubmitted(submittedSet);
        
        // Load visible decisions from others (only if viewing previous day)
        if (day < currentGameDay) {
          const gameId = localStorage.getItem('mp_current_game');
          if (gameId) {
            const visible = await dqService.getVisibleDecisions(
              gameId,
              day,
              role,
              currentGameDay
            );
            setOtherDecisions(visible.filter(d => !myDecs.some(md => md.id === d.id)));
          }
        }
      } catch (error) {
        console.error('Error loading decisions:', error);
      }
    };

    loadDecisions();
  }, [day, role, currentGameDay]);

  // NEU: Handler für das Attachment-Modal
  const handleAttachmentClick = (filename: string) => {
    const content = attachmentContents[filename];
    if (content) {
      setShowAttachment(filename);
    }
  };

  const closeAttachment = () => {
    setShowAttachment(null);
  };

  const handleOptionSelect = async (block: DecisionBlock, optionId: 'a' | 'b' | 'c' | 'd') => {
    // Update local state immediately
    setSelectedOptions(prev => new Map(prev).set(block.id, optionId));
    
    // Submit to backend
    setSubmitting(prev => new Set(prev).add(block.id));
    
    try {
      await dqService.submitDecision(block, optionId, customTexts.get(block.id));
      setSubmitted(prev => new Set(prev).add(block.id));
      if (onDecisionMade) onDecisionMade();
    } catch (error) {
      console.error('Error submitting decision:', error);
      // Revert selection on error
      setSelectedOptions(prev => {
        const next = new Map(prev);
        next.delete(block.id);
        return next;
      });
    } finally {
      setSubmitting(prev => {
        const next = new Set(prev);
        next.delete(block.id);
        return next;
      });
    }
  };

  const handleCustomText = async (block: DecisionBlock, text: string) => {
    setCustomTexts(prev => new Map(prev).set(block.id, text));
  };

  const submitCustomText = async (block: DecisionBlock) => {
    const text = customTexts.get(block.id);
    if (!text?.trim()) return;
    
    setSubmitting(prev => new Set(prev).add(block.id));
    
    try {
      await dqService.submitDecision(block, null, text);
      setSubmitted(prev => new Set(prev).add(block.id));
      if (onDecisionMade) onDecisionMade();
    } catch (error) {
      console.error('Error submitting custom text:', error);
    } finally {
      setSubmitting(prev => {
        const next = new Set(prev);
        next.delete(block.id);
        return next;
      });
    }
  };

  // Filter decisions visible to current role
  const getVisibleOtherDecisions = (blockId: string): QueuedDecision[] => {
    return otherDecisions.filter(d => d.block_id === blockId);
  };

  const formatKpiDelta = (delta: Partial<typeof blocks[0]['options'][0]['kpiDelta']>) => {
    if (!delta) return null;
    
    const visibilityRules = DecisionQueueService.getVisibilityRules()[role];
    const parts: string[] = [];
    
    if (visibilityRules.visibleKpis.includes('cashEUR') && delta.cashEUR) {
      parts.push(`Cash: ${delta.cashEUR > 0 ? '+' : ''}${delta.cashEUR}€`);
    }
    if (visibilityRules.visibleKpis.includes('profitLossEUR') && delta.profitLossEUR) {
      parts.push(`P&L: ${delta.profitLossEUR > 0 ? '+' : ''}${delta.profitLossEUR}€`);
    }
    if (visibilityRules.visibleKpis.includes('customerLoyalty') && delta.customerLoyalty) {
      parts.push(`Kunden: ${delta.customerLoyalty > 0 ? '+' : ''}${delta.customerLoyalty}`);
    }
    if (visibilityRules.visibleKpis.includes('bankTrust') && delta.bankTrust) {
      parts.push(`Bank: ${delta.bankTrust > 0 ? '+' : ''}${delta.bankTrust}`);
    }
    if (visibilityRules.visibleKpis.includes('workforceEngagement') && delta.workforceEngagement) {
      parts.push(`Mitarbeiter: ${delta.workforceEngagement > 0 ? '+' : ''}${delta.workforceEngagement}`);
    }
    if (visibilityRules.visibleKpis.includes('publicPerception') && delta.publicPerception) {
      parts.push(`Öffentlich: ${delta.publicPerception > 0 ? '+' : ''}${delta.publicPerception}`);
    }
    
    return parts.length > 0 ? parts.join(', ') : null;
  };

  return (
    <div className="multiplayer-decisions">
      {blocks.map(block => {
        const selectedOption = selectedOptions.get(block.id);
        const isSubmitting = submitting.has(block.id);
        const isSubmitted = submitted.has(block.id);
        const visibleOthers = getVisibleOtherDecisions(block.id);
        
        return (
          <div 
            key={block.id} 
            className="decision-block"
            style={{
              padding: 16,
              marginBottom: 16,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              background: isSubmitted ? '#f0fdf4' : '#fff'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12 
            }}>
              <h4 style={{ margin: 0 }}>{block.title}</h4>
              {isSubmitted && (
                <span style={{
                  padding: '2px 8px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  ✓ Eingereicht
                </span>
              )}
            </div>

            <p style={{ color: '#6b7280', marginBottom: 12 }}>{block.description}</p>

            {/* Show other players' decisions if viewing past day */}
            {visibleOthers.length > 0 && (
              <div style={{
                marginBottom: 12,
                padding: 8,
                background: '#f3f4f6',
                borderRadius: 6,
                fontSize: 14
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  Andere Entscheidungen:
                </div>
                {visibleOthers.map(dec => (
                  <div key={dec.id} style={{ marginLeft: 8, color: '#6b7280' }}>
                    • {(dec as any).player?.name} ({dec.decision_metadata?.role}): 
                    {dec.option_id ? ` Option ${dec.option_id.toUpperCase()}` : ' Custom'}
                    {dec.decision_metadata?.option_label && 
                      ` - ${dec.decision_metadata.option_label}`}
                  </div>
                ))}
              </div>
            )}

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {block.options.map(option => {
                const isSelected = selectedOptions.get(block.id) === option.id;
                // const deltaStr = formatKpiDelta(option.kpiDelta); // Diese Zeile wird nicht mehr benötigt, da KPI-Auswirkungen nicht angezeigt werden

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(block, option.id as 'a' | 'b' | 'c' | 'd')}
                    disabled={isSubmitting || (day !== currentGameDay)}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                      borderRadius: 6,
                      background: isSelected ? '#eff6ff' : '#fff',
                      cursor: (isSubmitting || day !== currentGameDay) ? 'not-allowed' : 'pointer',
                      opacity: (isSubmitting || day !== currentGameDay) ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: isSelected ? 600 : 400 }}>
                      {option.id.toUpperCase()}. {option.label}
                    </div>
                    {/* Der div-Block für deltaStr wurde hier entfernt. */}
                    {/* Die KPI-Auswirkungen werden nicht mehr angezeigt. */}
                  </button>
                );
              })}
            </div>

            {/* Custom Text Option */}
            {block.allowCustom && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                  Oder eigene Antwort:
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <textarea
                    value={customTexts.get(block.id) || ''}
                    onChange={(e) => handleCustomText(block, e.target.value)}
                    disabled={day !== currentGameDay}
                    placeholder="Ihre Antwort..."
                    style={{
                      flex: 1,
                      padding: 8,
                      minHeight: 60,
                      resize: 'vertical',
                      borderRadius: 6,
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <button
                    onClick={() => submitCustomText(block)}
                    disabled={
                      isSubmitting || 
                      day !== currentGameDay || 
                      !customTexts.get(block.id)?.trim()
                    }
                    style={{
                      padding: '8px 16px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      opacity: (isSubmitting || !customTexts.get(block.id)?.trim()) ? 0.6 : 1
                    }}
                  >
                    {isSubmitting ? 'Sende...' : 'Senden'}
                  </button>
                </div>
              </div>
            )}

            {/* Attachments */}
            {block.attachments && block.attachments.length > 0 && (
              <div style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>
                📎 Anlagen:{" "}
                {block.attachments.map((attachment, index) => (
                  <React.Fragment key={attachment}>
                    {index > 0 && <span style={{ color: 'var(--muted)' }}>, </span>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Verhindert, dass der übergeordnete Block geklickt wird
                        handleAttachmentClick(attachment); // NEU: Aufruf des Handlers
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0ea5e9',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: 'inherit',
                        padding: 0,
                        fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0369a1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#0ea5e9';
                      }}
                    >
                      {attachment}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {blocks.length === 0 && (
        <div style={{
          padding: 24,
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          Keine Entscheidungen für diese Rolle an Tag {day}
        </div>
      )}

      {day !== currentGameDay && blocks.length > 0 && (
        <div style={{
          padding: 12,
          background: '#fef3c7',
          borderRadius: 6,
          textAlign: 'center',
          color: '#92400e'
        }}>
          ⚠️ Dies ist ein vergangener Tag. Entscheidungen können nicht mehr geändert werden.
        </div>
      )}
      {/* NEU: Attachment Modal wird hier gerendert */}
      {showAttachment && attachmentContents[showAttachment] && (
        <AttachmentModal
          title={attachmentContents[showAttachment].title}
          content={attachmentContents[showAttachment].content}
          onClose={closeAttachment}
        />
      )}
    </div>
  );
}
