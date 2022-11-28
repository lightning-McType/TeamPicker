import axios from "axios";
import { useEffect, useState } from "react";

function Test() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json"
      )
      .then((res) => setPlayers(res.data));
  }, []);
  return (
    <div>
      <h1>New Zealand</h1>
      {players
        .filter((player) => player.country === "New Zealand")
        .map((player) => (
          <div key={player.id}>{player.name}</div>
        ))}
      <h1>England</h1>
      {players
        .filter((player) => player.country === "England")
        .map((player) => (
          <div key={player.id}>{player.name}</div>
        ))}
    </div>
  );
}

export default Test;
