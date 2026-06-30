import theme from 'theme'

const styles = {
  formControl: {
    marginRight: 0
  },
  listItem: {
    padding: 0
  },
  color: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    marginRight: theme.spacing(0.8),
    border: '1px solid grey'
  },
  boxIcons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconsContainer: {
    display: 'flex'
  },
  reference: {
    padding: 0,
    float: 'right',
    height: '18px'
  },
  info: {
    padding: 0,
    float: 'right',
    height: '18px'
  },
  iconButton: {
    padding: '0px',
    float: 'right',
    marginLeft: theme.spacing(0.5)
  },
  downloadIcon: {
    width: '21px',
    height: '18px'
  },
  referenceItems: {
    padding: '5px'
  },
  referenceTitle: {},
  accordion: { margin: '5px', border: '1px solid #D9D9D9' },
  accordionSummary: { minHeight: '0px', height: '34px' }
}

export default styles
