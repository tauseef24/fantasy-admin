import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeams, getMatches } from '../services/sports';

const MatchForm = () => {
  const { sportId, leagueId } = useParams();
  const navigate= useNavigate();
  const [isDropdownOneOpen, setIsDropdownOneOpen] = useState(false);
  const [isDropdownTwoOpen, setIsDropdownTwoOpen] = useState(false);
  const [selectedTeam1, setSelectedTeam1] = useState('');
  const [selectedTeam2, setSelectedTeam2] = useState('');
  const [teams, setTeams] = useState([]);
  const [matchDate, setMatchDate] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams(leagueId);
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await getMatches(leagueId);
        console.log(response.data);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchTeams();
    fetchMatches();
  }, [leagueId]);

  const toggleDropdownOne = () => {
    setIsDropdownOneOpen(!isDropdownOneOpen);
  };

  const toggleDropdownTwo = () => {
    setIsDropdownTwoOpen(!isDropdownTwoOpen);
  };

  const handleTeam1Selection = (team) => {
    setSelectedTeam1(team);
    setIsDropdownOneOpen(false);
  };

  const handleTeam2Selection = (team) => {
    setSelectedTeam2(team);
    setIsDropdownTwoOpen(false);
  };

  const handleDateChange = (event) => {
    setMatchDate(event.target.value);
  };

  const handleSubmit = () =>{
    // TBD: add some validation before submitting
  }

  const handleMatchRowClick = (matchId) => {
        navigate(`/admin/${sportId}/${leagueId}/${matchId}`)
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <div className="mt-20 w-[80%] flex flex-col items-center justify-center mb-5">
          <h3 className="text-sky-900 underline mb-5 w-full text-4xl font-bold leading-none tracking-tight ">Existing Matches:</h3>
          <table className="min-w-full divide-y divide-gray-200 mb-10">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team A</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team B</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match._id} onClick={() => handleMatchRowClick(match._id)}>
                  <td className="px-6 py-4 whitespace-nowrap">{match.matchNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(match.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{match.teamA.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{match.teamB.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bg-sky-100 min-w-[40%] flex flex-col justify-center items-center p-10 rounded-lg shadow-sky-700 shadow-xl'>
            <h3 className="text-sky-900 underline w-full mb-16 text-4xl font-bold leading-none tracking-tight ">Create Match:</h3>
            <h3 className="mb-16 text-3xl font-bold leading-none tracking-tight text-sky-800">Enter Match Details</h3>
            <div className='flex gap-20 items-center'>
                <div className="relative">
                <button
                    id="dropdownDefaultButton1"
                    onClick={toggleDropdownOne}
                    className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    {selectedTeam1 || 'Choose Team 1'}
                    <svg
                    className={`w-2.5 h-2.5 ms-3 ${isDropdownOneOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                    </svg>
                </button>

                {isDropdownOneOpen && (
                    <div
                    id="dropdown1"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute top-full left-0 w-44 dark:bg-gray-700 opacity-75"
                    >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton1">
                        {teams.map((team, index) => (
                        <li key={index}>
                            <button
                            className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => handleTeam1Selection(team.name)}
                            >
                            {team.name}
                            </button>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </div>

                <h2 className='font-serif font-extrabold'>VS</h2>

                <div className="relative">
                <button
                    id="dropdownDefaultButton2"
                    onClick={toggleDropdownTwo}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    {selectedTeam2 || 'Choose Team 2'}
                    <svg
                    className={`w-2.5 h-2.5 ms-3 ${isDropdownTwoOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                    </svg>
                </button>

                {isDropdownTwoOpen && (
                    <div
                    id="dropdown2"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute top-full left-0 w-44 dark:bg-gray-700 opacity-75"
                    >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton2">
                        {teams.map((team, index) => (
                        <li key={index}>
                            <button
                            className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => handleTeam2Selection(team.name)}
                            >
                            {team.name}
                            </button>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </div>
            </div>

            <div className="mt-20 w-[60%] flex items-center justify-center mb-20">
                <label htmlFor='input-date' className="block mb-1 w-[50%] text-xl font-bold text-sky-800 mr-2">Enter Match date:</label>
                <input 
                    id="input-date"
                    type="date" 
                    placeholder='Match date' 
                    className="block w-[50%] px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={matchDate}
                    onChange={handleDateChange}
                />
            </div>
            <button onClick={handleSubmit} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
        </div>     
    </div>
  );
};

export default MatchForm;
