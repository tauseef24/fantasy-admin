import React from "react";
import Navbar from "../components/Navbar";
import image from "../assets/welcome.jpg";
import ChooseSport from "../components/ChooseSport";

const Admin = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div>
        <p className="text-4xl text-violet-950 font-bold">
          Hello there admin!! to choose a sport, please click on home
        </p>
      </div>
    </div>
  );
};

export default Admin;
