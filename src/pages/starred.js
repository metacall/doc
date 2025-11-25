// src/pages/starred.js
import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { FaStar } from "react-icons/fa";

const StarredPage = () => {
  const [starredItems, setStarredItems] = useState([]);
  const [isBrowser, setIsBrowser] = useState(false);
  const allDocsData = useAllDocsData();
  const baseUrl = useBaseUrl("/");

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const items = JSON.parse(localStorage.getItem("starredItems") || "[]");
      setStarredItems(items);
    }
  }, [isBrowser]);

  // Get all docs from all versions
  const allDocs = Object.values(allDocsData).flatMap((versionData) =>
    versionData.versions.flatMap((v) => v.docs),
  );

  const starredDocs = allDocs.filter((doc) =>
    starredItems.includes(doc.unversionedId || doc.id),
  );

  return (
    <Layout title="Starred Docs" description="Your starred documentation">
      <div className="container margin-vert--xl">
        <Heading as="h1">⭐ Starred tutorials</Heading>
        <div className="row">
          {starredDocs.length > 0 ? (
            starredDocs.map((doc, index) => {
              const permalink =
                doc.permalink ||
                `${baseUrl}docs/${doc.unversionedId || doc.id}`;

              return (
                <div className="col col--6 margin-bottom--md" key={index}>
                  <div className="card">
                    <div
                      className="card__body"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={permalink}
                        style={{
                          fontSize: "1.5rem",
                          color: "#c1c2c5",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {doc.id.split("/").pop().charAt(0).toUpperCase() +
                          doc.id.split("/").pop().slice(1)}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>
              No documents starred yet. Start starring docs to see them here!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StarredPage;
