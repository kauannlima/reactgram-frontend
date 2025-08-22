import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


//Components
import { OrbitProgress } from "react-loading-indicators";

const Home = () => {
  const {loading } = useSelector((state) => state.user);


    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#833AB4" size="large" text="" textColor="" />
      </div>
    );
  }

  return <div>Home</div>;
};

export default Home;

//.photo-item h2{margin-bottom: .2em}
