import { Engine, Scene } from "babylonjs"

export class SceneRunner {
  public static run = (engine: Engine, scene: Scene) => {
    engine.runRenderLoop(() => {
      scene.render();
    })
  }
}