import theme from 'theme'
const styles = {
  box: {
    marginLeft: theme.spacing(9.75), // 9.75 - 78px
    minHeight: '100vh',
    width: { xs: theme.spacing(35), md: theme.spacing(86) }
  },
  boxSubContainer: {
    paddingBottom: theme.spacing(4)
  },
  paper: {
    height: theme.spacing(13.62),
    paddingTop: theme.spacing(2.25), // 2.25 - 18px
    paddingLeft: theme.spacing(3.26), // 3.12 - 26px
    borderRadius: 0
  },
  button: {
    padding: 0,
    paddingRight: theme.spacing(0.5),
    minWidth: '0px !important'
  },
  tableCell: {
    padding: { xs: '0px', md: '16px' },
    textAlign: { xs: 'center', md: 'left' },
    fontSize: '12px'
  },
  tooltip: {
    marginTop: '3px',
    marginLeft: theme.spacing(1),
    float: 'left'
  },
  info: {
    height: '17px',
    width: '17px'
  },
  iconButton: {
    marginTop: '3px',
    padding: 0,
    marginLeft: theme.spacing(1),
    float: 'left'
  },
  downloadIcon: {
    height: '18px',
    width: '18px'
  },
  title: {
    float: 'left',
    display: 'inline',
    fontSize: '14px',
    marginTop: theme.spacing(3),
    '& :first-child': {
      marginTop: theme.spacing(0)
    }
  }
}
export default styles
