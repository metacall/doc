import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import TreeVisualization from "../TreeTraversal/index";

export default function DocusaurusTreeVisualization() {
  return (
    <BrowserOnly>
      {() => (
        <div style={{ margin: "2rem 0" }}>
          <TreeVisualization />
        </div>
      )}
    </BrowserOnly>
  );
}
