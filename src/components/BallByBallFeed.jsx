import React from "react";
import { useState, useEffect } from "react";


import {
  getCurrentFieldingPlayers,
  getCurrentScore,
  swapBatsman,
  updateScore,
} from "../services/sports";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ChooseRole from "./ChooseRole";
import InitiateData from "./InitiateData";

const BallByBallFeed = () => {
  const { matchId } = useParams();
  const [currentScore, setCurrentScore] = useState(null);
  const [fieldingPlayers, setFieldingPlayers] = useState([]);
  const [modal, setModal] = useState(false);
  const [playerModal, setPlayerModal] = useState(false);
  const [socket, setSocket] = useState(null);
  const [initData, setInitData] = useState(false);

  const navigate = useNavigate();


  const defaultNeed = {
    needBatsman: false,
    needBowler: false,
  };

  const defaultBall = {
    runs: 0,
    wide: false,
    noBall: false,
    byes: 0,
    legByes: 0,
    wicket: false,
    wicketType: "",
    outId: "",
    fielders: ["", ""],
  };

  const [ballData, setBallData] = useState({ ...defaultBall });
  const [needPlayer, setNeedPlayer] = useState({ ...defaultNeed });

  const fetchMatcScore = () => {
    getCurrentScore(matchId)
      .then((res) => {
        console.log(res);
        if (res?.matchCompleted) {
          alert("Match completed");
          navigate(`/admin/scorecard/${matchId}`);
        } else if (res?.inningsBreak) setInitData(true);
        else setCurrentScore(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchCurrentFieldingPlayers = () => {
    getCurrentFieldingPlayers(matchId).then((res) => {
      setFieldingPlayers(res);
    });
  };

  useEffect(() => {
    fetchMatcScore();
    fetchCurrentFieldingPlayers();
    const socket = io("http://localhost:8000");
    setSocket(socket);

    socket.on("liveScoreUpdated", (res) => {
      if (res?.matchCompleted) {
        alert("match completed");
        navigate(`/admin/scorecard/${matchId}`);
      } else if (res?.inningsBreak) setInitData(true);
      else setCurrentScore(res);
    });

    return () => {
      socket.disconnect();
    };
  }, [initData]);

  const handleBallDataChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setBallData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setBallData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name === "wicket" && checked === true) setModal(true);
  };

  const handleFielders = (value, pos) => {
    if (pos == 0)
      setBallData((prev) => ({
        ...prev,
        fielders: [value],
      }));
    else
      setBallData((prev) => ({
        ...prev,
        fielders: [ballData.fielders[0], value],
      }));
  };

  const handleWicketTypeChange = (event) => {
    const selectedWicketType = event.target.value;
    setBallData((prevState) => ({
      ...prevState,
      wicketType: selectedWicketType,
      outId: currentScore?.striker.playerId,
      fielders: [],
    }));
  };

  const handleWicketSubmit = (e) => {
    e.preventDefault();
    console.log(ballData);
    if (
      ballData.fielders.length > 1 &&
      ballData.fielders[0] === ballData.fielders[1]
    )
      alert("same");
    else {
      setBallData((prevState) => ({
        ...prevState,
        wicket: false,
      }));
      setBallData((prevState) => ({
        ...prevState,
        wicket: true,
      }));
      setModal(false);
    }
  };

  const handleWicketPopupClose = () => {
    setBallData((prev) => ({ ...prev, wicket: false, fielders: ["", ""] }));
    setModal(false);
  };

  const handleRuns = (runs) => {
    setBallData((prev) => ({ ...prev, runs: runs }));
  };

  const onSwapBatsman = () => {
    swapBatsman(matchId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const submitBallScore = () => {
    const ballByBall = {
      deliveryType: "ball",
      runs: ballData.runs,
      extras: {
        byes: ballData.byes,
        legByes: ballData.legByes,
        wide: ballData.wide,
        noBall: ballData.noBall,
      },
      wicket: {
        isOut: ballData.wicket,
        type: ballData.wicketType,
        batsmanId: ballData.outId,
        playersInvolved: ballData.fielders,
        bowlerId: currentScore.bowler.playerId,
      },
    };
    const data = {
      ballByBall,
    };
    updateScore(matchId, data)
      .then((res) => {
        setBallData({ ...defaultBall });
        if (res.matchCompleted) navigate(`/admin/scorecard/${matchId}`);
        else if (res.inningsBreak) {
          alert("First Innings done!");
          setInitData(true);
        } else if (
          res.nextPlayer.needBatsman === true ||
          res.nextPlayer.needBowler === true
        ) {
          setPlayerModal(true);
          setNeedPlayer({ ...res.nextPlayer });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-20 pt-16 h-screen">
      {initData === true && (
        <div className="">
          <div className="flex items-center justify-center">
            <div className="">
              <InitiateData setInitData={setInitData} />
            </div>
          </div>
        </div>
      )}
      {!initData && (
          <div className="flex gap-x-5 mt-20">
            <div className="flex w-full flex-col items-center">
              {playerModal === true && (
                <div className="fixed top-60 bg-black ">
                  <ChooseRole
                    matchId={matchId}
                    setPlayerModal={setPlayerModal}
                    needPlayer={needPlayer}
                  />
                </div>
              )}
              <div className="flex w-full  bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 p-5 rounded-md mb-7  justify-between">
                <div className="text-violet-950 flex flex-col">
                  {/*<p className="text-sm">{currentScore.name}, 1st inning</p>*/}
                  <p className="text-5xl font-bold">
                    {currentScore?.scoreDetails.score}-
                    {currentScore?.scoreDetails.wickets}
                    <span className="text-lg font-medium ml-5">
                      ({currentScore?.scoreDetails.overs})
                      {currentScore?.innings == 2 && <>Target: {currentScore.target}</> }
                    </span>
                  </p>
                </div>
                <div className="text-violet-950 flex flex-col text-md justify-between">
                  <p className="font-bold">CRR</p>
                  <p>{currentScore?.scoreDetails?.crr}</p>
                </div>
              </div>

              <div className="grid grid-cols-7 w-full bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 px-7 py-5 rounded-md justify-between  mb-7 gap-y-5">
                <div className="col-span-2 text-violet-950 font-bold pb-2 border-b-2">
                  Batsman
                </div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">R</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">B</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">4s</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">6s</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">SR</div>

                <div className="col-span-2 text-violet-950">
                  {currentScore?.striker.name}*
                </div>
                <div className="text-violet-950">
                  {currentScore?.striker.batting.runs}
                </div>
                <div className="text-violet-950">
                  {currentScore?.striker.batting.balls}
                </div>
                <div className="text-violet-950">
                  {currentScore?.striker.batting.fours}
                </div>
                <div className="text-violet-950">
                  {currentScore?.striker.batting.sixes}
                </div>
                <div className="text-violet-950">{currentScore?.striker.sr}</div>

                <div className="col-span-2 text-violet-950">
                  {currentScore?.nonstriker.name}
                </div>
                <div className="text-violet-950">
                  {currentScore?.nonstriker.batting.runs}
                </div>
                <div className="text-violet-950">
                  {currentScore?.nonstriker.batting.balls}
                </div>
                <div className="text-violet-950">
                  {currentScore?.nonstriker.batting.fours}
                </div>
                <div className="text-violet-950">
                  {currentScore?.nonstriker.batting.sixes}
                </div>
                <div className="text-violet-950">{currentScore?.nonstriker.sr}</div>
              </div>

              {/* Rendering bowlers details */}
              <div className="grid grid-cols-7 w-full bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 p-7 rounded-md justify-between  gap-y-5">
                <div className="col-span-2 text-violet-950 font-bold pb-2 border-b-2">
                  Bowler
                </div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">O</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">M</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">R</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">W</div>
                <div className="pb-2 border-b-2 font-bold text-violet-950">ER</div>

                <div className="col-span-2 text-violet-950">
                  {currentScore?.bowler.name}
                </div>
                <div className="text-violet-950">
                  {currentScore?.bowler.bowler.balls}
                </div>
                <div className="text-violet-950">{0}</div>
                <div className="text-violet-950">
                  {currentScore?.bowler.bowler.runs}
                </div>
                <div className="text-violet-950">
                  {currentScore?.bowler.bowler.wickets}
                </div>
                <div className="text-violet-950">{currentScore?.bowler.ec}</div>
              </div>

            </div>
            
            <div className="w-full">
                
              <div className="flex flex-row bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 px-5 py-8  rounded-md justify-between mb-7">
                <div className="flex gap-x-5">
                  <input
                    type="checkbox"
                    name="wide"
                    checked={ballData.wide}
                    onChange={handleBallDataChange}
                  />
                  <label className="text-violet-950 font-bold">Wide</label>
                </div>
                <div className="flex gap-x-5">
                  <input
                    type="checkbox"
                    name="noBall"
                    checked={ballData.noBall}
                    onChange={handleBallDataChange}
                  />
                  <label className="text-violet-950 font-bold">No Ball</label>
                </div>
                <div className="flex gap-x-5">
                  <input
                    type="checkbox"
                    name="wicket"
                    checked={ballData.wicket}
                    onChange={handleBallDataChange}
                  />
                  <label className="text-violet-950 font-bold">Wicket</label>
                </div>
                <div className="flex gap-x-5">
                  <select
                    name="byes"
                    value={ballData.byes}
                    onChange={handleBallDataChange}
                    className="border px-1"
                    id="byes"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <label className="text-violet-950 font-bold">Byes</label>
                </div>
                <div className="flex gap-x-5">
                  <select
                    name="legByes"
                    value={ballData.legByes}
                    onChange={handleBallDataChange}
                    className="border px-1"
                    id="legByes"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <label className="text-violet-950 font-bold">Leg Byes</label>
                </div>
              </div>

              {modal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-violet-100 bg-opacity-50">
                  <div className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 px-20 py-10 rounded-md border border-violet-950">
                    <h2>How did the wicket fall?</h2>
                    <select
                      value={ballData.wicketType}
                      name="wicketType"
                      className="my-5 block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleWicketTypeChange}
                    >
                      <option value="">Select wicket type</option>
                      <option value="Bowled">Bowled</option>
                      <option value="Caught">Caught</option>
                      <option value="Runout">Runout</option>
                      <option value="Stumping">Stumping</option>
                      <option value="LBW">LBW</option>
                      <option value="Hit wicket">Hit wicket</option>
                    </select>

                    {ballData.wicketType === "Caught" && (
                      <select
                        name="fielders"
                        value={ballData.fielders[0]}
                        onChange={(e) => handleFielders(e.target.value, 0)}
                      >
                        <option value="">Select fielder</option>
                        {fieldingPlayers.map((player) => (
                          <option key={player.playerId} value={player.playerId}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    )}

                    {ballData.wicketType === "Runout" && (
                      <div>
                        <div>
                          <select
                            name="outId"
                            id="outId"
                            onChange={handleBallDataChange}
                            className="my-5 block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">select player</option>
                            <option value={currentScore.striker.playerId}>
                              {currentScore.striker.name}
                            </option>
                            <option value={currentScore.nonstriker.playerId}>
                              {currentScore.nonstriker.name}
                            </option>
                          </select>
                        </div>

                        <div>
                          <select
                            name="fielders"
                            className="my-5 block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={ballData.fielders[0]}
                            onChange={(e) => handleFielders(e.target.value, 0)}
                          >
                            <option value="">Select striker fielder</option>
                            {fieldingPlayers.map((player) => (
                              <option key={player.playerId} value={player.playerId}>
                                {player.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <select
                            name="fielders"
                            className="my-5 block w-60 h-12 py-2 px-3 border border-black bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={ballData.fielders[1]}
                            onChange={(e) => handleFielders(e.target.value, 1)}
                          >
                            <option value="">Select striker fielder</option>
                            {fieldingPlayers.map((player) => (
                              <option key={player.playerId} value={player.playerId}>
                                {player.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <button
                        className="border border-violet-950 px-5 py-2 bg-violet-500 text-white"
                        onClick={handleWicketSubmit}
                      >
                        Submit
                      </button>
                      <button
                        className="border border-violet-950 px-5 py-2 bg-violet-500 text-white"
                        onClick={handleWicketPopupClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex w-full flex-col bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 p-5 rounded-md justify-between gap-y-8 mb-8">
                <div className="flex flex-row w-full justify-between">
                  <button
                    onClick={() => handleRuns(0)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 0 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleRuns(1)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 1 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleRuns(2)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 2 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    2
                  </button>
                  <button
                    onClick={() => handleRuns(3)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 3 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    3
                  </button>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <button
                    onClick={() => handleRuns(4)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 4 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    4
                  </button>
                  <button
                    onClick={() => handleRuns(5)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 5 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    5
                  </button>
                  <button
                    onClick={() => handleRuns(6)}
                    className={`text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300 ${
                      ballData.runs === 6 ? "bg-violet-500" : "bg-white"
                    }`}
                  >
                    6
                  </button>
                  <button className="text-violet-950 border-violet-950 border-2 rounded-full px-4 py-2 hover:bg-violet-300">
                    ...
                  </button>
                </div>
              </div>

              
              <div className="flex w-full flex-col bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 p-5 rounded-md justify-between gap-y-2">
                  <button
                    onClick={() => onSwapBatsman()}
                    className="text-white px-4 py-2 bg-violet-700 font-medium rounded-md"
                  >
                    Swap
                  </button>
                  <button
                    onClick={() => submitBallScore()}
                    className="text-white px-4 py-2 bg-violet-700 font-medium rounded-md"
                  >
                    Submit
                  </button>
                  {/* <button className="text-white px-4 py-2 bg-green-800 font-medium rounded-md">
                      Extras
                    </button> */}
              </div>

            </div>

          </div>
      )}
    </div>
  );
};

export default BallByBallFeed;
