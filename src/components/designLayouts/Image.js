import React from "react";

const handleImageError = (e) => {
  e.target.src = "https://via.placeholder.com/150?text=No+Image";
};

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} onError={handleImageError} />;
};

export default Image;
