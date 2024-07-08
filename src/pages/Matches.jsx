import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MatchLanding from "./MatchLanding";
import PlayersPage from "./PlayersPage";

const teamLogoMap = {
  CSK: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
  MI: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
  RCB: "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
  SRH: "https://scores.iplt20.com/ipl/teamlogos/SRH.png",
  KKR: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
  GT: "https://scores.iplt20.com/ipl/teamlogos/GT.png",
  LSG: "https://scores.iplt20.com/ipl/teamlogos/LSG.png",
  PBKS: "https://scores.iplt20.com/ipl/teamlogos/PBKS.png",
  DC: "https://scores.iplt20.com/ipl/teamlogos/DC.png",
  RR: "https://scores.iplt20.com/ipl/teamlogos/RR.png",
};

const stadiumMap = {
  CSK: "Chepauk Stadium, Chennai",
  MI: "Wankhede Stadium, Mumbai",
  RCB: "Chinnaswamy Stadium, Bengaluru",
  SRH: "VDCA Cricket Stadium, Vishakapatnam",
  KKR: "Eden Gardens, Kolkata",
  GT: "Narendra Modi Stadium, Ahmedabad",
  LSG: "Ekana Sports City, Lucknow",
  PBKS: "Dharmshala CricketStadium, Dharmshala",
  DC: "Arun Jaitley Stadium, Delhi",
  RR: "Sawai Mansingh Stadium, Jaipur",
};

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/fantasy-matches"
      );
      const sortedMatches = response.data.sort((a, b) => {
        const dateA = moment(a.date + " " + a.time, "YYYY-MM-DD HH:mm");
        const dateB = moment(b.date + " " + b.time, "YYYY-MM-DD HH:mm");
        return dateA - dateB;
      });
      setMatches(sortedMatches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [showModal]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gradient-to-tr from-violet-400 to-violet-200">
      <div className="flex items-center flex-col justify-center ">
        <div className="flex h-28 w-full text-violet-950 items-center justify-between px-[7%]">
          <h1 className="text-4xl font-bold font-BebasNeue">Matches</h1>
          <button
            onClick={openModal}
            className="w-[200px] bg-violet-600 text-white bg-primary-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-3.5 text-center"
          >
            Create Match
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20">
            <div className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 rounded-lg shadow-lg border-2 border-black">
              <div className="flex justify-end">
                <button
                  className="text-white-500 hover:text-gray-700 text-3xl bg-red-500 px-3 h-[40px] rounded font-bold border-l-2 border-b-2 border-black"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <div>
                <MatchLanding setShowModal={setShowModal} />
              </div>
            </div>
          </div>
        )}

        <div
          className="flex flex-col w-full md:w-[80%] justify-center items-center rounded-xl bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 font-bold text-violet-950 border-2 border-gray-400 mb-10"
          id="match-outer-card"
        >
          {matches.map((key, index) => (
            <div key={index} className="flex flex-row w-full border-b-2 border-gray-400">
              <div className="flex flex-col basis-1/6 items-start pl-5 justify-center border-r-2 border-red-600 border-dotted">
                <div className="flex flex-row items-center my-1">
                  <div className="flex text-sm border-2 border-red-600 py-1 px-2">
                    MATCH {index + 1}
                  </div>
                  <div className="h-[2px] w-[80px] flex  bg-red-600"></div>
                </div>
                <div className="my-5">
                  <h1 className="font-bold text-xl">
                    {moment(key.date).format("MMM, ddd D")}
                  </h1>
                  <p className="text-base mt-2">
                    {moment(key.time, "HH:mm").format("h:mm a")} IST
                  </p>
                </div>
              </div>
              <div className="flex basis-5/6 flex-col  p-5">
                <div className="flex py-1 px-2">
                  {stadiumMap[key.teamA.name]}
                </div>
                <div className="flex flex-row justify-center py-[30px] ">
                  <div className="text-xl font-bold flex basis-5/6 gap-x-5">
                    <div className="flex justify-center items-center">
                      <img
                        src={teamLogoMap[key.teamA.name]}
                        width="60px"
                        alt=""
                      />{" "}
                      <span>{key.teamA.name}</span>{" "}
                    </div>
                    <div className="flex justify-center items-center font-semibold">
                      VS
                    </div>
                    <div className="flex justify-center items-center">
                      <img
                        src={teamLogoMap[key.teamB.name]}
                        width="60px"
                        alt=""
                      />{" "}
                      <span>{key.teamB.name}</span>{" "}
                    </div>
                  </div>
                  <div className="flex basis-1/6 h-[70%]">
                    <button
                      onClick={() => {
                        navigate(
                          `/admin/${key.sportDetails.sport}/${key.leagueDetails.leagueId}/${key._id}`
                        );
                      }}
                      className="px-5 py-4 bg-gradient-to-tr from-pink-500 to-orange-500 text-huckleberry-700 hover:bg-gradient-to-tr hover:from-white hover:to-white -skew-x-[18deg] pb-8 rounded-sm hover:border-2 hover:border-[#ef4123] hover:text-[#ef4123] transition-all duration-300 text-xs text-white z-1 "
                    >                
                      MATCH CENTRE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Matches;
