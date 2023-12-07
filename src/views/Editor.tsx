import styles from "./editor.module.css";
import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import { GridPlane } from "./GridPlane";
export const Editor = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.controls} ${styles.panel}`}></div>
      <div className={`${styles.display} ${styles.panel}`}>
        <Canvas>
          <ambientLight />
          <Camera>
            <GridPlane gridDim={[24, 24]} celdSize={50} />
          </Camera>
        </Canvas>
      </div>
      <div className={`${styles.time_line} ${styles.panel}`}></div>
    </section>
  );
};
