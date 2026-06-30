import theme from 'theme'

const styles = {
  options: {
    paddingTop: theme.spacing(4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alingItems: 'center',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.action.active,
    alignSelf: 'center',
    '&:nth-last-of-type(2)': {
      marginTop: 'auto'
    }
  },
  icon: {
    width: '100%',
    height: '36px'
  }
}

export default styles
