import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChoosePlayers from "../components/ChoosePlayers";
import { getPlayers, setMatch, getMatchData } from "../services/sports";
import { useParams } from "react-router-dom";
import Confirmation from "../components/Confirmation";
import InitiateData from "../components/InitiateData";

const PlayersPage = () => {
  const params = useParams();
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [teamAid, setTeamAid] = useState("");
  const [teamBid, setTeamBid] = useState("");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [team1SelectedPlayers, setTeam1SelectedPlayers] = useState([]);
  const [team2SelectedPlayers, setTeam2SelectedPlayers] = useState([]);
  const [tossWinner, setTossWinner] = useState("");
  const [batFirst, setBatFirst] = useState("");
  const [overs, setOvers] = useState(20);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  const fetchPlayerData = async () => {
    try {
      const response = await getPlayers(params.matchId);
      const { teamA, teamB } = response.data;
      setTeamAName(teamA.name);
      setTeamBName(teamB.name);
      setTeamAPlayers(teamA.players);
      setTeamBPlayers(teamB.players);
      setTeamAid(teamA.teamId);
      setTeamBid(teamB.teamId);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const fetchMatchData = async () => {
    try {
      const res = await getMatchData(params.matchId);
      console.log(res);
      const matchData = res.completed;
      console.log(matchData);
      if (matchData) {
        navigate(`/admin/scorecard/${params.matchId}`);
      } else {
        navigate(`/admin/ballbyball/${params.matchId}`);
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  useEffect(() => {
    fetchMatchData();
    fetchPlayerData();
  }, []);

  const handleTeam1PlayerSelection = (player) => {
    setTeam1SelectedPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const handleTeam1DeselectPlayer = (playerId) => {
    setTeam1SelectedPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.playerId !== playerId)
    );
  };

  const handleTeam2PlayerSelection = (player) => {
    setTeam2SelectedPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const handleTeam2DeselectPlayer = (playerId) => {
    setTeam2SelectedPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.playerId !== playerId)
    );
  };

  const handleSubmit = async () => {
    const data = {
      teams: {
        teamA: {
          id: teamAid,
          players: team1SelectedPlayers.map((player) => player.playerId),
        },
        teamB: {
          id: teamBid,
          players: team2SelectedPlayers.map((player) => player.playerId),
        },
      },
      toss: tossWinner,
      battingFirst: batFirst,
      currentBatting: batFirst,
      currentBowling: batFirst === teamAid ? teamBid : teamAid,
      overs: overs,
    };

    try {
      const response = await setMatch(params.matchId, data);
      console.log(response.data);
      openModal();
    } catch (error) {
      console.log("Error setting match details", error);
    }
  };
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-violet-100 bg-opacity-70 z-20">
          <div className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 rounded-lg shadow-lg p-8">
            <div className="modal-content">
              <Confirmation setShowModal={setShowModal} />
            </div>
            {/* <div className="modal-content">
                <InitiateData />
              </div> */}
          </div>
        </div>
      )}
      <div className="bg-gradient-to-tr from-violet-400 to-violet-200">
        <div className="flex justify-center">
          <ChoosePlayers
            teamName={teamAName}
            players={teamAPlayers}
            selectedPlayers={team1SelectedPlayers}
            onSelectPlayer={handleTeam1PlayerSelection}
            onDeselectPlayer={handleTeam1DeselectPlayer}
          />
          <ChoosePlayers
            teamName={teamBName}
            players={teamBPlayers}
            selectedPlayers={team2SelectedPlayers}
            onSelectPlayer={handleTeam2PlayerSelection}
            onDeselectPlayer={handleTeam2DeselectPlayer}
          />
        </div>
        <div className="flex justify-center w-full items-center p-10">
          <div className="flex justify-betwen items-center gap-x-10">
            <div className="mb-5">
              <label
                className="text-violet-950 text-lg font-bold"
                htmlFor="tossWinner"
              >
                Toss Winner:{" "}
              </label>
              <select
                className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="tossWinner"
                value={tossWinner}
                onChange={(e) => setTossWinner(e.target.value)}
              >
                <option value="">Select Team</option>
                <option value={teamAid}>{teamAName}</option>
                <option value={teamBid}>{teamBName}</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                className="text-violet-950 text-lg font-bold"
                htmlFor="decision"
              >
                Choose to:{" "}
              </label>
              <select
                className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="decision"
                value={batFirst}
                onChange={(e) => setBatFirst(e.target.value)}
              >
                <option value="">Select Decision</option>
                <option value={tossWinner}>Bat</option>
                <option value={tossWinner === teamAid ? teamBid : teamAid}>
                  Bowl
                </option>
              </select>
            </div>
            <div className="mb-5">
              <label
                className="text-violet-950 text-lg font-bold"
                htmlFor="overs"
              >
                Overs:{" "}
              </label>
              <select
                className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="overs"
                value={overs}
                onChange={(e) => setOvers(e.target.value)}
              >
                <option value="">Select Decision</option>
                <option value="2">2</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-5">
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white border border-violet-950 bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3.5 text-center me-2 mb-2 w-40"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PlayersPage;
