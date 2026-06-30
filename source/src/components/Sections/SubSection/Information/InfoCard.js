import React from 'react'

import { CardActionArea, Typography } from '@mui/material'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'
import decorators from 'theme/fontsDecorators'

import PropTypes from 'prop-types'
import styles from './styles'

const InfoCard = ({ id, title, color }) => {
  const dispatch = useDispatch()

  return (
    <CardActionArea
      sx={{ ...styles['card'], borderColor: color }}
      onClick={() => dispatch(actions.sectionSelected(id))}
    >
      <Typography variant="h5" sx={[decorators.bold, { fontSize: '21px' }]}>
        {title}
      </Typography>
    </CardActionArea>
  )
}

InfoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default InfoCard
