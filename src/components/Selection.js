import axios from "axios";
import { useEffect, useState } from "react";

function Selection() {
  const [players, setPlayers] = useState([]);
  const [batsman, setBatsman] = useState([]);
  const [bowler, setBowler] = useState([]);
  const [wicket, setWicket] = useState([]);
  const [all, setAll] = useState([]);
  const [nzw, setNzw] = useState(0);
  const [eng, setEng] = useState(0);
  const [selectPlayers, setSelectPlayers] = useState(0);
  const [credits, setCredits] = useState(100);
  const [roster, setRoster] = useState([]);
  const [showRoster, setShowRoster] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const fetchData = () => {
    axios
      .get(
        "https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json"
      )
      .then((res) => setPlayers(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (selectPlayers === 11) {
      if (batsman.length < 3 || batsman.length > 7) {
        alert("You can select only 3-7 batsman");
        setSelectPlayers(0);
        setCredits(100);
        setBatsman([]);
        setBowler([]);
        setWicket([]);
        setEng(0);
        setNzw(0);
        setAll([]);
      }
      if (wicket.length < 1 || wicket.length > 5) {
        alert("You can select only 1-5 wicket keepers");
        setSelectPlayers(0);
        setCredits(100);
        setBatsman([]);
        setBowler([]);
        setWicket([]);
        setEng(0);
        setNzw(0);
        setAll([]);
      }
      if (bowler.length < 3 || bowler.length > 7) {
        alert("You can select only 3-7 bowlers");
        setSelectPlayers(0);
        setCredits(100);
        setBatsman([]);
        setBowler([]);
        setWicket([]);
        setEng(0);
        setNzw(0);
        setAll([]);
      }
      if (all.length > 4) {
        alert("You can select atmost 4 allrounders");
        setSelectPlayers(0);
        setCredits(100);
        setBatsman([]);
        setBowler([]);
        setWicket([]);
        setEng(0);
        setNzw(0);
        setAll([]);
      }
    }
  }, [selectPlayers]);
  useEffect(() => {
    if (selectPlayers === 11) {
      let finalRoster = [];
      finalRoster.push(...batsman);
      finalRoster.push(...bowler);
      finalRoster.push(...all);
      finalRoster.push(...wicket);
      setRoster(finalRoster);
    }
  }, [forceUpdate]);
  const addBatsman = (e) => {
    let elem = players.find((player) => player.id === Number(e.target.id)).name;
    let country = players.find(
      (player) => player.id === Number(e.target.id)
    ).country;
    if (country === "New Zealand") setNzw(nzw + 1);
    else if (country === "England") setEng(eng + 1);
    if (!batsman.find((player) => player === elem) && selectPlayers < 11) {
      setBatsman([...batsman, elem]);
      setSelectPlayers(selectPlayers + 1);
      setCredits(credits - 9);
    }
  };
  const addBowler = (e) => {
    let elem = players.find((player) => player.id === Number(e.target.id)).name;
    let country = players.find(
      (player) => player.id === Number(e.target.id)
    ).country;
    if (country === "New Zealand") setNzw(nzw + 1);
    else if (country === "England") setEng(eng + 1);
    if (!bowler.find((player) => player === elem) && selectPlayers < 11) {
      setBowler([...bowler, elem]);
      setSelectPlayers(selectPlayers + 1);
      setCredits(credits - 9);
    }
  };
  const addWicket = (e) => {
    let elem = players.find((player) => player.id === Number(e.target.id)).name;
    let country = players.find(
      (player) => player.id === Number(e.target.id)
    ).country;
    if (country === "New Zealand") setNzw(nzw + 1);
    else if (country === "England") setEng(eng + 1);
    if (!wicket.find((player) => player === elem) && selectPlayers < 11) {
      setWicket([...wicket, elem]);
      setSelectPlayers(selectPlayers + 1);
      setCredits(credits - 9);
    }
  };
  const addAll = (e) => {
    let elem = players.find((player) => player.id === Number(e.target.id)).name;
    let country = players.find(
      (player) => player.id === Number(e.target.id)
    ).country;
    if (country === "New Zealand") setNzw(nzw + 1);
    else if (country === "England") setEng(eng + 1);
    if (!all.find((player) => player === elem) && selectPlayers < 11) {
      setWicket([...all, elem]);
      setSelectPlayers(selectPlayers + 1);
      setCredits(credits - 9);
    }
  };

  const fakeRender = () => {
    setForceUpdate(true);
  };
  return (
    <>
      {showRoster ? (
        <div className="roster-page">
          <h1>Roster</h1>
          {roster.map((player) => (
            <div className="roster-key" key={player.id}>
              <div>{player}</div>
              <div>Credit 9</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="header">
            <h1 className="header-banner">Pick Players</h1>
            <div className="dashboard">
              <div className="dashboard-items">
                <h3 className="dash">{selectPlayers}/11</h3>
                <p className="dash">Players</p>
              </div>
              <div className="dashboard-items">
                <h3 className="dash">{nzw}</h3>
                <p className="dash">NZW</p>
              </div>
              <div className="dashboard-items">
                <h3 className="dash">{eng}</h3>
                <p className="dash">ENGW</p>
              </div>
              <div className="dashboard-items">
                <h3 className="dash">{credits}</h3>
                <p className="dash">Cr Left</p>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="body-row1">
              <div className="batsman">
                <h2>Pick 3-7 Batsman</h2>
                {players
                  .filter((player) => player.role === "Batsman")
                  .map((player) => (
                    <div
                      onClick={addBatsman}
                      className="bat-key"
                      key={player.id}
                      id={player.id}
                    >
                      <div>{player.name}</div>
                      <div>Credit 9</div>
                    </div>
                  ))}
              </div>
              <div className="wicket">
                <h2>Pick 1-5 Wicket keepers</h2>
                {players
                  .filter((player) => player.role === "Wicket-Keeper")
                  .map((player) => (
                    <div
                      className="wicket-key"
                      key={player.id}
                      id={player.id}
                      onClick={addWicket}
                    >
                      <div>{player.name}</div>
                      <div>Credit 9</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="body-row2">
              <div className="allrounders">
                <h2>Pick 0-4 All rounders</h2>
                {players
                  .filter((player) => player.role === "All-Rounder")
                  .map((player) => (
                    <div
                      className="all-key"
                      key={player.id}
                      id={player.id}
                      onClick={addAll}
                    >
                      <div>{player.name}</div>
                      <div>Credit 9</div>
                    </div>
                  ))}
              </div>
              <div className="bowlers">
                <h2>Pick 3-7 Bowlers</h2>
                {players
                  .filter((player) => player.role === "Bowler")
                  .map((player) => (
                    <div
                      className="bowl-key"
                      key={player.id}
                      id={player.id}
                      onClick={addBowler}
                    >
                      <div>{player.name}</div>
                      <div>Credit 9</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="submit-button" onClick={fakeRender}>
              <h4>Submit</h4>
            </div>
            <div className="show-roster" onClick={() => setShowRoster(true)}>
              Show Roster
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Selection;
