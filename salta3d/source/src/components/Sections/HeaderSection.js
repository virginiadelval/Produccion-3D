import React from 'react'

import PropTypes from 'prop-types'

import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import CustomTooltip from 'theme/wrappers/CustomTooltip'

import { actions as alertsAction } from 'state/ducks/alerts'
import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch } from 'react-redux'

import decorators from 'theme/fontsDecorators'
import styles from './headerSectionStyles'

const HeaderSection = ({ categoryTitle, sectionTitle, info }) => {
  const dispatch = useDispatch()

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h5"
        sx={{
          ...decorators['bold'],
          ...decorators['marginBottom_ml'],
          ...styles['informationTitle']
        }}
      >
        {categoryTitle}
      </Typography>
      {sectionTitle && (
        <Box sx={styles.subTitle}>
          <Box sx={info ? styles.sectionTitle : null}>
            <Typography
              variant="h6"
              sx={{
                ...decorators['bold'],
                ...styles['sectionTitleTypography']
              }}
            >
              <IconButton
                onClick={() => {
                  dispatch(categoriesActions.sectionBack())
                  dispatch(alertsAction.clear())
                }}
                sx={styles.button}
                aria-label="go-back"
                size="small"
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              {sectionTitle}
            </Typography>
          </Box>
          {info ? (
            <Box sx={styles.boxIcons}>
              <CustomTooltip sx={styles.tooltip} title={info} placement="top">
                <InfoOutlinedIcon sx={styles.info} />
              </CustomTooltip>
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}

HeaderSection.defaultProps = {
  sectionTitle: '',
  info: ''
}

HeaderSection.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string,
  info: PropTypes.string
}

export default HeaderSection
