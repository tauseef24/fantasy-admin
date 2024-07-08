import React, { useEffect, useState } from "react";
import SportCard from "./cards/SportCard";
import { getSports } from "../services/sports";
import image1 from "../assets/cricket1.png";
import image2 from "../assets/football1.png";
import image3 from "../assets/basketball1.png";
import image4 from "../assets/volleyball1.png";

function ChooseSport() {
  const [sports, setSports] = useState([]);

  const sportImageMap = {
    Cricket: image1,
    Football: image2,
    Basketball: image3,
    Volleyball: image4,
  };

  const fetchSports = () => {
    getSports()
      .then((res) => {
        console.log(res), setSports(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center">
        <h5 className="text-base text-center mt-10 mb-5 text-violet-950 font-bold md:text-5xl w-100 py-4 px-4 rounded-md">
          Choose Sport
        </h5>
      </div>

      <div
        id="app"
        className="container mx-auto mt-8 flex flex-wrap justify-center"
      >
        {sports.map((sport) => (
          <SportCard
            key={sport._id}
            image={sportImageMap[sport.sport]}
            sport={sport.sport}
            sportId={sport._id}
          />
        ))}
      </div>
    </div>
  );
}

export default ChooseSport;
