import React from "react";

import { uploads } from "../utils/config";
import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => {
  return (
    <div className="pt-[3em]"><div className="photo-item">
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.tile} className="w-full "/>
      )}
      <h2 className="text-xl font-bold my-5">{photo.title}</h2>
      <p className="text-left">Publicada por: <Link to={`/users/${photo.userId}`} className="font-bold"> {photo.userName}</Link></p>
    </div></div>
    
  );
};

export default PhotoItem;
