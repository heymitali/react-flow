import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleCreateNode = () => {
    if (nodes.length === 0) {
      setNodes([
        {
          id: "1",
          position: { x: 0, y: 0 },
          data: { label: "Node 1" },
          type: "input",
        },
      ]);
      return;
    }

    const lastNode = nodes[nodes.length - 1];
    const id = String(parseInt(lastNode.id) + 1);

    setNodes([
      ...nodes,
      {
        id,
        position: { x: 0, y: lastNode.position.y + 100 },
        data: { label: "Node " + id },
        type: "default",
      },
    ]);
  };

  return (
    <div className="w-screen h-screen">
      <button
        onClick={handleCreateNode}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80 m-5 z-50 fixed"
      >
        Create Node
      </button>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background className="z-0" />
        <Controls className="z-10" />
      </ReactFlow>
    </div>
  );
};

export default App;
