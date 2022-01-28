import { Router } from '@reach/router';
import { useState } from 'react';
import { UserContext } from './UserContext';
import './App.css';
import Startside from './pages/Startside';
import VotingSite from './pages/VotingSite';

function App() {
  const [user, setUser] = useState(null)


  return (
    
    <UserContext.Provider value={{ user, setUser }}>

      <Router className="App">
        <Startside path="/" />
        <VotingSite path="/votingsite" />

      </Router>
    </UserContext.Provider>
  );
}

export default App;
