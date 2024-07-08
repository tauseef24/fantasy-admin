import React from 'react';
import { Link } from 'react-router-dom';

const LeagueCard = ({ imageUrl, leagueName }) => {
  const renderLink = () => {
    if (leagueName === 'IPL') {
      return (
        <Link to="/admin/:sportId/chooseteam" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10">
          Select
        </Link>
      );
    } 
    else {
      return (
        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10">
          Select
        </a>
      );
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="p-8 rounded-t-lg w-full h-[200px] object-cover" src={imageUrl} alt="product image" />
      </a>
      <div className="px-5 pb-5 flex flex-col items-center">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{leagueName}</h5>
        </a>
        <div className="flex items-center justify-between">
          {renderLink()}
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;
