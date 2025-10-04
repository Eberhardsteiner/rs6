// src/components/multiplayer/ConnectionStatus.tsx
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { ReconnectionHandler } from '@/services/reconnectionHandler';
import type { ConnectionStatus as Status } from '@/services/reconnectionHandler';

export default function ConnectionStatus() {
  const [status, setStatus] = useState<Status>({
    connected: false,
    reconnecting: false,
    lastConnected: null,
    attemptCount: 0
  });
  const [showDetails, setShowDetails] = useState(false);
  
  const reconnectionHandler = ReconnectionHandler.getInstance();

  useEffect(() => {
    const unsubscribe = reconnectionHandler.subscribeToStatus(setStatus);
    return unsubscribe;
  }, []);

  const getStatusColor = (): string => {
    if (status.connected) return '#10b981';
    if (status.reconnecting) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusText = (): string => {
    if (status.connected) return 'Verbunden';
    if (status.reconnecting) return `Verbinde... (Versuch ${status.attemptCount})`;
    return 'Getrennt';
  };

  const getIcon = () => {
    if (status.connected) {
      return <Wifi size={16} />;
    }
    if (status.reconnecting) {
      return <RefreshCw size={16} className="spin" />;
    }
    return <WifiOff size={16} />;
  };

  const handleRetry = () => {
    reconnectionHandler.forceReconnect();
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Status Indicator */}
      <div
        onClick={() => setShowDetails(!showDetails)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          background: status.connected ? '#f0fdf4' : '#fef2f2',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 13,
          transition: 'all 0.2s ease',
          border: `1px solid ${getStatusColor()}20`
        }}
      >
        <div style={{ color: getStatusColor() }}>
          {getIcon()}
        </div>
        <span style={{ 
          color: status.connected ? '#065f46' : '#991b1b',
          fontWeight: 500 
        }}>
          {getStatusText()}
        </span>
      </div>

      {/* Details Dropdown */}
      {showDetails && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 8,
          width: 280,
          background: 'white',
          borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e5e7eb',
          padding: 12,
          zIndex: 1002
        }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Verbindungsstatus</h4>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            fontSize: 12,
            color: '#6b7280'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '4px 0',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <span>Status:</span>
              <span style={{ 
                fontWeight: 600, 
                color: getStatusColor() 
              }}>
                {getStatusText()}
              </span>
            </div>

            {status.lastConnected && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '4px 0',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <span>Letzte Verbindung:</span>
                <span>{status.lastConnected.toLocaleTimeString('de-DE')}</span>
              </div>
            )}

            {status.error && (
              <div style={{
                padding: 8,
                background: '#fee2e2',
                borderRadius: 4,
                color: '#991b1b',
                fontSize: 11
              }}>
                {status.error}
              </div>
            )}

            {!status.connected && !status.reconnecting && (
              <button
                onClick={handleRetry}
                style={{
                  marginTop: 8,
                  padding: '6px 12px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <RefreshCw size={14} />
                Erneut verbinden
              </button>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showDetails && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1001
          }}
          onClick={() => setShowDetails(false)}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
}