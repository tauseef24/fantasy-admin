import React from 'react'
import { Link } from 'react-router-dom';


export default function LeagueCard({league,sport}) {

    return (

        <Link to={`/admin/${sport}/${league.league}/matches/${league._id}`} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
                <img
                    className="p-8 rounded-t-lg w-full h-[200px] object-cover"
                    src="https://upload.wikimedia.org/wikipedia/ta/thumb/d/d4/DLF_IPL_Logo.svg/1280px-DLF_IPL_Logo.svg.png"
                    alt="product image"
                />
            </div>
            <div className="px-5 pb-5 flex flex-col items-center">

                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {league.league}
                </h5>
            </div>
        </Link>

    )
}
