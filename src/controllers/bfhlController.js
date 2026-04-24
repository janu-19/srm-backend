const { validateEdges } = require("../utils/validateEdges");
const { buildGraph, buildHierarchies } = require("../utils/graphUtils");

const processData = (req, res) => {
  const { data } = req.body;
  const { validEdges, invalidEntries } = validateEdges(data);
  const { graph, allNodes, childToParent } = buildGraph(validEdges);
  const hierarchies = buildHierarchies(graph, allNodes, childToParent);

  // Duplicates (simplified: track in validateEdges)
  const duplicateEdges = []; // Expand if needed

  // Summary
  const trees = hierarchies.filter(h => !h.has_cycle);
  const totalTrees = trees.length;
  const totalCycles = hierarchies.length - totalTrees;
  const largestTree = trees.reduce((max, h) => h.depth > (max?.depth || 0) || (h.depth === max?.depth && h.root < max.root) ? h : max, null);
  const largestTreeRoot = largestTree ? largestTree.root : null;

  res.json({
    user_id: 'john_doe_17091999',
    email_id: 'john@xyz.com',
    college_roll_number: 'ABCD123',
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary: { total_trees: totalTrees, total_cycles: totalCycles, largest_tree_root: largestTreeRoot }
  });
};

module.exports = { processData };