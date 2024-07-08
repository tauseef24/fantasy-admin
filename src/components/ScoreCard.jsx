import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ScoreCard = () => {
  const [matchScore, setMatchScore] = useState([]);
  const { matchId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/admin/matchScoreCard/${matchId}`
        );
        console.log(res.data);
        setMatchScore(res.data);
        console.log(matchScore);
      } catch (err) {
        console.log("Error fetching match summary", err);
      }
    };
    fetchData();
  }, []);

  const handleclick = () => {
    navigate(`/admin/matchsummary/${matchId}`);
  };

  //   console.log(matchScore[1].bowlers[0].runs);
  return (
    <>
      <div className="py-16 bg-gradient-to-tr from-violet-400 to-violet-200">
        <div className="flex h-28 w-full text-violet-950 items-center justify-between px-[7%] mb-4">
          <h1 className="text-4xl font-bold font-BebasNeue">Score Card</h1>
          <button
            onClick={handleclick}
            className="w-[200px] bg-violet-600 text-white bg-primary-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-3.5 text-center"
          >
            Match Summary
          </button>
        </div>
        <div>
          {matchScore.map((team, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <div className="flex flex-row justify-between bg-violet-950 w-[80%] font-bold text-white p-2">
                <p>{team.teamInfo.teamName}</p>
                <p>
                  {team.teamInfo.score}/{team.teamInfo.wickets} 
                  ({team.overs})
                </p>
              </div>
              <div className="grid grid-cols-7 bg-violet-200 gap-4 text-black font-bold text-lg text-start pl-2 w-[80%]">
                <div className="col-span-2">Batting</div>
                <div>R</div>
                <div>B</div>
                <div>4s</div>
                <div>6s</div>
                <div>SR</div>
              </div>
              {team.batsmen.map((batsman, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 gap-4 font-medium text-sm text-start pl-2 w-[80%] border-b-2 border-gray-300"
                >
                  <div className="col-span-2 flex flex-col p-2">
                    <div className="text-violet-950 text-lg">
                      {batsman.name}
                    </div>
                    <div className="text-sm">{batsman.getOutBy}</div>
                  </div>
                  <div className="pt-4">{batsman.runs}</div>
                  <div className="pt-4">{batsman.balls}</div>
                  <div className="pt-4">{batsman.fours}</div>
                  <div className="pt-4">{batsman.sixes}</div>
                  <div className="pt-4">{batsman.strikeRate}</div>
                </div>
              ))}
              <div className="grid grid-cols-5 bg-violet-200 gap-4 text-black font-bold text-lg text-start pl-2 w-[80%]">
                <div className="col-span-2">Bowling</div>
                <div>R</div>
                <div>O</div>
                <div>ER</div>
              </div>
              {team.bowlers.map((bowler, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 gap-4 font-medium text-sm text-start pl-2 w-[80%] border-b-2 border-gray-300"
                >
                  <div className="col-span-2 p-2">
                    <div className="text-violet-950">{bowler.name}</div>
                  </div>
                  <div className="pt-4">{bowler.runs}</div>
                  <div className="pt-4">
                    {bowler.overs + (bowler.balls % 6) / 10}
                  </div>
                  <div className="pt-4">{bowler.economy}</div>
                </div>
              ))}

              <div className="grid grid-cols-7 bg-gradient-to-tr from-blue-200 to-purple-100 text-huckleberry-700 gap-4 font-medium text-sm text-start pl-2 w-[80%] border-b-2 border-violet-100">
                <div className="col-span-2 flex flex-col p-2">Extras</div>
                <div className="col-start-3 col-end-7 pt-2">
                  {team.teamInfo.extras}
                </div>
              </div>
              <div className="grid grid-cols-7 bg-gradient-to-tr from-blue-200 to-purple-100 text-huckleberry-700 gap-4 font-medium text-sm text-start pl-2 w-[80%] border-b-2 border-violet-100 mb-10">
                <div className="col-span-2 flex flex-col p-2">Total</div>
                <div className="col-start-3 col-end-7 pt-2">
                  {team.teamInfo.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
