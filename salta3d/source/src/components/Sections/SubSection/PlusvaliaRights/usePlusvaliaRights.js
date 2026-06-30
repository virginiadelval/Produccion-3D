import { useSelector } from 'react-redux'
import { UNIDAD_EDIFICABILIDAD_NAME } from 'utils/unidadesEdificabilidad'

const usePlusvaliaRights = () => {
  const buildableData = useSelector((state) => state.buildable)
  const basicData = useSelector((state) => state.basicData)

  const isLoading = buildableData.isLoading || basicData.isLoading

  const unidadEdificabilidad = Number(
    buildableData?.data?.unidad_edificabilidad?.[0]
  )

  const distritoEspecifico =
    buildableData?.data?.distrito_especial?.[0]?.distrito_especifico

  const fotMedianera = Number(buildableData?.data?.fot?.fot_medianera)

  const unidadesModel1 = {
    22.8: UNIDAD_EDIFICABILIDAD_NAME.USAA,
    31.2: UNIDAD_EDIFICABILIDAD_NAME.CORREDOR_MEDIO,
    38: UNIDAD_EDIFICABILIDAD_NAME.CORREDOR_ALTO
  }
  const unidadesModel2 = {
    9: UNIDAD_EDIFICABILIDAD_NAME.USAB1,
    11.6: UNIDAD_EDIFICABILIDAD_NAME.USAB2,
    17.2: UNIDAD_EDIFICABILIDAD_NAME.USAM,
    'AE 26': 'AE 26'
  }

  const isModel4 = fotMedianera === -1
  const isModel3 = fotMedianera === 0
  const isModel1 = fotMedianera !== -1 && unidadesModel1[unidadEdificabilidad]
  const isModel2 =
    unidadesModel2[unidadEdificabilidad] || unidadesModel2[distritoEspecifico]

  const convertCommaToDot = (valueSTR) => valueSTR.replace(/,/g, '.')

  const A1Result = (a) => a * 0.8
  const A2Result = (FOT, superficie_parcela) => FOT * superficie_parcela
  const AResult = (A1, A2) => Number((A1 - A2).toFixed(2))

  const BResult = (alicuota, incidencia_uva) => alicuota * incidencia_uva

  const simuladorDDHUS = (
    a,
    FOT,
    superficie_parcela,
    alicuota,
    incidencia_uva
  ) => {
    const A1 = A1Result(a)
    const A2 = A2Result(FOT, superficie_parcela)
    const A = AResult(A1, A2)
    const B = BResult(alicuota, incidencia_uva)

    return A * B
  }

  const numberFormat = (valueNumber) =>
    new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(
      valueNumber
    )

  const inputSubtraction = (input1, input2, input3, input4 = 0) => {
    return input1 - input2 - input3 - input4
  }

  return {
    buildableData,
    basicData,
    isModel3,
    isLoading,
    isModel2,
    isModel1,
    isModel4,
    convertCommaToDot,
    simuladorDDHUS,
    numberFormat,
    inputSubtraction,
    A1Result,
    A2Result,
    AResult,
    BResult
  }
}

export default usePlusvaliaRights
