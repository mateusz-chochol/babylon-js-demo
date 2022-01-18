import React, { useEffect, useRef, useState } from 'react';
import { Scene, StandardMaterial } from 'babylonjs';
import { SceneConfigurator } from './babylon/SceneConfigurator';
import { SceneObjects } from './babylon/SceneObjects';
import { SceneRunner } from './babylon/SceneRunner';
import { imagesPaths } from './config/imagesPaths';
import "./style.css";
import { MaterialUtil } from './babylon/MaterialUtil';

function App() {
  const materialName = "material";
  const [imagePath, setImagePath] = useState<string>(imagesPaths.reactLogo);
  const [scene, setScene] = useState<Scene>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      const {engine, scene, camera} = SceneConfigurator.setup(canvas.current);
      const material = MaterialUtil.getMaterial(scene, imagePath, materialName);
      SceneObjects.createCup(scene, camera, material);
      SceneRunner.run(engine, scene);

      setScene(scene);
    }
  }, []);

  useEffect(() => {
    if (scene) {
      const mesh = scene.meshes.at(1);

      if (mesh) {
        (mesh.material as StandardMaterial).diffuseTexture = MaterialUtil.getMaterial(scene, imagePath, materialName).diffuseTexture;
      }
    }
  }, [imagePath])

  return (
    <div>
      <canvas ref={canvas} />
      <button onClick={() => setImagePath(imagesPaths.fachowiecDynamic)}>Draw fachowiec</button>
      <button onClick={() => setImagePath(imagesPaths.reactLogo)}>Draw React logo</button>
    </div>
  );
}

export default App;
