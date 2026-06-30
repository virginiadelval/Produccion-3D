import { useState, useEffect } from 'react'
import { TextField, Box, Typography, InputAdornment, Link } from '@mui/material'
import decorators from 'theme/fontsDecorators'
import { useSelector } from 'react-redux'
import usePlusvaliaRights from './usePlusvaliaRights'
import styles from './styles'

const Model1 = () => {
  const [formData, setFormData] = useState({
    m2Totales: '',
    superficieTotalSubsuelos: '',
    superficieTotalBalcones: '',
    superficiePlantaBaja: ''
  })
  const [inputsSubtraction, setInputsSubtraction] = useState('0')
  const [DDHUSResult, setDDHUSResult] = useState('')

  const buildableData = useSelector((state) => state.buildable.data)

  const {
    convertCommaToDot,
    simuladorDDHUS,
    numberFormat,
    inputSubtraction,
    isModel2: MODEL2_UNIDAD_EDIFICABILIDAD,
    A1Result,
    A2Result,
    AResult,
    BResult
  } = usePlusvaliaRights()

  const handleChange = (e) => {
    const { value, name } = e.target
    if (/^[0-9]+$/g.test(value) || value === '')
      setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const inputProps = {
    endAdornment: <InputAdornment position="end">m²</InputAdornment>,
    inputMode: 'numeric',
    pattern: '^[0-9]+$'
  }

  useEffect(() => {
    if (
      formData.m2Totales &&
      formData.superficieTotalBalcones &&
      formData.superficieTotalSubsuelos &&
      formData.superficiePlantaBaja
    ) {
      const subtraction = inputSubtraction(
        Number(formData.m2Totales),
        Number(formData.superficieTotalBalcones),
        Number(formData.superficieTotalSubsuelos),
        Number(formData.superficiePlantaBaja)
      )

      setInputsSubtraction(subtraction)

      setDDHUSResult(
        simuladorDDHUS(
          subtraction,
          convertCommaToDot(buildableData.fot.fot_medianera),
          buildableData.superficie_parcela,
          convertCommaToDot(buildableData.plusvalia.alicuota),
          buildableData.plusvalia.incidencia_uva
        )
      )
    } else {
      setDDHUSResult('')
      setInputsSubtraction('0')
    }
  }, [
    formData.m2Totales,
    formData.superficieTotalBalcones,
    formData.superficieTotalSubsuelos,
    formData.superficiePlantaBaja
  ])

  const A1 = A1Result(inputsSubtraction)
  const A2 = A2Result(
    convertCommaToDot(buildableData?.fot?.fot_medianera),
    buildableData?.superficie_parcela
  )
  const A = AResult(A1, A2)
  const B = BResult(
    convertCommaToDot(buildableData.plusvalia.alicuota),
    buildableData.plusvalia.incidencia_uva
  )

  return (
    <Box sx={styles.container}>
      <Typography variant="subtitle2">
        Recordá tener{' '}
        <Link
          href="https://www.buenosaires.gob.ar/sites/default/files/media/document/2021/12/22/03b2e32878698bd454e39ed964490abf89916ad6.pdf"
          target="_blank"
        >
          estas consideraciones
        </Link>{' '}
        a la hora de calcular la plusvalía de tu proyecto.
      </Typography>
      <Typography sx={decorators.bold}>PLUSVALÍA </Typography>
      <Typography variant="subtitle2">
        Tu parcela se encuentra en un {MODEL2_UNIDAD_EDIFICABILIDAD}
      </Typography>
      <Box sx={styles.inputContainer}>
        <Typography variant="subtitle2" sx={styles.inputText}>
          ¿Cuántos m2 totales tiene tu proyecto?
        </Typography>
        <TextField
          size="small"
          variant="standard"
          sx={styles.input}
          InputProps={inputProps}
          value={formData.m2Totales}
          name="m2Totales"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styles.inputContainer}>
        <Typography variant="subtitle2" sx={styles.inputText}>
          ¿Cuál es la superficie total destinada a subsuelos?
        </Typography>
        <TextField
          size="small"
          variant="standard"
          sx={styles.input}
          InputProps={inputProps}
          value={formData.superficieTotalSubsuelos}
          name="superficieTotalSubsuelos"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styles.inputContainer}>
        <Typography variant="subtitle2" sx={styles.inputText}>
          ¿Cuál es la superficie total destinada a balcones?
        </Typography>
        <TextField
          size="small"
          variant="standard"
          sx={styles.input}
          InputProps={inputProps}
          value={formData.superficieTotalBalcones}
          name="superficieTotalBalcones"
          onChange={handleChange}
        />
      </Box>
      <Typography variant="subtitle2">
        Deberás mencionar solamente la superficie de los balcones que se
        encuentren por fuera de la Línea Oficial así como también por fuera de
        la Línea de Frente Interno o de Basamento.
      </Typography>
      <Box sx={styles.inputContainer}>
        <Typography variant="subtitle2" sx={styles.inputText}>
          Superficie destinada a Planta Baja
        </Typography>
        <TextField
          size="small"
          variant="standard"
          sx={styles.input}
          InputProps={inputProps}
          value={formData.superficiePlantaBaja}
          name="superficiePlantaBaja"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styles.inputContainer}>
        <Typography variant="subtitle2">
          Superficie sobre rasante susceptible de DDHUS
        </Typography>
        <Typography>{inputsSubtraction}m²</Typography>
      </Box>
      <Box sx={styles.basicDataContainer}>
        <Typography sx={decorators.bold}>Datos de la parcela</Typography>
        <Box>
          <Typography variant="subtitle2">
            Distrito CPU: {buildableData.plusvalia.distrito_cpu}
          </Typography>
          <Typography variant="subtitle2">
            FOT: {buildableData.fot.fot_medianera}
          </Typography>
          <Typography variant="subtitle2">
            Superficie de la parcela: {buildableData.superficie_parcela}
            m²
          </Typography>
          <Typography variant="subtitle2">
            Incidencia UVA:{' '}
            {buildableData.plusvalia.incidencia_uva?.toLocaleString('es-AR')}
          </Typography>
          <Typography variant="subtitle2">
            Alícuota: {buildableData.plusvalia.alicuota}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.basicDataContainer}>
        <Typography sx={decorators.bold}>Simulador de DDHUS</Typography>
        <Box>
          <Typography variant="subtitle2">
            A1= (a*0.8) | {inputsSubtraction} * 0.8 = {numberFormat(A1)}
          </Typography>
          <Typography variant="subtitle2">
            A2= FOT * Sup Parcela |{' '}
            {numberFormat(convertCommaToDot(buildableData?.fot?.fot_medianera))}{' '}
            * {numberFormat(buildableData?.superficie_parcela)} ={' '}
            {numberFormat(A2)}
          </Typography>
          <Typography variant="subtitle2">
            A= A1-A2 | {numberFormat(A1)} - {numberFormat(A2)} ={' '}
            {numberFormat(A)}
          </Typography>
          <Typography variant="subtitle2">
            B= Alícuota * Incidencia UVA |{' '}
            {numberFormat(convertCommaToDot(buildableData.plusvalia.alicuota))}{' '}
            * {numberFormat(buildableData.plusvalia.incidencia_uva)} ={' '}
            {numberFormat(B)}
          </Typography>
          <Typography variant="subtitle2">
            A * B | {numberFormat(A)} * {numberFormat(B)} ={' '}
            {numberFormat(DDHUSResult)}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.resultsContainer}>
        {Number(DDHUSResult) > 0 ? (
          <>
            <Box sx={styles.inputContainer}>
              <Typography>UVAs a pagar:</Typography>
              <Typography>{numberFormat(DDHUSResult)}</Typography>
            </Box>
            <Typography variant="subtitle2">
              El valor de la UVA lo podes consultar{' '}
              <Link
                href=" https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp"
                target="_blank"
                rel="noopener"
              >
                aquí
              </Link>
            </Typography>
          </>
        ) : (
          <Typography variant="subtitle2">
            No se generaron metros adicionales susceptibles del pago de DDHUS.
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Model1
