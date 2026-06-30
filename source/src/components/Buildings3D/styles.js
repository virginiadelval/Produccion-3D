const styles = {
  panel: {
    position: 'fixed',
    top: '125px', // Aligned below the map controls
    right: '10px',
    width: '320px',
    maxHeight: '75vh',
    overflowY: 'auto',
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
    padding: '16px',
    color: '#444',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    paddingBottom: '8px',
    marginBottom: '4px'
  },
  title: {
    fontWeight: 700,
    fontSize: '14px',
    color: '#004174', // Primary corporate blue
    fontFamily: '"Montserrat", sans-serif'
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: '12px',
    color: '#333',
    marginTop: '6px',
    fontFamily: '"Montserrat", sans-serif'
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '11px',
    color: '#666',
    fontWeight: 500,
    fontFamily: '"Manrope", sans-serif'
  },
  actionButton: {
    backgroundColor: '#004174',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '11.5px',
    textTransform: 'none',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#2859ac'
    }
  },
  toggleButton: {
    width: '29px',
    height: '29px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    color: '#707070',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  }
}

export default styles
