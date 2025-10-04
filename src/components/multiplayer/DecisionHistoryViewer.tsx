// src/components/multiplayer/DecisionHistoryViewer.tsx
import React, { useState, useEffect } from 'react';
import { DecisionQueueService } from '@/services/decisionQueueService';
import type { QueuedDecision } from '@/services/decisionQueueService';
import type { RoleId } from '@/core/models/domain';

interface DecisionHistoryViewerProps {
  gameId: string;
  role: RoleId;
  currentDay: number;
  onClose: () => void;
}

export default function DecisionHistoryViewer({
  gameId,
  role,
  currentDay,
  onClose
}: DecisionHistoryViewerProps) {
  const [decisions, setDecisions] = useState<QueuedDecision[]>([]);
  const [filteredDecisions, setFilteredDecisions] = useState<QueuedDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<RoleId | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'summary'>('list');

  const dqService = DecisionQueueService.getInstance();
  const visibilityRules = DecisionQueueService.getVisibilityRules()[role];

  useEffect(() => {
    loadDecisionHistory();
  }, [gameId]);

  useEffect(() => {
    filterDecisions();
  }, [decisions, selectedDay, selectedRole]);

  const loadDecisionHistory = async () => {
    setLoading(true);
    try {
      const history = await dqService.getDecisionHistory(gameId);
      
      // Filter based on visibility rules
      const visibleDecisions = history.filter(decision => {
        // Own decisions always visible
        const isOwn = decision.decision_metadata?.role === role;
        if (isOwn) return true;

        // CEO sees all past decisions
        if (role === 'CEO' && decision.day < currentDay) return true;

        // Other roles see decisions affecting their KPIs from past days
        if (decision.day < currentDay && decision.kpi_delta) {
          return visibilityRules.canSee(decision.kpi_delta);
        }

        return false;
      });

      setDecisions(visibleDecisions);
      setFilteredDecisions(visibleDecisions);
    } catch (error) {
      console.error('Error loading decision history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDecisions = () => {
    let filtered = [...decisions];

    if (selectedDay !== 'all') {
      filtered = filtered.filter(d => d.day === selectedDay);
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(d => d.decision_metadata?.role === selectedRole);
    }

    setFilteredDecisions(filtered);
  };

  const exportCSV = async () => {
    try {
      const csv = await dqService.exportDecisionsAsCSV(gameId);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decisions-${gameId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const calculateSummary = () => {
    const summary: Record<RoleId, {
      totalDecisions: number;
      byDay: Record<number, number>;
      totalImpact: {
        cashEUR: number;
        profitLossEUR: number;
        customerLoyalty: number;
        bankTrust: number;
        workforceEngagement: number;
        publicPerception: number;
      };
    }> = {
      CEO: { totalDecisions: 0, byDay: {}, totalImpact: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 } },
      CFO: { totalDecisions: 0, byDay: {}, totalImpact: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 } },
      OPS: { totalDecisions: 0, byDay: {}, totalImpact: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 } },
      HRLEGAL: { totalDecisions: 0, byDay: {}, totalImpact: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 } }
    };

    filteredDecisions.forEach(decision => {
      const decRole = decision.decision_metadata?.role;
      if (!decRole || !(decRole in summary)) return;

      summary[decRole].totalDecisions++;
      
      if (!summary[decRole].byDay[decision.day]) {
        summary[decRole].byDay[decision.day] = 0;
      }
      summary[decRole].byDay[decision.day]++;

      if (decision.kpi_delta) {
        Object.entries(decision.kpi_delta).forEach(([key, value]) => {
          if (typeof value === 'number') {
            summary[decRole].totalImpact[key as keyof typeof summary[typeof decRole]['totalImpact']] += value;
          }
        });
      }
    });

    return summary;
  };

  const formatKpiValue = (key: string, value: number): string => {
    if (key === 'cashEUR' || key === 'profitLossEUR') {
      return `${value > 0 ? '+' : ''}${value.toLocaleString('de-DE')}€`;
    }
    return `${value > 0 ? '+' : ''}${value}`;
  };

  const roleColors: Record<RoleId, string> = {
    CEO: '#0ea5e9',
    CFO: '#10b981',
    OPS: '#f59e0b',
    HRLEGAL: '#8b5cf6'
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal" 
        onClick={e => e.stopPropagation()}
        style={{ 
          maxWidth: '900px', 
          width: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: 16
        }}>
          <h2 style={{ margin: 0 }}>📊 Entscheidungs-Historie</h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Schließen
          </button>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 20,
          flexWrap: 'wrap'
        }}>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            style={{ padding: '6px 12px', borderRadius: 6 }}
          >
            <option value="all">Alle Tage</option>
            {Array.from({ length: currentDay }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>Tag {day}</option>
            ))}
          </select>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as RoleId | 'all')}
            style={{ padding: '6px 12px', borderRadius: 6 }}
          >
            <option value="all">Alle Rollen</option>
            <option value="CEO">CEO</option>
            <option value="CFO">CFO</option>
            <option value="OPS">OPS</option>
            <option value="HRLEGAL">HR/Legal</option>
          </select>

          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '6px 12px',
                background: viewMode === 'list' ? '#3b82f6' : '#e5e7eb',
                color: viewMode === 'list' ? 'white' : '#374151',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              📋 Liste
            </button>
            <button
              onClick={() => setViewMode('summary')}
              style={{
                padding: '6px 12px',
                background: viewMode === 'summary' ? '#3b82f6' : '#e5e7eb',
                color: viewMode === 'summary' ? 'white' : '#374151',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              📊 Zusammenfassung
            </button>
            <button
              onClick={exportCSV}
              style={{
                padding: '6px 12px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              📥 CSV Export
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 4px'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
              Lade Entscheidungen...
            </div>
          ) : viewMode === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredDecisions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
                  Keine Entscheidungen gefunden
                </div>
              ) : (
                filteredDecisions.map(decision => (
                  <div
                    key={decision.id}
                    style={{
                      padding: 12,
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      background: '#fff'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8
                    }}>
                      <div>
                        <span style={{
                          padding: '2px 6px',
                          background: roleColors[decision.decision_metadata?.role as RoleId] || '#6b7280',
                          color: 'white',
                          borderRadius: 4,
                          fontSize: 12,
                          marginRight: 8
                        }}>
                          {decision.decision_metadata?.role}
                        </span>
                        <span style={{ fontWeight: 600 }}>
                          {decision.decision_metadata?.block_title || decision.block_id}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>
                        Tag {decision.day}
                      </span>
                    </div>

                    <div style={{ fontSize: 14, marginBottom: 8 }}>
                      {decision.option_id ? (
                        <>
                          Option <strong>{decision.option_id.toUpperCase()}</strong>
                          {decision.decision_metadata?.option_label && 
                            `: ${decision.decision_metadata.option_label}`}
                        </>
                      ) : decision.custom_text ? (
                        <>Custom: "{decision.custom_text}"</>
                      ) : (
                        'Keine Auswahl'
                      )}
                    </div>

                    {decision.kpi_delta && Object.keys(decision.kpi_delta).length > 0 && (
                      <div style={{
                        fontSize: 12,
                        color: '#6b7280',
                        display: 'flex',
                        gap: 12,
                        flexWrap: 'wrap'
                      }}>
                        {Object.entries(decision.kpi_delta).map(([key, value]) => {
                          if (typeof value !== 'number' || value === 0) return null;
                          
                          // Check if this KPI is visible to the current role
                          if (!visibilityRules.visibleKpis.includes(key as any)) {
                            return null;
                          }

                          return (
                            <span key={key}>
                              {key.replace('EUR', '')}: {formatKpiValue(key, value)}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            // Summary View
            <div>
              {Object.entries(calculateSummary()).map(([roleKey, data]) => {
                if (data.totalDecisions === 0) return null;

                return (
                  <div
                    key={roleKey}
                    style={{
                      marginBottom: 24,
                      padding: 16,
                      border: '1px solid #e5e7eb',
                      borderRadius: 8
                    }}
                  >
                    <h3 style={{
                      margin: '0 0 12px',
                      color: roleColors[roleKey as RoleId]
                    }}>
                      {roleKey} - {data.totalDecisions} Entscheidungen
                    </h3>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: 12,
                      marginBottom: 12
                    }}>
                      {visibilityRules.visibleKpis.map(kpiKey => {
                        const value = data.totalImpact[kpiKey as keyof typeof data.totalImpact];
                        if (value === 0) return null;

                        return (
                          <div
                            key={kpiKey}
                            style={{
                              padding: 8,
                              background: '#f3f4f6',
                              borderRadius: 6
                            }}
                          >
                            <div style={{ fontSize: 12, color: '#6b7280' }}>
                              {kpiKey.replace('EUR', '')}
                            </div>
                            <div style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: value > 0 ? '#10b981' : '#ef4444'
                            }}>
                              {formatKpiValue(kpiKey, value)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Entscheidungen pro Tag: {
                        Object.entries(data.byDay)
                          .sort(([a], [b]) => Number(a) - Number(b))
                          .map(([day, count]) => `T${day}: ${count}`)
                          .join(', ')
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}