export const adminStyles = {
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.15)',
    padding: '16px 16px 20px'
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  title: {
    margin: '4px 0 8px',
    fontSize: '20px',
    color: '#0f172a'
  },
  sectionTitle: {
    margin: '12px 0 6px',
    fontSize: '16px',
    color: '#0f172a'
  },
  section: {
    marginTop: '12px'
  },
  grid: {
    display: 'grid',
    gap: '10px'
  },
  gridTwo: {
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  gridThree: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  btn: {
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    padding: '8px 12px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    color: '#fff',
    border: '0'
  },
  btnGhost: {
    background: '#f8fafc'
  },
  btnDanger: {
    background: '#fee2e2',
    borderColor: '#fecaca',
    color: '#991b1b'
  },
  sub: {
    fontWeight: '600',
    color: '#0f172a',
    marginTop: '6px',
    fontSize: '14px'
  },
  fab: {
    position: 'fixed' as const,
    right: '20px',
    bottom: '80px',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    border: 'none',
    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(2, 132, 199, 0.3)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  backdrop: {
    position: 'fixed' as const,
    inset: '0',
    background: 'rgba(15, 23, 42, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 10000,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    width: 'min(960px, 96vw)',
    maxHeight: '92vh',
    overflow: 'auto',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
  }
};