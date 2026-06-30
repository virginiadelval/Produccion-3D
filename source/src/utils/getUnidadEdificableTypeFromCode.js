import { UnidadEdificable } from './UnidadEdificable'

export const getUnidadEdificableTypeFromCode = (code) => {
  for (const key in UnidadEdificable) {
    if (UnidadEdificable[key].code === code) {
      return UnidadEdificable[key].type
    }
  }
  return undefined // Return undefined if no matching code is found
}
