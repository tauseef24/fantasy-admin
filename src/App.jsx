import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Admin from "./pages/Admin";
import SportLanding from "./pages/SportLanding";
import PlayersPage from "./pages/PlayersPage";
import LeagueLanding from "./pages/LeagueLanding";
import BallByBallFeed from "./components/BallByBallFeed";
import Matches from "./pages/Matches";
import ScoreCard from "./components/ScoreCard";
import MatchSummary from "./components/MatchSummary";
import Layout from "./layouts";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Layout />}>

            <Route element={<ProtectedRoute />}>
              <Route path="" element={<Admin />} />
              <Route path="sports" element={<SportLanding />} />
              <Route path=":sport/:sportId" element={<LeagueLanding />} />
              <Route path=":sport/matches/:leagueId" element={<Matches />} />
              <Route path=":sport/:leagueId/:matchId" element={<PlayersPage />} />
              <Route path="ballbyball/:matchId" element={<BallByBallFeed />} />
              <Route path="scorecard/:matchId" element={<ScoreCard />} />
              <Route path="matchsummary/:matchId" element={<MatchSummary />} />
            </Route>


            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
