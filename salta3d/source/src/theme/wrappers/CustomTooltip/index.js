import Tooltip from '@mui/material/Tooltip'

const CustomTooltip = (props) => (
  <Tooltip
    slotProps={{
      tooltip: {
        sx: {
          backgroundColor: '#f5f5f9',
          maxWidth: '220px',
          border: '1px solid #dadde9',
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.67)',
          fontWeight: '500'
        }
      }
    }}
    {...props}
  />
)

export default CustomTooltip
