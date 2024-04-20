import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const CustomNode = ({ data, isConnectable, id }) => {
  const { setNodes, setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      className="bg-white p-[10px] text-[12px] border-[1px] border-black rounded-[3px] w-[150px] text-center selection:border-[5px] hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <span>{data.label}</span>
      <Handle
        type="destination"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      {isHovered && (
        <img
          src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
          className="absolute w-[20px] -top-2 -right-2"
          onClick={deleteNode}
        />
      )}
    </div>
  );
};

export default CustomNode;
