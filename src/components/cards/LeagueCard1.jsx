// 'import { useState, useEffect } from "react";
// import { getLeagues } from "../../services/sports";
// import { Link, useNavigate } from "react-router-dom";

// const LeagueCard1 = ({ league, sport }) => {
//   //   const [leagues, setLeagues] = useState([]);

//   //   const fetchLeagues = async () => {
//   //     try {
//   //       const res = await getLeagues(sportId);
//   //       setLeagues(res.data);
//   //     } catch (err) {
//   //       console.error("Error fetching leagues", err);
//   //     }
//   //   };

//   //   useEffect(() => {
//   //     fetchLeagues();
//   //   }, [sportId]);

//   const navigate = useNavigate();

//   return (
//     <div className="overflow-x-auto flex justify-center items-center h-auto bg-gradient-to-tr from-blue-200 to-purple-200">
//       <div className="flex justify-center w-fit" id="movies-popular-container">
//         {/* {leagues.map((league) => ( */}

//         <div
//           onClick={() => navigate(`/admin/${sport}/matches/${league._id}`)}
//           className="cursor-pointer group w-96 h-96 rounded-lg bg-cover bg-center bg-[url('https://th.bing.com/th/id/R.a3c294abeeb6f954f4c2f1ebc6215fec?rik=LI5FCLZm%2fiBNwg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2017%2f04%2fIndian-Premier-League.png&ehk=2swZ9ydwSSW55eJp62bsSfsOdUV1SsPpRFYwZpcSu08%3d&risl=&pid=ImgRaw&r=0')] hover:w-[600px]  hover:bg-[url('https://ss-i.thgim.com/public/cricket/ipl/fx2f3w/article66521345.ece/alternates/LANDSCAPE_1200/PTI03_26_2022_000146A.jpg')] hover:transition-all hover:duration-700 duration-700"
//         >
//           <div className="bg-gradient-to-t from-gray-900/50 via-transparent to-transparent w-full h-full p-4 flex-col justify-end relative hidden group-hover:flex">
//             <h1 className="text-2xl font-bold text-white mb-4">
//               {league.league}
//             </h1>
//           </div>
//         </div>
//         {/* ))} */}
//       </div>
//     </div>
//   );
// };

// export default LeagueCard1;



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const LeagueCard1 = ({ league, sport }) => {
  const navigate = useNavigate();
 
  return (
    <div className="overflow-x-auto flex justify-center items-center h-auto">
      <div className="flex justify-center w-fit" id="movies-popular-container">
        {league.league === "IPL" && (
          <div
            onClick={() => navigate(`/admin/${sport}/matches/${league._id}`)}
            className="cursor-pointer group w-96 h-96 rounded-lg bg-white bg-cover bg-center bg-[url('https://th.bing.com/th/id/R.a3c294abeeb6f954f4c2f1ebc6215fec?rik=LI5FCLZm%2fiBNwg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2017%2f04%2fIndian-Premier-League.png&ehk=2swZ9ydwSSW55eJp62bsSfsOdUV1SsPpRFYwZpcSu08%3d&risl=&pid=ImgRaw&r=0')] hover:w-[600px]  hover:bg-[url('https://ss-i.thgim.com/public/cricket/ipl/fx2f3w/article66521345.ece/alternates/LANDSCAPE_1200/PTI03_26_2022_000146A.jpg')] hover:transition-all hover:duration-700 duration-700"
          >
            <div className="bg-gradient-to-t from-gray-900/50 via-transparent to-transparent w-full h-full p-4 flex-col justify-end relative hidden group-hover:flex">
              <h1 className="text-2xl font-bold text-white mb-4">
                {league.league}
              </h1>
            </div>
          </div>
        )}
        {league.league === "WPL" && (
          <div
            onClick={() => alert("Module under maintenance!!")}
            className="cursor-pointer group w-96 h-96 rounded-lg bg-cover bg-center bg-[url('https://thegodofsports.com/wp-content/uploads/2023/03/qNAbUh6W_400x400.jpg')] hover:w-[600px] hover:bg-[url('https://t3.ftcdn.net/jpg/01/59/72/46/360_F_159724657_pTBbBhM4JOgcxO608MLSRPBy1ZYH5qPk.jpg')] hover:transition-all hover:duration-700 duration-700 hover:opacity-50"
          >
            <div className="bg-gradient-to-t from-gray-900/50 via-transparent to-transparent w-full h-full p-4 flex-col justify-end relative hidden group-hover:flex">
              <h1 className="text-2xl font-bold text-white mb-4">
                {league.league}
              </h1>
            </div>
          </div>
        )}
        {league.league==="Premier League" && (
          <div
          onClick={() => alert("Module under maintenance!!")}
          className="cursor-pointer group w-96 h-96 rounded-lg bg-cover bg-center bg-[url('https://www.insidesport.in/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-24-at-12.19.39-AM-1.jpeg?w=270&h=169&crop=1')] hover:w-[600px] hover:bg-[url('https://t3.ftcdn.net/jpg/01/59/72/46/360_F_159724657_pTBbBhM4JOgcxO608MLSRPBy1ZYH5qPk.jpg')] hover:transition-all hover:duration-700 duration-700 bg-opacity-50"
        >
          <div className="bg-gradient-to-t from-gray-900/50 via-transparent to-transparent w-full h-full p-4 flex-col justify-end relative hidden group-hover:flex">
            <h1 className="text-2xl font-bold text-white mb-4">
              {league.league}
            </h1>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
 
export default LeagueCard1;