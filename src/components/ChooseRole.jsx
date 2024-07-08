import React, { useState, useEffect } from "react";
import { getNextPlayer, setNextPlayer } from "../services/sports";
function ChooseRole({ matchId, setPlayerModal, needPlayer }) {
  const [players, setPlayers] = useState({
    battingPlayers: [],
    bowlingPlayers: [],
  });
  const [batter, setBatter] = useState("");
  const [bowler, setBowler] = useState("");

  useEffect(() => {
    getNextPlayer(matchId, needPlayer)
      .then((res) => {
        console.log(res);
        setPlayers({
          battingPlayers: res.battingPlayers,
          bowlingPlayers: res.bowlingPlayers,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let role = "";
    if (needPlayer.needBatsman === true && needPlayer.needBowler === true)
      role = "both";
    else if (needPlayer.needBatsman === true) role = "batter";
    else if (needPlayer.needBowler === true) role = "bowler";

    let selectedPlayers = {
      role,
      player: {
        batter,
        bowler,
      },
    };

    const data = {
      selectedPlayers,
    };
    setNextPlayer(matchId, data);
    setPlayerModal(false);
    console.log(selectedPlayers);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-violet-100/50">
        <div className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 border border-violet-950 rounded-lg p-8 mx-4">
          <h1 className="text-3xl text-center mb-8 text-violet-950 font-bold">
            Select player
          </h1>
          <form onSubmit={handleSubmit} className="border p-5">
            {needPlayer.needBatsman && (
              <div className="mb-5">
                <label htmlFor="batsman" className="text-violet-950 text-start">
                  Select batsman
                </label>

                <select
                  name="batsman"
                  value={batter}
                  onChange={(e) => setBatter(e.target.value)}
                  required
                  className="block w-60 h-12 py-2 mt-4 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Player</option>
                  {players.battingPlayers.map((player) => (
                    <option key={player.playerId} value={player.playerId}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {needPlayer.needBowler && (
              <div className="mb-5">
                <label htmlFor="bowler" className="text-violet-950 text-start">
                  Select bowler
                </label>
                <select
                  value={bowler}
                  onChange={(e) => setBowler(e.target.value)}
                  required
                  className="block w-60 h-12 py-2 mt-4 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Bowler</option>
                  {players.bowlingPlayers.map((player) => (
                    <option key={player.playerId} value={player.playerId}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-violet-500 border border-violet-950 px-5 py-2 mt-5 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
