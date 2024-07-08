import { instance } from "./axiosBase";

export const getSports = async () => {
  return instance
    .get("/user/fantasy-sports")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const createMatch = async (match) => {
  return instance
    .post("/admin/match-create", match)
    .then((res) => res)
    .catch((err) => err);
};

export const getLeagues = async (sportId) => {
  const response = await instance.get(`/user/fantasy-league/${sportId}`);
  return response;
};

export const getTeams = async (leagueId) => {
  return instance
    .get(`/user/fantasy-teams/league/${leagueId}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getMatches = async (leagueId) => {
  const response = await instance.get(
    `/user/fantasy-matches/league/${leagueId}`
  );
  return response;
};

export const getPlayers = async (matchId) => {
  const response = await instance.get(`/user/fantasy-match/${matchId}`);
  return response;
};


export const getCurrentScore = async (matchId) => {
  return instance
    .get(`user/matchlive-score/${matchId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getCurrentFieldingPlayers = async (matchId) => {
  return instance
    .get(`admin/match-fieldingPlayers/${matchId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const setMatch = async (matchId, data) => {
  const response = await instance.post(
    `/admin/fantasy-match-details/${matchId}`,
    data
  );
  return response;
};

export const updateScore = async (matchId, data) => {
  return instance
    .put(`admin/fantasy-match-details/${matchId}`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getMatchPlayers = async (matchId) => {
  return instance
    .get(`user/fantasy-playing-team/${matchId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    }); 
};

export const getNextPlayer = async (matchId,needPlayer)=>{
  return instance 
      .put(`admin/nextBatnBowl/${matchId}`,needPlayer)
      .then((res)=>res.data)
      .catch((err) => {throw err})
}

export const setNextPlayer = async (matchId,data)=>{
  return instance
    .put(`admin/nextPlayer/${matchId}`,data)
    .then((res)=>res.data)
    .catch((err) => {throw err})
}


export const initMatch = async (matchId, data) => {
  return instance
    .put(`admin/initiate/fantasy-live/${matchId}`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};


export const swapBatsman = async (matchId)=>{
    return instance.put(`admin/fantasy-match/swapbatsman/${matchId}`)
        .then((res)=>res.data)
        .catch((err)=>{throw err})
}

export const getMatchData = async (matchId)=>{
  return instance.get(`admin/matchData/${matchId}`)
        .then((res) => res.data)
        .catch((err) => {throw err})
}