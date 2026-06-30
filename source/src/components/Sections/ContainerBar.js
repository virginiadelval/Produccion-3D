import React from 'react'

import { Box, Paper } from '@mui/material'
import Scrollbar from 'react-smooth-scrollbar'

import { getCategoryTitle, getSectionInfo } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import Alerts from 'components/Alerts'
import HeaderSection from 'components/Sections/HeaderSection'

import PropTypes from 'prop-types'
import styles from './ContainerBarStyles'

const ContainerBar = ({ children, type }) => {
  const sectionId = useSelector((state) => state.categories.sectionId)
  const categoryTitle = getCategoryTitle(sectionId[0])

  const lastIndex = sectionId.length - 1
  const selectedOption = sectionId[0].toLowerCase()

  const { title, info } =
    lastIndex > 0
      ? getSectionInfo(selectedOption, sectionId[lastIndex])
      : { title: null, info: null }

  const maxHeight = sectionId.length > 1 ? '80vh' : '85vh'

  return (
    <Box
      sx={{
        ...styles['container'],
        ...styles[type]
      }}
    >
      <Paper elevation={2} sx={styles.padding}>
        <HeaderSection
          categoryTitle={categoryTitle}
          sectionTitle={title}
          info={info}
        />
      </Paper>

      <Scrollbar>
        <Box sx={styles.padding} style={{ maxHeight }}>
          <Alerts />
          {children}
        </Box>
      </Scrollbar>
    </Box>
  )
}
ContainerBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  type: PropTypes.string.isRequired
}

export default ContainerBar
