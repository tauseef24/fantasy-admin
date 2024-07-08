import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import ipl_amazing_moments from "../assets/ipl_amazing_moments.mp3";
import TeamSummary from "./TeamSummary";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MatchSummary = () => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(new Audio(ipl_amazing_moments));
  const [matchDetails, setMatchDetails] = useState(null);
  const { matchId } = useParams();

  const toggleAudio = () => {
    const audio = audioRef.current;
    setPlay(!play);
    if (!play) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/admin/matchSummary/${matchId}`
        );
        setMatchDetails(response.data);
      } catch (error) {
        console.error("Error fetching match summary:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Confetti width={1450} height={750} />
      <div
        onClick={toggleAudio}
        className="w-full h-screen flex flex-col justify-center items-center gap-y-6 bg-[url('https://assets.bcci.tv/bcci/photos/1364/07283409-7aa4-44c9-8d55-2eee876b441f.jpg')] bg-cover"
      >
        <div className="flex flex-row bg-gradient-to-r from-slate-400 to-slate-50 w-[50%] shadow-lg shadow-slate-800 rounded-lg py-4 items-center">
          <img
            className="pl-8 w-25 h-14 rounded-lg shadow-md shadow-slate-400"
            src="https://upload.wikimedia.org/wikipedia/mr/3/35/DLF_IPL_logo.png"
          />
          <p className="pl-32 font-bold text-4xl">MATCH SUMMARY</p>
        </div>
        {matchDetails && <TeamSummary matchDetails={matchDetails} />}
      </div>
    </>
  );
};

export default MatchSummary;
