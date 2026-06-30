import React from 'react'
import { Box, List } from '@mui/material'
import { useSelector } from 'react-redux'
import { getVisibleLayers } from 'utils/configQueries'
import { GroupItem } from 'components/Sections/SubSection/LayerGroup/Group'
import styles from './styles'
import groupStyles from 'components/Sections/SubSection/LayerGroup/groupStyle'

export const ActiveLayers = () => {
  const {
    map: { groups },
    categories: { sectionOpen }
  } = useSelector((state) => state)

  const visibleLayers = getVisibleLayers({ groups })

  return (
    <>
      {visibleLayers.length > 0 && (
        <Box sx={styles.container} style={{ left: sectionOpen ? 450 : 100 }}>
          <List dense sx={styles.list}>
            {visibleLayers.map(
              ({ id, idGroup, title, color, icon, info, link, reference }) => {
                return (
                  <GroupItem
                    key={id}
                    idGroup={idGroup}
                    idLayer={id}
                    title={title}
                    color={color}
                    icon={icon}
                    styles={groupStyles}
                    info={info}
                    link={link}
                    reference={reference}
                  />
                )
              }
            )}
          </List>
        </Box>
      )}
    </>
  )
}

export default ActiveLayers
