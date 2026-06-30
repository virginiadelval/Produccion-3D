import theme from 'theme'

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%'
  },
  buttonColor: {
    color: '#707070'
  }
}

export default styles
