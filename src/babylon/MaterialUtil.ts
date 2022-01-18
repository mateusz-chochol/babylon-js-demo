import { DynamicTexture, Scene, StandardMaterial, Texture } from "babylonjs";

export class MaterialUtil {
  public static getMaterial = (scene: Scene, imagePath: string, materialName: string) => {
    const material = new StandardMaterial(materialName, scene);

    // static texture
    // this.createAndApplyStaticTexture(scene, material);

    // dynamic texture
    this.createAndApplyDynamicTexture(scene, material, imagePath)

    return material;
  }

  private static createAndApplyStaticTexture = (scene: Scene, material: StandardMaterial) => {
    const texture = new Texture("textures/fachowiec-static.png", scene);
    material.diffuseTexture = texture;
  }

  private static createAndApplyDynamicTexture = (scene: Scene, material: StandardMaterial, imagePath: string) => {
    const textureSize = 4096
    const dynamicTexture = this.getDynamicTexture(scene, textureSize);
    material.diffuseTexture = dynamicTexture;

    this.drawImageOnDynamicTexture(imagePath, dynamicTexture)
  }

  private static getDynamicTexture = (scene: Scene, size: number) => {
    return new DynamicTexture("dynamic-texture", size, scene, false);
  }

  private static drawImageOnDynamicTexture = (imagePath: string, dynamicTexture: DynamicTexture) => {
    const textureSize = 4096;

    const context = dynamicTexture.getContext();
    context.fillStyle = "white";
    context.fillRect(0, 0, textureSize, textureSize);

    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
      context.save();
      context.translate(313, 2480);
      context.rotate(-90 * Math.PI/180);
      context.translate(0,0);
      context.drawImage(image, -1100, 0, image.width * 3, image.height * 3);
      context.restore();
      dynamicTexture.update();
    }
  }
}