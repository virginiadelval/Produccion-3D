import { createSlice } from '@reduxjs/toolkit'

const IFC = createSlice({
  name: 'IFC',
  initialState: {
    IFCModelBlob: '',
    isFileUploaded: false,
    isFileTypeIFC: true,
    modelRotateValue: 0,
    modelCoordinates: [1, 1],
    modelStep: 0.5,
    fileError: '',
    isModelMounted: false,
    isVolumetriaChecked: true
  },
  reducers: {
    restartSetting: (draftState) => {
      draftState.IFCModelBlob = ''
      draftState.isFileUploaded = false
      draftState.modelStep = 0.5
      draftState.fileError = ''
      draftState.isModelMounted = false
    },
    restartSettingIFC: (draftState) => {
      draftState.IFCModelBlob = ''
      draftState.isFileUploaded = false
      draftState.modelStep = 0.5
      draftState.isModelMounted = false
    },
    setIsVolumetriaChecked: (draftState, { payload }) => {
      draftState.isVolumetriaChecked = payload
    },
    setIFCModelBlob: (draftState, { payload }) => {
      draftState.IFCModelBlob = payload
    },
    setIsModelMounted: (draftState, { payload }) => {
      draftState.isModelMounted = payload
    },
    setFileError: (draftState, { payload }) => {
      draftState.fileError = payload
    },
    setIsFileTypeIFC: (draftState, { payload }) => {
      draftState.isFileTypeIFC = payload
    },
    setIsFileUploaded: (draftState, { payload }) => {
      draftState.isFileUploaded = payload
    },
    setModelRotate: (draftState, { payload }) => {
      draftState.modelRotateValue = payload
    },
    setModelCoordinates: (draftState, { payload }) => {
      draftState.modelCoordinates = payload
    },
    setModelLng: (draftState, { payload }) => {
      draftState.modelCoordinates[0] = payload
    },
    setModelLat: (draftState, { payload }) => {
      draftState.modelCoordinates[1] = payload
    },
    setModelStep: (draftState, { payload }) => {
      draftState.modelStep = payload
    }
  }
})

export default IFC.reducer

export const {
  setIFCModelBlob,
  setModelRotate,
  setModelCoordinates,
  setModelLng,
  setModelLat,
  setModelStep,
  restartSetting,
  setIsFileUploaded,
  setIsFileTypeIFC,
  setFileError,
  setIsModelMounted,
  restartSettingIFC,
  setIsVolumetriaChecked
} = IFC.actions
