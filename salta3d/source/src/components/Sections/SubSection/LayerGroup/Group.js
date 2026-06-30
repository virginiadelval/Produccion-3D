import React from 'react'

import PropTypes from 'prop-types'

import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem
} from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ListAltIcon from '@mui/icons-material/ListAlt'

import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import CustomTooltip from 'theme/wrappers/CustomTooltip'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/map'

import decorators from 'theme/fontsDecorators'

import { getLayersByLayersGroupId } from 'utils/configQueries'

import styles from './groupStyle'

export const GroupItem = ({
  idGroup,
  idLayer,
  title,
  color,
  icon,
  styles,
  info,
  link,
  reference
}) => {
  const dispatch = useDispatch()
  const isVisible = useSelector(
    (state) => state.map.groups[idGroup][idLayer].isVisible
  )

  const layerChangeHandler = () => {
    dispatch(actions.toggleLayer({ idGroup, idLayer }))
  }

  const PLANCHETA_CUR_ID = 'Plancheta_CUr'
  const borderColor = idLayer === PLANCHETA_CUR_ID ? 'rgb( 162, 59, 38)' : ''
  const backgroundColor = idLayer === PLANCHETA_CUR_ID ? '#ffffff' : color

  return (
    <ListItem key={idLayer} sx={styles.listItem}>
      <FormControlLabel
        sx={styles.formControl}
        control={
          <Checkbox
            icon={
              <CheckBoxOutlineBlankIcon
                fontSize="small"
                style={{ color: '#717170' }}
              />
            }
            checkedIcon={
              <CheckBoxIcon fontSize="small" style={{ color: '#333' }} />
            }
            checked={isVisible}
            onChange={layerChangeHandler}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 17.5 } }}
            name={idLayer}
          />
        }
      />
      {!icon && (
        <Box sx={styles.color} style={{ backgroundColor, borderColor }} />
      )}
      {!!icon && <img src={icon} />}
      <Box sx={styles.boxIcons}>
        <Typography variant="subtitle2">{title}</Typography>
        <Box sx={{ display: 'flex' }}>
          {isVisible && reference && (
            <CustomTooltip
              sx={styles.reference}
              title={reference.map(
                ({ id, subTitle, color: c, icon: iconReference }) => (
                  <ListItem key={id} sx={styles.referenceItems}>
                    {!iconReference && (
                      <Box
                        sx={{ ...styles['color'], backgroundColor: `${c}` }}
                        // style={{ backgroundColor: `${c}` }}
                      />
                    )}
                    {!!iconReference && <img src={iconReference} />}
                    <Box sx={styles.referenceTitle}>
                      <Typography variant="subtitle2">{subTitle}</Typography>
                    </Box>
                  </ListItem>
                )
              )}
              placement="top"
            >
              <ListAltIcon sx={styles.downloadIcon} />
            </CustomTooltip>
          )}
          {isVisible && info && (
            <CustomTooltip sx={styles.info} title={info} placement="top">
              <InfoOutlinedIcon />
            </CustomTooltip>
          )}
          {isVisible && (
            <IconButton sx={styles.iconButton} target="_blank" href={link}>
              <CloudDownloadOutlinedIcon sx={styles.downloadIcon} />
            </IconButton>
          )}
        </Box>
      </Box>
    </ListItem>
  )
}

const GroupItems = ({ idGroup, styles }) => {
  const layersConfig = getLayersByLayersGroupId(idGroup)
  return layersConfig.map(
    ({ id, title, color, icon, info, link, reference }) => (
      <GroupItem
        key={id}
        idGroup={idGroup}
        idLayer={id}
        title={title}
        color={color}
        icon={icon}
        styles={styles}
        info={info}
        link={link}
        reference={reference}
      />
    )
  )
}

const Group = ({ id, title }) => {
  return (
    <Accordion sx={styles.accordion} disableGutters>
      <AccordionSummary sx={styles.accordionSummary}>
        <Typography
          variant="subtitle2"
          sx={{ ...decorators['bold'], fontSize: '12px' }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingLeft: '20px' }}>
        <List sx={{ padding: '0px' }}>
          <GroupItems idGroup={id} styles={styles} />
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

Group.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

GroupItem.propTypes = {
  idGroup: PropTypes.string,
  idLayer: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  info: PropTypes.string,
  link: PropTypes.string,
  reference: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  // styles: PropTypes.objectOf(makeStyles).isRequired
}
GroupItem.defaultProps = {
  idGroup: '',
  idLayer: '',
  info: '',
  link: '',
  reference: ''
}

export default Group
