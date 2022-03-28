import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Voted from "../components/Voted";

export default function Resultat() {
  const [voteList, setVoteList] = useState([]);

  useEffect(() => {
    axios
      .get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
      .then((response) => setVoteList(response.data));
  }, [setVoteList]);

  function tilbage() {
    navigate("/votingsite");
  }

  return (
    <>
      <button onClick={() => tilbage()}>Tilbage</button>
      <h1>Alle Stemmer</h1>
      <h2>Antal stemmer: {voteList.length}</h2>
      <div>
        {voteList.map((vote) => {
          return <Voted key={vote.voter} vote={vote} />;
        })}
      </div>
    </>
  );
}
