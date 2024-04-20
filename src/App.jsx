import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const ref = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => {
      const clickedNode = changes.find((change) => change?.selected === true);
      if (clickedNode) {
        const matchedNode = nodes.find((node) => node.id === clickedNode.id);
        setSelectedNode(matchedNode);
      }

      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [nodes]
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
          type: "default",
        },
      ]);
      return;
    }

    const lastNode = nodes[nodes.length - 1];
    const id = String(parseInt(lastNode.id) + 1);
    let largestY = 0;
    nodes.forEach((node) => {
      largestY = Math.max(largestY, node.position.y);
    });

    setNodes([
      ...nodes,
      {
        id,
        position: { x: 0, y: largestY + 100 },
        data: { label: "Node " + id },
        type: "default",
      },
    ]);
  };

  const replaceNodeName = (id, newNodeName) => {
    const updatedNodes = [];
    nodes.forEach((node) => {
      if (node.id === id) {
        updatedNodes.push({ ...node, data: { label: newNodeName } });
      } else {
        updatedNodes.push(node);
      }
    });
    return updatedNodes;
  };

  const handleSave = () => {
    if (!ref.current.value) return;
    const latestNodes = replaceNodeName(selectedNode.id, ref.current.value);
    setNodes(latestNodes);
  };

  const handleCancel = () => {
    setSelectedNode(null);
  };

  return (
    <div className="w-screen h-screen relative">
      <button
        onClick={handleCreateNode}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80 m-5 z-50 absolute"
      >
        Create Node
      </button>
      <div className="bg-gray-200 rounded-xl z-40 absolute right-0 m-5">
        {selectedNode && (
          <div className="p-4 border-2 border-gray-400 rounded-xl">
            <input
              value={selectedNode?.data?.label}
              className="p-2 text-md rounded-md"
              placeholder="Node Name"
              onChange={(e) => {
                setSelectedNode({
                  ...selectedNode,
                  data: { label: e.target.value },
                });
              }}
              ref={ref}
            />
            <div className="flex justify-end mt-4">
              <button
                className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <ReactFlow
        className="absolute z-0 bg-slate-100"
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
