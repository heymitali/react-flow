import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

const Flow = () => {
  return (
    <div className="w-[100%] h-[100%]">
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
