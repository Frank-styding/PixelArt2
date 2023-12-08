import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
type Props = {
  children: React.ReactNode;
};

export const Camera: React.FC<Props> = ({ children }) => {
  const { size } = useThree();
  const top = size.height / 2;
  const bottom = -size.height / 2;
  const left = -size.width / 2;
  const right = size.width / 2;
  return (
    <OrthographicCamera
      makeDefault
      zoom={1}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      near={0}
      far={2000}
      position={[0, 0, 0]}
    >
      {children}
    </OrthographicCamera>
  );
};
