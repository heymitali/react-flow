export const replaceNodeName = (nodes, id, newNodeName) => {
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
