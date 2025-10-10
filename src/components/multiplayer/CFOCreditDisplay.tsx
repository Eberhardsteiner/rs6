import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

interface CreditRecord {
  id: string;
  game_id: string;
  day: number;
  role: string;
  amount: number;
  interest_rate: number;
  created_at: string;
}

interface CFOCreditDisplayProps {
  gameId: string;
  currentDay: number;
}

export default function CFOCreditDisplay({ gameId, currentDay }: CFOCreditDisplayProps) {
  const [creditRecords, setCreditRecords] = useState<CreditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCreditHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('game_credit_history')
        .select('*')
        .eq('game_id', gameId)
        .eq('role', 'CFO')
        .order('day', { ascending: true })
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Error loading credit history:', fetchError);
        setError('Fehler beim Laden der Kredithistorie');
        return;
      }

      setCreditRecords(data || []);
    } catch (err) {
      console.error('Unexpected error loading credit history:', err);
      setError('Unerwarteter Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreditHistory();
  }, [gameId]);

  useEffect(() => {
    const channel = supabase
      .channel(`credit_history_${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_credit_history',
          filter: `game_id=eq.${gameId}`
        },
        (payload) => {
          const newRecord = payload.new as CreditRecord;
          if (newRecord.role === 'CFO') {
            setCreditRecords(prev => [...prev, newRecord].sort((a, b) => {
              if (a.day !== b.day) return a.day - b.day;
              return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  const recordsByDay = creditRecords.reduce((acc, record) => {
    if (!acc[record.day]) {
      acc[record.day] = [];
    }
    acc[record.day].push(record);
    return acc;
  }, {} as Record<number, CreditRecord[]>);

  const todaysRecords = recordsByDay[currentDay] || [];
  const historicalDays = Object.keys(recordsByDay)
    .map(Number)
    .filter(day => day < currentDay)
    .sort((a, b) => b - a);

  const totalCredit = creditRecords.reduce((sum, record) => sum + Number(record.amount), 0);
  const todaysTotal = todaysRecords.reduce((sum, record) => sum + Number(record.amount), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💰 CFO-Kreditaufnahme</h3>
        <div style={{ color: '#6b7280', fontSize: 14 }}>Lade Kredithistorie...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💰 CFO-Kreditaufnahme</h3>
        <div style={{ color: '#ef4444', fontSize: 14 }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
      <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>💰 CFO-Kreditaufnahme</span>
        {totalCredit > 0 && (
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#dc2626',
            background: '#fee2e2',
            padding: '4px 12px',
            borderRadius: 6
          }}>
            Gesamt: {formatCurrency(totalCredit)}
          </span>
        )}
      </h3>

      {creditRecords.length === 0 ? (
        <div style={{
          padding: 24,
          textAlign: 'center',
          color: '#6b7280',
          background: '#f9fafb',
          borderRadius: 8,
          fontSize: 14
        }}>
          ✓ Der CFO hat bisher keine Kredite aufgenommen
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {todaysRecords.length > 0 && (
            <div style={{
              padding: 12,
              background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
              borderRadius: 8,
              border: '2px solid #f59e0b'
            }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#92400e',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>📅 Tag {currentDay} (heute)</span>
                <span style={{ color: '#dc2626' }}>{formatCurrency(todaysTotal)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {todaysRecords.map((record) => (
                  <div
                    key={record.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 8,
                      background: 'white',
                      borderRadius: 6,
                      fontSize: 13
                    }}
                  >
                    <span style={{ color: '#78350f' }}>
                      🕐 {formatTime(record.created_at)}
                    </span>
                    <span style={{ fontWeight: 600, color: '#dc2626' }}>
                      {formatCurrency(Number(record.amount))}
                    </span>
                    <span style={{ fontSize: 11, color: '#92400e' }}>
                      {record.interest_rate}% p.a.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {historicalDays.length > 0 && (
            <div>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#6b7280',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                📊 Historie (frühere Tage)
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 8
              }}>
                {historicalDays.map((day) => {
                  const dayRecords = recordsByDay[day];
                  const dayTotal = dayRecords.reduce((sum, r) => sum + Number(r.amount), 0);
                  return (
                    <div
                      key={day}
                      style={{
                        padding: 10,
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: 6,
                        fontSize: 12
                      }}
                    >
                      <div style={{
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>Tag {day}</span>
                        <span style={{
                          fontSize: 10,
                          color: '#6b7280',
                          background: '#e5e7eb',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}>
                          {dayRecords.length}×
                        </span>
                      </div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#dc2626'
                      }}>
                        {formatCurrency(dayTotal)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {totalCredit > 0 && (
            <div style={{
              marginTop: 8,
              padding: 12,
              background: '#fef2f2',
              borderRadius: 8,
              border: '1px solid #fecaca',
              fontSize: 12,
              color: '#991b1b'
            }}>
              <strong>💡 Hinweis:</strong> Die Kreditaufnahme beeinflusst die Liquidität des Spiels.
              Zinsen fallen täglich an und belasten die P&L.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
