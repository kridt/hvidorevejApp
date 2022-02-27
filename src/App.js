import { Router } from '@reach/router';
import { useState } from 'react';
import { UserContext } from './UserContext';
import './App.css';
import Startside from './pages/Startside';
import VotingSite from './pages/VotingSite';
import Thanks from './pages/Thanks';
import VoteDeleted from './pages/VoteDeleted';

function App() {
  const [user, setUser] = useState(null)


  return (
    
    <UserContext.Provider value={{ user, setUser }}>

      <Router className="App">
        <Startside path="/" />
        <VotingSite path="/votingsite" />
        <Thanks path="/thanks" />
        <VoteDeleted path="/voteDeleted" />       
      </Router>
    </UserContext.Provider>
  );
}

export default App;
