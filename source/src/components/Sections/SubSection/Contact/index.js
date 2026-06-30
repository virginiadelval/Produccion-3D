import React, { useState, useEffect } from 'react'

import { actions as actionsContact } from 'state/ducks/contact'

import { useDispatch, useSelector } from 'react-redux'

import ReCAPTCHA from 'react-google-recaptcha'

import ContainerBar from 'components/Sections/ContainerBar'

import { Grid, Typography, Button, TextField } from '@mui/material'
import styles from './styles'

const Contact = () => {
  const dispatch = useDispatch()

  // Validaciones
  const [captchaValue, setCaptchaValue] = useState()

  const [nameValue, setNameValue] = useState('')
  const nameChange = (value) => {
    setNameValue(value)
  }
  const [emailValue, setEmailValue] = useState('')
  const emailChange = (value) => {
    setEmailValue(value)
  }
  const [comentValue, setComentValue] = useState('')
  const comentChange = (value) => {
    setComentValue(value)
  }

  const [errorName, setErrorName] = useState(false)
  const [errorMail, setErrorMail] = useState(false)
  const [errorComent, setErrorComent] = useState(false)

  const validate = () => {
    const values = {}
    values.nameValue =
      nameValue !== ''
        ? ['correct', setErrorName(false)]
        : ['incorrect', setErrorName(true)]
    values.emailValue = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(emailValue)
      ? ['correct', setErrorMail(false)]
      : ['incorrect', setErrorMail(true)]
    values.comentValue =
      comentValue !== ''
        ? ['correct', setErrorComent(false)]
        : ['incorrect', setErrorComent(true)]
    values.captchaValue = captchaValue
      ? ['correct']
      : ['incorrect', setCaptchaValue(false)]

    return Object.values(values).every((v) => v[0] === 'correct')
  }

  const resetValues = () => {
    setNameValue('')
    setEmailValue('')
    setComentValue('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      dispatch(actionsContact.sendEmail({ target: e.target }))
      resetValues()
    }
  }
  const handleCaptcha = (token) => {
    if (token === null) {
      setCaptchaValue(null)
    } else {
      setCaptchaValue(true)
    }
  }

  useEffect(() => () => dispatch(actionsContact.cleanStatus()), [dispatch])
  const statusEmail = useSelector((state) => state.contact.statusEmail)

  return (
    <ContainerBar type="list">
      <form onSubmit={handleSubmit}>
        <Grid container sx={styles.container}>
          <Grid item sx={styles.item}>
            <TextField
              sx={styles.textField}
              id="name"
              name="from_name"
              label="Nombre *"
              value={nameValue}
              onChange={({ target: { value } }) => nameChange(value)}
              error={errorName}
              helperText={errorName && 'Ingrese su nombre'}
            />
          </Grid>
          <Grid item sx={styles.item}>
            <TextField
              sx={styles.textField}
              id="email"
              name="reply_to"
              label="Email *"
              value={emailValue}
              onChange={({ target: { value } }) => emailChange(value)}
              error={errorMail}
              helperText={
                errorMail &&
                (emailValue === ''
                  ? 'Ingrese un email'
                  : 'Ingrese un email valido')
              }
            />
          </Grid>
          <Grid item sx={styles.item}>
            <TextField
              sx={styles.textField}
              id="outlined-multiline-static"
              name="message"
              label="Comentario *"
              multiline
              rows={10}
              variant="outlined"
              value={comentValue}
              onChange={({ target: { value } }) => comentChange(value)}
              error={errorComent}
              helperText={errorComent && 'Ingrese un comentario'}
            />
          </Grid>
          <Grid item sx={styles.item}>
            <Typography sx={styles.required}>
              * los campos son obligatorios
            </Typography>
          </Grid>
          <Grid item sx={styles.captcha}>
            <ReCAPTCHA
              onChange={(e) => handleCaptcha(e)}
              name="captcha"
            />
            {captchaValue === false && (
              <Typography sx={styles.required}>Utilice el captcha</Typography>
            )}
          </Grid>
          <Grid item sx={styles.item}>
            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </Grid>
          {statusEmail === 'sending' && (
            <Grid item sx={styles.item}>
              <Typography>ENVIANDO</Typography>
            </Grid>
          )}
          {statusEmail === 'success' && (
            <Grid item sx={styles.item}>
              <Typography>ENVIADO CON ÉXITO</Typography>
            </Grid>
          )}
          {statusEmail === 'fail' && (
            <Grid item sx={styles.item}>
              <Typography sx={styles.required}>ERROR EL ENVIAR</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </ContainerBar>
  )
}

export default Contact
