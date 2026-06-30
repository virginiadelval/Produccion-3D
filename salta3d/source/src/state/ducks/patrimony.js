import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getMonumentoHistoricoNacional,
  getFichaDeCatalogacion
} from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'patrimony/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const monumentoUrl = getMonumentoHistoricoNacional(smp)
    const catalogacionUrl = getFichaDeCatalogacion(smp)

    const responseMonumento = await fetch(monumentoUrl)
    const responseCatalogacion = await fetch(catalogacionUrl)
    const monuData = await responseMonumento.json()
    const catData = await responseCatalogacion.json()

    return { monuData, catData }
  }
)

const patrimony = createSlice({
  name: 'patrimony',
  initialState: {
    isLoading: true,
    monumentoData: [],
    hasCatalogacion: false
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.monumentoData = []
      draftState.hasCatalogacion = false
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.isLoading = false
      draftState.monumentoData = action.payload.monuData.data
      draftState.hasCatalogacion = action.payload.catData.exists
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.monumentoData = []
      draftState.hasCatalogacion = false
    }
  }
})

export default patrimony.reducer

const actions = { ...patrimony.actions, clickOnParcel }
export { actions }
