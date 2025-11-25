import { useState, useEffect, Fragment } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import styles from "./styles.module.css";

export default function TreeVisualization() {
  const [array, setArray] = useState("1,2,3,4,5,6,7");
  const [traversalType, setTraversalType] = useState("inorder");
  const [activeNode, setActiveNode] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const [traversalSteps, setTraversalSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tree, setTree] = useState([]);

  const generateTree = (input) => {
    const values = input
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "")
      .map(Number);
    const n = values.length;
    if (n === 0) return [];
    const height = Math.floor(Math.log2(n)) + 1;
    const nodes = values.map((value, i) => {
      const level = Math.floor(Math.log2(i + 1));
      const posInLevel = i - (Math.pow(2, level) - 1);
      const numNodesInLevel = Math.pow(2, level);
      const x = ((posInLevel + 0.5) / numNodesInLevel) * 100;
      const y = height > 1 ? (level / (height - 1)) * 90 + 5 : 50;
      let language = "javascript";
      if (level === 0) language = "python";
      else if (level === height - 1) language = "c";
      let left = undefined;
      let right = undefined;
      if (2 * i + 1 < n) left = values[2 * i + 1];
      if (2 * i + 2 < n) right = values[2 * i + 2];
      return { id: value, language, left, right, x, y };
    });
    return nodes;
  };

  const getTraversalOrder = (type, nodes) => {
    const result = [];
    const traverse = (nodeId) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      if (type === "preorder") result.push(node.id);
      if (node.left !== undefined) traverse(node.left);
      if (type === "inorder") result.push(node.id);
      if (node.right !== undefined) traverse(node.right);
      if (type === "postorder") result.push(node.id);
    };
    if (nodes.length > 0) {
      traverse(nodes[0].id);
    }
    return result;
  };

  const handleExecute = () => {
    const newTree = generateTree(array);
    setTree(newTree);
    const steps = getTraversalOrder(traversalType, newTree);
    setTraversalSteps(steps);
    setCurrentStep(-1);
    setIsAnimating(true);
    setActiveNode(null);
    setActivePath(null);
  };

  useEffect(() => {
    if (isAnimating && currentStep < traversalSteps.length - 1) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        setActiveNode(traversalSteps[nextStep]);
        const currentNode = tree.find((n) => n.id === traversalSteps[nextStep]);
        if (currentNode) {
          const parentNode = tree.find(
            (n) => n.left === currentNode.id || n.right === currentNode.id,
          );
          if (parentNode) {
            setActivePath(`${parentNode.id}-${currentNode.id}`);
          }
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep === traversalSteps.length - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentStep, traversalSteps, tree]);

  const getNodeClasses = (nodeId) => {
    const node = tree.find((n) => n.id === nodeId);
    if (!node) return styles.node;
    const isActive = nodeId === activeNode;
    return `${styles.node} ${styles[`node-${node.language}`]} ${
      isActive ? styles.active : ""
    }`;
  };

  const getArrowColor = (fromId, toId) => {
    const pathId = `${fromId}-${toId}`;
    if (activePath === pathId) {
      const childNode = tree.find((n) => n.id === toId);
      if (childNode) {
        switch (childNode.language) {
          case "python":
            return "blue";
          case "javascript":
            return "yellow";
          case "c":
            return "red";
          default:
            return "black";
        }
      }
    }
    return "black";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading as="h1">Binary Tree Traversal Visualizer</Heading>
        <p>
          This interactive tool demonstrates how binary tree traversals work.
          The <span className={styles["blue-text"]}>blue</span> node is the root
          (Python),
          <span className={styles["yellow-text"]}> yellow</span> nodes are
          intermediate (JavaScript), and the{" "}
          <span className={styles["red-text"]}> red</span> nodes are leaves (C).
          Click "Execute Traversal" to see the animated traversal sequence.
        </p>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Enter array (comma-separated numbers)"
          value={array}
          onChange={(e) => setArray(e.target.value)}
          className={styles.input}
        />

        <select
          value={traversalType}
          onChange={(e) => setTraversalType(e.target.value)}
          className={styles.select}
        >
          <option value="inorder">Inorder</option>
          <option value="preorder">Preorder</option>
          <option value="postorder">Postorder</option>
        </select>

        <button
          onClick={handleExecute}
          disabled={isAnimating}
          className={styles.button}
        >
          Execute Traversal
        </button>
      </div>

      <div className={styles["tree-container"]}>
        <Xwrapper>
          {tree.map((node) => (
            <Fragment key={node.id}>
              {node.left !== undefined && (
                <Xarrow
                  start={`node-${node.id}`}
                  end={`node-${node.left}`}
                  color={getArrowColor(node.id, node.left)}
                  strokeWidth={activePath === `${node.id}-${node.left}` ? 3 : 2}
                  animateDrawing={true}
                  dashness={{ animation: 5 }}
                />
              )}
              {node.right !== undefined && (
                <Xarrow
                  start={`node-${node.id}`}
                  end={`node-${node.right}`}
                  color={getArrowColor(node.id, node.right)}
                  strokeWidth={
                    activePath === `${node.id}-${node.right}` ? 3 : 2
                  }
                  animateDrawing={true}
                  dashness={{ animation: 5 }}
                />
              )}
            </Fragment>
          ))}
        </Xwrapper>

        {tree.map((node) => (
          <div
            key={node.id}
            id={`node-${node.id}`}
            title={`Node ${node.id} (${node.language})`}
            className={getNodeClasses(node.id)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          >
            {node.id}
          </div>
        ))}
      </div>

      <div className={styles.sequence}>
        <div className={styles["sequence-text"]}>
          Traversal Sequence:{" "}
          <span>{traversalSteps.slice(0, currentStep + 1).join(" → ")}</span>
        </div>
        <div className={styles.legend}>
          <div className={styles["legend-item"]}>
            <div
              className={`${styles["legend-dot"]} ${styles["legend-dot-python"]}`}
            ></div>
            <span>Python (Root)</span>
          </div>
          <div className={styles["legend-item"]}>
            <div
              className={`${styles["legend-dot"]} ${styles["legend-dot-javascript"]}`}
            ></div>
            <span>JavaScript (Middle)</span>
          </div>
          <div className={styles["legend-item"]}>
            <div
              className={`${styles["legend-dot"]} ${styles["legend-dot-c"]}`}
            ></div>
            <span>C (Leaf)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
