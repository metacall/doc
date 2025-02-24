import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRepo = ({ itemId }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  // Check if we're in the browser environment
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const starredItems = JSON.parse(localStorage.getItem('starredItems') || '[]');
      setIsStarred(starredItems.includes(itemId));
    }
  }, [itemId, isBrowser]);

  const toggleStar = () => {
    if (!isBrowser) return;

    let starredItems = JSON.parse(localStorage.getItem('starredItems') || '[]');
    
    if (isStarred) {
      starredItems = starredItems.filter(item => item !== itemId);
    } else {
      starredItems.push(itemId);
    }

    localStorage.setItem('starredItems', JSON.stringify(starredItems));
    setIsStarred(!isStarred);
  };

  return (
    <div className="star-bookmark" onClick={toggleStar} style={{ cursor: 'pointer' }}>
      {isStarred ? <FaStar size={24} color="gold" /> : <FaRegStar size={24} />}
    </div>
  );
};

export default StarRepo;