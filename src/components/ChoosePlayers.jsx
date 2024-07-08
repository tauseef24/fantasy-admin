import React from "react";
import dhoni from "../assets/dhoni.jpg";

const ChoosePlayers = ({
  teamName,
  players,
  selectedPlayers,
  onSelectPlayer,
  onDeselectPlayer,
}) => {
  const handlePlayerSelection = (player) => {
    if (
      !selectedPlayers.find((p) => p.playerId === player.playerId) &&
      selectedPlayers.length < 11
    ) {
      onSelectPlayer(player);
    }
  };

  const handlePlayerDeselection = (playerId) => {
    onDeselectPlayer(playerId);
  };

  return (
    <div className="p-3 text-violet-950 mx-5 ">
      <h2 className="text-2xl text-center font-bold mb-4">
        {teamName} Players
      </h2>
      {players.length > 0 && (
        <table
          className="border border-violet-950 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700
        "
        >
          <thead>
            <tr>
              <th className="border-b p-3 text-white bg-violet-950">Player</th>
              <th className="border-b p-3 text-white text-start bg-violet-950">
                Name
              </th>
              <th className="border-b p-3 text-white bg-violet-950">Action</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr
                key={player.playerId}
                className={
                  selectedPlayers.find((p) => p.playerId === player.playerId)
                    ? "bg-gradient-to-tr from-violet-300 to-violet-100 text-huckleberry-700 text-violet-950"
                    : ""
                }
              >
                <td className="border-b p-3">
                  <img
                    src={player.url}
                    alt={player.name}
                    className="w-28 h-28"
                  />
                </td>
                <td className="border-b p-3">{player.name}</td>
                <td className="border-b p-3 w-40 text-center">
                  {selectedPlayers.find(
                    (p) => p.playerId === player.playerId
                  ) ? (
                    <button
                      onClick={() => handlePlayerDeselection(player.playerId)}
                      className="text-white bg-gradient-to-tr from-pink-500 to-orange-500 text-huckleberry-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-10 py-3.5 text-center me-2 mb-2 w-36"
                    >
                      Deselect
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlayerSelection(player)}
                      disabled={selectedPlayers.length >= 11}
                      className="text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-10 py-3.5 text-center me-2 mb-2 w-36"
                    >
                      Select
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {players.length === 0 && <p>No players available</p>}
    </div>
  );
};

export default ChoosePlayers;
