const styles = {
  container: {
    height: '10%',
    minHeight: '100vh',
    margin: '0px',
    maxWidth: '100%',
    padding: '0px',
    lineHeight: 1.5
  },
  topMenu: {
    position: 'fixed',
    right: '50px',
    top: '10px',
    zIindex: 998,
    display: 'inline-flex'
  },
  bottomMenu: {
    position: 'fixed',
    right: '23px',
    bottom: '10px',
    zIndex: 998,
    display: 'inline-flex',
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  minimapLayer: {
    cursor: 'pointer',
    position: 'relative',
    width: '80px',
    height: '80px',
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textAlign: 'center',
    boxSizing: 'border-box',
    boxShadow: '2 2 5px #000',
    border: '2px solid #fff',
    margin: '5px'
  },
  minimapTitleContainer: {
    display: 'table',
    width: '100%',
    padding: '0px',
    border: '0px',
    position: 'absolute',
    top: 'calc(50% - 8px)',
    transition: 'bottom .35s ease',
    textShadow:
      '2px 0 #333, -2px 0 #333, 0 2px #333, 0 -2px #333, 1px 1px #333, -1px -1px #333, 1px -1px #333, -1px 1px #333'
  },
  minimapTitle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  historyMenu: {
    display: 'flex',
    flexDirection: 'column-reverse',
    color: 'white',
    position: 'absolute',
    left: '5px'
  },
  historyTitle: {
    border: '1px solid white',
    width: '80px',
    height: '30px',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    '&:hover': {
      border: '2px solid white',
      backgroundColor: 'black',
      cursor: 'pointer'
    }
  }
}
export default styles
