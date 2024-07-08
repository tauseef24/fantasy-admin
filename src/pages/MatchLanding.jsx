import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeams, getMatches, createMatch } from "../services/sports";

export default function MatchLanding({ setShowModal }) {
  const { sportId, leagueId } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [matchId, setMatchId] = useState();
  const [match, setMatch] = useState({
    date: "",
    leagueId: leagueId,
    team1: {},
    team2: {},
    time: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setMatch((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTeams = async () => {
    try {
      getTeams(leagueId)
        .then((res) => setTeams(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (match.team1 === match.team2) alert("both are same teams");
    else {
      createMatch(match)
        .then((res) => {
          setShowModal(false);
        })
        .catch((res) => console.log(res));
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [leagueId]);

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={onSubmitForm} className="pb-5 pr-5 pl-5 text-center">
        <h1 className="text-4xl text-center mb-10 text-violet-950 font-bold">
          Create Match
        </h1>
        <div className="flex justify-between mb-8">
          <select
            name="team1"
            onChange={handleData}
            required
            className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
          <p className="text-violet-950 font-bold mx-5 mt-3">VS</p>
          <select
            onChange={handleData}
            name="team2"
            required
            className="block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-x-16">
          <input
            type="date"
            name="date"
            onChange={handleData}
            required
            className="block mb-8 h-12 bg-slate-200 w-full border border-black rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
          <input
            type="time"
            name="time"
            onChange={handleData}
            required
            className="block h-12 bg-slate-200 font-semibold w-full border border-black rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-violet-500 border-black border px-5 py-2 mt-5 hover:bg-violet-600 hover:text-white rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
