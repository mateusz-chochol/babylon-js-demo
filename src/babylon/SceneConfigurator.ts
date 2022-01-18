import { Engine, Scene, TargetCamera, Vector3, HemisphericLight, ArcRotateCamera } from "babylonjs";

export class SceneConfigurator {
  public static setup = (canvas: HTMLCanvasElement): {
    engine: Engine,
    scene: Scene,
    camera: TargetCamera,
  } => {
    const engine = this.createEngige(canvas)
    const scene = this.createScene(engine);

    const camera = this.createCamera(scene, canvas);
    this.createLight(scene);

    return {engine, scene, camera};
  }

  private static createEngige = (canvas: HTMLCanvasElement): Engine => {
    return new Engine(canvas, true);
  }

  private static createScene = (engine: Engine): Scene => {
    return new Scene(engine);
  }

  private static createCamera(scene: Scene, canvas: HTMLCanvasElement): TargetCamera {
    const cameraName = "camera";
    const cameraPosition = new Vector3(0, 2, -5);

    const camera = new ArcRotateCamera(cameraName, 0, 0, 10, cameraPosition, scene);
    camera.attachControl(canvas, true)

    return camera;
  }

  private static createLight(scene: Scene): HemisphericLight {
    const lightName = "light";
    const lightDirection = new Vector3(0, 1, 0);

    return new HemisphericLight(lightName, lightDirection, scene);
  }
}