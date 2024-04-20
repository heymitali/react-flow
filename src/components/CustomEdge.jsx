import { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "reactflow";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const { setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleClick = () => setEdges((es) => es.filter((e) => e.id !== id));

  return (
    <>
      <g
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer onClick={handleClick}>
          {isHovered && (
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
              className="w-[12px] absolute z-50"
              onClick={handleClick}
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: "all",
              }}
            />
          )}
        </EdgeLabelRenderer>
      </g>
    </>
  );
};
export default CustomEdge;
