import React, { useEffect } from 'react'
import { Box, Typography, Button, MobileStepper, useTheme } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import styles from './styles'

const Carrousel = ({ photos = [] }) => {
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = photos.length
  const theme = useTheme()

  useEffect(() => {
    setActiveStep(0)
  }, [photos])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <Box sx={styles.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {photos.map((step, index) => (
          <Box key={step.fecha}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                padding: '5px'
              }}
            >
              <Typography color="textSecondary">
                {photos[activeStep]?.fecha}
              </Typography>
            </Box>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                style={{ ...styles['img'] }}
                src={step.photo}
                alt={step.fecha}
              />
            ) : null}
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            sx={styles.buttonColor}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Siguiente
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            sx={styles.buttonColor}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
    </Box>
  )
}

export default Carrousel
