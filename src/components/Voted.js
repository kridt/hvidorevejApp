import React from "react";
import "./Voted.css";

export default function Voted({ vote }) {
  const [voteMessage, setVoteMessage] = React.useState("");
  React.useEffect(() => {
    if (vote.message === "") {
      setVoteMessage("Ingen begrundelse");
    } else {
      setVoteMessage(vote.message);
    }
  }, [setVoteMessage, vote.message]);

  return (
    <div className="vote" key={vote.voter}>
      {vote.vote}
      <br />
      <br />
      <p>Begrundelse:</p>
      {voteMessage}
    </div>
  );
}
