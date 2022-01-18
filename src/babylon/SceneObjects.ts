import "babylonjs-loaders";
import { Scene, Vector3, SceneLoader, StandardMaterial, TargetCamera } from "babylonjs"
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";

export class SceneObjects {
  public static createCup = (scene: Scene, camera: TargetCamera, material: StandardMaterial) => {
    SceneLoader.ImportMesh("", "./", "scene.gltf", scene, (meshes, particleSystems, skeletons) => {
      const cup = meshes[1];

      this.scaleModel(cup);
      this.applyMaterialToModel(cup, material);
      this.setCameraToLookAtModel(camera, cup)
      this.updateModelPosition(cup);
    });
  }

  private static scaleModel = (cup: AbstractMesh) => {
    cup.scaling = new Vector3(10, 10, 10);
  }

  private static applyMaterialToModel = (cup: AbstractMesh, material: StandardMaterial) => {
    cup.material = material;
  }

  private static setCameraToLookAtModel = (camera: TargetCamera, cup: AbstractMesh) => {
    camera.position = cup.position;
    camera.position.z -= 4;

    camera.setTarget(cup.position);
  }

  private static updateModelPosition = (cup: AbstractMesh) => {
    cup.position.y += 1;
  }
}