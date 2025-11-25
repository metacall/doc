// src/components/StarRepo.js
import React, { useState, useEffect } from "react";
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRepo = () => {
  const { activeDoc } = useActiveDocContext();
  // Get the unversioned ID consistently
  const itemId = activeDoc?.unversionedId || activeDoc?.id;
  const [isStarred, setIsStarred] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    if (isBrowser && itemId) {
      const starredItems = JSON.parse(
        localStorage.getItem("starredItems") || "[]",
      );
      setIsStarred(starredItems.includes(itemId));
    }
  }, [itemId, isBrowser]);

  const toggleStar = () => {
    if (!isBrowser || !itemId) return;

    let starredItems = JSON.parse(localStorage.getItem("starredItems") || "[]");

    // Prevent duplicates
    if (isStarred) {
      starredItems = starredItems.filter((item) => item !== itemId);
    } else if (!starredItems.includes(itemId)) {
      starredItems.push(itemId);
    }

    localStorage.setItem("starredItems", JSON.stringify(starredItems));
    setIsStarred(!isStarred);
  };

  if (!itemId) return null;

  return (
    <div
      className="star-bookmark"
      onClick={toggleStar}
      style={{ cursor: "pointer" }}
    >
      {isStarred ? <FaStar size={24} color="gold" /> : <FaRegStar size={24} />}
    </div>
  );
};

export default StarRepo;
