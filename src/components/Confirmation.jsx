import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Confirmation({ setShowModal }) {
  // const { sport, league, leagueId } = useParams();
  const params = useParams();
  console.log(params);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/admin/${params.sport}/matches/${params.leagueId}`);
    setShowModal(false);
  };
  const next = () => {
    navigate(`/admin/ballbyball/${params.matchId}`);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg text-center mb-10 text-violet-950">
          Do you wish to proceed with the match?
        </h1>
        <div className="flex justify-between mb-8">
          <button
            onClick={goBack}
            className="text-white bg-violet-500 border border-violet-950 px-5 py-2 mt-5 mx-5"
          >
            No
          </button>
          <button
            onClick={next}
            className="text-white bg-violet-500 border border-violet-950 px-5 py-2 mt-5 mx-5"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}
