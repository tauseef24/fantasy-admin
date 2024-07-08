import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function sportCard({ image, sport, sportId }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => { if(sport === "Cricket") {navigate(`/admin/${sport}/${sportId}`)} else {alert("Module under construction!!")}}}
      className="relative m-5 perspective cursor-pointer"
    >
      <div
        className={
          "bg-gradient-to-tr from-blue-200 to-purple-200 text-huckleberry-700 font-bold group w-80 h-80 hover:scale-110 rounded-sm bg-black overflow-hidden shadow-lg transition-transform duration-100 ease-in-out flex items-center justify-center"
        }
      >
        <div className="relative">
          <img src={image} className="w-full h-full object-cover pb-10" />
        </div>
        <div className="absolute bottom-0 p-5 text-violet-950">
          <h1 className="text-3xl font-bold">{sport}</h1>
        </div>
      </div>
    </div>
  );
}
