import { useEffect } from 'react'
import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import {
  Matrix4,
  Vector3,
  DirectionalLight,
  AmbientLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Raycaster,
  Vector2,
  MeshLambertMaterial,
  Mesh
} from 'three'

import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree
} from 'three-mesh-bvh'

import { IFCLoader } from 'web-ifc-three/IFCLoader'
import maplibregl from 'maplibre-gl'
import { useSelector, useDispatch } from 'react-redux'
import {
  restartSettingIFC,
  setFileError,
  setIsModelMounted
} from 'state/ducks/IFC'

const IFC = () => {
  const mapGL = MapaInteractivoGL()
  const centroideState = useSelector((state) => state.basicData.data.centroide)
  const IFCstate = useSelector((state) => state.IFC)
  const IFCModelBlob = useSelector((state) => state.IFC.IFCModelBlob)
  const isFileUploaded = useSelector((state) => state.IFC.isFileUploaded)
  const fileError = useSelector((state) => state.IFC.fileError)
  const rotateValue = useSelector((state) => state.IFC.modelRotateValue)
  const coordinateCentroide = useSelector((state) => state.IFC.modelCoordinates)
  const modelAltitude = 0
  const modelRotate = [Math.PI / 2, rotateValue, 0]
  const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
    coordinateCentroide || [1, 1],
    modelAltitude
  )

  const dispatch = useDispatch()
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
  }

  const scene = new Scene()
  const camera = new PerspectiveCamera()
  let ifcLoader = new IFCLoader()

  const raycaster = new Raycaster()
  raycaster.firstHitOnly = true
  const mouse = new Vector2()

  ifcLoader.ifcManager.setupThreeMeshBVH(
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast
  )

  function cast(event) {
    // Computes the position of the mouse on the screen
    const bounds = mapGL.map.getCanvas().getBoundingClientRect()

    const x1 = event.clientX - bounds.left
    const x2 = bounds.right - bounds.left
    mouse.x = (x1 / x2) * 2 - 1

    const y1 = event.clientY - bounds.top
    const y2 = bounds.bottom - bounds.top
    mouse.y = -(y1 / y2) * 2 + 1

    // Places it on the camera pointing to the mouse
    raycaster.setFromCamera(mouse, camera)

    // Casts a ray
    return raycaster.intersectObjects(ifcModels)
  }

  function pick(event) {
    const found = cast(event)[0]
    if (found) {
      const index = found.faceIndex
      const geometry = found.object.geometry
      const ifc = ifcLoader.ifcManager
      ifc.getExpressId(geometry, index)
    }
  }

  async function releaseMemory() {
    // This releases all IFCLoader memory
    await ifcLoader.ifcManager.dispose()
    ifcLoader = null
    ifcLoader = new IFCLoader()

    // If the wasm path was set before, we need to reset it
    await ifcLoader.ifcManager.setWasmPath('../../../')
  }

  useEffect(() => {
    const layerID = mapGL.map.getLayer('3d-model')
    layerID?.implementation?.setModelTransform(modelTransform)
  }, [rotateValue, coordinateCentroide[0], coordinateCentroide[1]])

  class CustomLayer {
    constructor() {
      this.id = '3d-model'
      this.type = 'custom'
      this.renderingMode = '3d'
      this.matrix = []
      this.gl = null
      this.modelTransform = {}
      this.renderer = {}
    }

    onAdd(map, gl) {
      ifcLoader.ifcManager.setWasmPath(process.env.PUBLIC_URL + '')
      ifcLoader.load(
        IFCstate.IFCModelBlob,
        function (model) {
          model.visible = false

          const modelCopy = new Mesh(
            model.geometry,
            new MeshLambertMaterial({
              transparent: true,
              opacity: 0.7,
              color: 0x77aaff
            })
          )

          dispatch(setIsModelMounted(true))
          scene.add(modelCopy)
        },
        () => {},
        (error) => {
          console.error(error)
          dispatch(setFileError('El archivo debe ser de tipo .ifc'))
        }
      )
      this.setRenderer(
        new WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        })
      )
      this.setModelTransform(modelTransform)
      ifcLoader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: true
      })
      const directionalLight = new DirectionalLight(0x404040)
      const directionalLight2 = new DirectionalLight(0x404040)
      const ambientLight = new AmbientLight(0x404040, 3)

      directionalLight.position.set(0, -70, 100).normalize()
      directionalLight2.position.set(0, 70, 100).normalize()

      scene.add(directionalLight, directionalLight2, ambientLight)
    }

    render(gl, matrix) {
      this.renderer.autoClear = false
      camera.projectionMatrix = this.calculateProjectionMatrix()
      this.renderer.resetState()
      this.renderer.render(scene, camera)
      mapGL.map.triggerRepaint()
      this.setMatrix(matrix)
      this.setGl(gl)
    }

    setMatrix(matrix) {
      this.matrix = matrix
    }

    setGl(gl) {
      this.gl = gl
    }

    setModelTransform(modelTransform) {
      this.modelTransform = modelTransform
    }

    setRenderer(renderer) {
      this.renderer = renderer
    }

    getMatrix() {
      return this.matrix
    }

    getGl() {
      return this.gl
    }
    getModelTransform() {
      return this.modelTransform
    }

    calculateProjectionMatrix() {
      const rotationX = new Matrix4().makeRotationAxis(
        new Vector3(1, 0, 0),
        this.modelTransform.rotateX
      )
      const rotationY = new Matrix4().makeRotationAxis(
        new Vector3(0, 1, 0),
        this.modelTransform.rotateY
      )
      const rotationZ = new Matrix4().makeRotationAxis(
        new Vector3(0, 0, 1),
        this.modelTransform.rotateZ
      )

      const m = new Matrix4().fromArray(this.matrix)
      const l = new Matrix4()
        .makeTranslation(
          this.modelTransform.translateX,
          this.modelTransform.translateY,
          this.modelTransform.translateZ
        )
        .scale(
          new Vector3(
            this.modelTransform.scale,
            -this.modelTransform.scale,
            this.modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ)

      return m.multiply(l)
    }
    onRemove() {
      console.log('removed IFC model')
    }
  }
  useEffect(() => {
    if (centroideState && IFCstate.IFCModelBlob && !fileError) {
      mapGL.map.addLayer(new CustomLayer())
    }
    return () => {
      if (isFileUploaded && !fileError) {
        URL.revokeObjectURL(IFCModelBlob)
        releaseMemory()
        dispatch(restartSettingIFC())
        mapGL.map.removeLayer('3d-model')
      }
    }
  }, [IFCstate.IFCModelBlob, isFileUploaded, fileError])

  return null
}

export default IFC
