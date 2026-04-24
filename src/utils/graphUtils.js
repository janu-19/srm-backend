// Builds graph: adjacency list {parent: [children]}, allNodes Set, childToParent Map
const buildGraph = (validEdges) => {
  const graph = {};
  const allNodes = new Set();
  const childToParent = new Map();

  for (const edge of validEdges) {
    const [parent, child] = edge.split('->');
    allNodes.add(parent);
    allNodes.add(child);

    if (!graph[parent]) graph[parent] = [];
    graph[parent].push(child);

    // Multi-parent: only first parent
    if (!childToParent.has(child)) {
      childToParent.set(child, parent);
    }
  }

  return { graph, allNodes, childToParent };
};

// Finds roots: nodes not as children, or lex smallest for cycles
const findRoots = (allNodes, childToParent) => {
  const roots = [];
  for (const node of allNodes) {
    if (!childToParent.has(node)) {
      roots.push(node);
    }
  }
  // If no roots (pure cycle), use lex smallest
  if (roots.length === 0) {
    roots.push([...allNodes].sort()[0]);
  }
  return roots;
};

// DFS for cycle: returns true if cycle, builds tree if no cycle
const dfs = (node, graph, visited, recStack, tree) => {
  visited.add(node);
  recStack.add(node);
  tree[node] = {};

  for (const child of graph[node] || []) {
    if (!visited.has(child)) {
      if (dfs(child, graph, visited, recStack, tree[node])) return true;
    } else if (recStack.has(child)) {
      return true; // Cycle
    }
  }

  recStack.delete(node);
  return false;
};

// Detects cycle and builds tree for a root
const detectCycleAndBuildTree = (root, graph) => {
  const visited = new Set();
  const recStack = new Set();
  const tree = {};
  const hasCycle = dfs(root, graph, visited, recStack, tree);
  return { tree: hasCycle ? {} : tree, hasCycle };
};

// Calculates depth of tree
const calculateDepth = (tree) => {
  if (Object.keys(tree).length === 0) return 0;
  let maxDepth = 0;
  for (const childTree of Object.values(tree)) {
    maxDepth = Math.max(maxDepth, calculateDepth(childTree));
  }
  return maxDepth + 1;
};

// Builds all hierarchies
const buildHierarchies = (graph, allNodes, childToParent) => {
  const roots = findRoots(allNodes, childToParent);
  const hierarchies = [];
  const visited = new Set();

  for (const root of roots) {
    if (!visited.has(root)) {
      const { tree, hasCycle } = detectCycleAndBuildTree(root, graph);
      const depth = hasCycle ? 0 : calculateDepth(tree);
      hierarchies.push({ root, tree, has_cycle: hasCycle, depth });
      // Mark visited (simplified)
      visited.add(root);
    }
  }

  return hierarchies;
};

module.exports = { buildGraph, buildHierarchies };