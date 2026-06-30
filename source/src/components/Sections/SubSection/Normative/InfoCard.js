import React from 'react'

import { CardActionArea, Typography } from '@mui/material'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'
import decorators from 'theme/fontsDecorators'

import PropTypes from 'prop-types'
import styles from './styles'

const InfoCard = ({ id, title, description, color }) => {
  const dispatch = useDispatch()

  return (
    <CardActionArea
      style={{ borderColor: color }}
      sx={styles.card}
      onClick={() => dispatch(actions.sectionSelected(id))}
    >
      <Typography variant="h5" sx={decorators.bold}>
        {title}
      </Typography>
      <Typography variant="body1" sx={decorators.openSans}>
        {description}
      </Typography>
    </CardActionArea>
  )
}

InfoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default InfoCard
