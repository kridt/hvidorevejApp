import { navigate } from "@reach/router";
import axios from "axios";
import dateFormat from "dateformat";
import React, { useContext, useEffect, useState } from "react";
import AlreadyVotedView from "../components/AlreadyVotedView";
import NotVotedYet from "../components/NotVotedYet";

import { UserContext } from "../UserContext";

export default function VotingSite() {
  const { user } = useContext(UserContext);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [alfa, setAlfa] = useState(false);
  const [allVisits, setAllVisits] = useState([]);
  const [visits, setVisits] = useState(false);

  useEffect(() => {
    axios
      .get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/visits")
      .then((response) => console.log(response.data));
  }, [setAllVisits]);

  console.log(allVisits);

  useEffect(() => {
    if (user.id === 286828) {
      setVisits(true);
      setAlfa(true);
    } else {
      if (user.id === 125811) {
        setAlfa(true);
      } else {
        setAlfa(false);
      }
    }
  }, [user]);

  const time = new Date();
  if (user === null) {
    navigate("/");
    // eslint-disable-next-line
    location.reload();
  } else {
    document.body.style.zoom = "50%";
    window.scrollTo(60, 0);
  }

  document.body.style.zoom = "50%";
  window.scrollTo(60, 0);

  useEffect(() => {
    const postThingy = `${JSON.stringify(user)} at ${dateFormat(
      time,
      "dddd, d mmmm, h:MM:ss TT"
    )} on a ${navigator.userAgent}`;

    const logData = {};
    logData.visit = postThingy;

    console.log(logData);

    axios
      .post(
        `https://foetex-hvidorevej-votes.herokuapp.com/api/v1/visits`,
        logData
      )
      .then((response) => console.log(response));
  });

  useEffect(() => {
    axios
      .get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
      .then((response) => response.data)
      .then((data) => {
        const voteList = data.map((users) => users.voter);
        var test = [];

        voteList.forEach((user) => {
          test.push(parseInt(user));
        });

        test.forEach((vote) => {
          if (vote === user.id) {
            console.log("bad");
            setAlreadyVoted(true);
            return;
          }
        });

        /*i f(test === user.id) {  
                console.log("Good");
            } else{
                console.log("Bad");
            } */

        /*  if (user.id === parseInt(voteList)) {
                console.log("User has voted");
                setAlreadyVoted(true)
            } else{
                console.log("user not voted yet");
                setAlreadyVoted(false)
            } */

        /* const votedList = data.map(e => e.voter === user.id) 
            
            console.log(votedList);
            console.log(user.id);
            
            if (user.id = votedList) {
                setAlreadyVoted(true);
            } else {
                setAlreadyVoted(false); 
            }  
            
            */
      });
  }, [setAlreadyVoted, user]);
  /* 
const { user } = useContext(UserContext);
const [alfa, setAlfa] = useState(false);
useEffect(() => {
    if (user.id === 286828 || 125811) {
      setAlfa(true);
    } else {
      setAlfa(false);
    }
  }, [user]);
{alfa ? (
        <>
          <br />
          <br />

          <button onClick={(e) => deleteEverything(e)}>
            Fjern alle stemmer
          </button>
          <br />
          <br />
          <br />
          <button onClick={(e) => testFunction(e)}>Se alle stemmer</button>
          <br />
          <br />
          {/* <button onClick={(e) => mailMessage(e)}>Send mail med månedens medarbejder</button> 
          
          ) : null}    
 */

  function deleteEverything(e) {
    e.preventDefault();
    if (window.confirm("Er du sikker på at du vil slette alle stemmer?")) {
      axios
        .get("https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes")
        .then((response) => response.data)
        .then((data) => {
          data?.map((votes) => {
            axios.delete(
              `https://foetex-hvidorevej-votes.herokuapp.com/api/v1/votes/${votes._id}`
            );

            return null;
          });
        });
      console.log("alle stemmer er slettet");
    } else {
      console.log("alle stemmer er ikke slettet");
      return;
    }
  }

  function testFunction(e) {
    e.preventDefault();
    navigate("/resultat");
  }

  return (
    <>
      {alreadyVoted ? <AlreadyVotedView /> : <NotVotedYet />}
      {alfa ? (
        <>
          <br />
          <br />

          <button onClick={(e) => deleteEverything(e)}>
            Fjern alle stemmer
          </button>
          <br />
          <br />
          <br />

          <button onClick={(e) => testFunction(e)}>Se vinderen</button>
        </>
      ) : null}
    </>
  );
}
