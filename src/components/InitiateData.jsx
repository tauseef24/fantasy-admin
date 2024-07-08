import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getMatchPlayers, initMatch } from "../services/sports";

function InitiateData({ setInitData }) {
  const { matchId } = useParams();
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");
  const navigate = useNavigate();

  const [players, setPlayers] = useState({
    battingPlayers: [],
    bowlingPlayers: [],
  });

  useEffect(() => {
    getMatchPlayers(matchId)
      .then((res) => {
        console.log(res);
        setPlayers({
          battingPlayers: res.battingPlayers,
          bowlingPlayers: res.bowlingPlayers,
        });
      })
      .catch((err) => console.log(err));
  }, []); // Adding matchId to the dependency array ensures useEffect runs when matchId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (striker === nonStriker)
      alert("striker and non-striker can't be the same players");
    else {
      const data = {
        matchInit: {
          striker: striker,
          nonStriker: nonStriker,
          bowler: bowler,
        },
      };
      console.log(data);
      try {
        const response = await initMatch(matchId, data);
        console.log(data);
        console.log(response.data);
        setInitData(false);
      } catch (error) {
        alert(error);
        console.log("Error setting match details", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-32 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-violet-950 p-5 text-center rounded"
      >
        <h1 className="text-4xl text-center mb-10 text-violet-950">
          Initiate Player Roles
        </h1>

        <div className="flex justify-center mb-8 items-center">
          <select
            value={striker}
            onChange={(e) => setStriker(e.target.value)}
            required
            className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Striker</option>
            {players.battingPlayers.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mb-8 items-center">
          <select
            value={nonStriker}
            onChange={(e) => setNonStriker(e.target.value)}
            required
            className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Non Striker</option>
            {players.battingPlayers.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mb-8">
          <select
            value={bowler}
            onChange={(e) => setBowler(e.target.value)}
            required
            className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Bowler</option>
            {players.bowlingPlayers.map((player) => (
              <option key={player.playerId} value={player.playerId}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white border-violet-950 bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 border px-5 py-2 mt-5 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InitiateData;
