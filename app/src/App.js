import './App.css';

import { Routes, Route } from "react-router-dom";
import { useEffect,useState } from "react";
import Sidebar from './components/Sidebar';
import MyNotes from './pages/MyNotes';
import RecycleBin from './pages/RecycleBin';
import AddNotes from './pages/AddNotes';
import Setting from './pages/Setting';
import {useMoralis} from 'react-moralis';

function App() {
  const {isAuthenticated,Moralis} = useMoralis();

  const connectWallet = async () => {
    await Moralis.authenticate();
    window.location.reload();
  }

  const logout = () => {
    Moralis.User.logOut().then(() => {
      window.location.reload();
    })
  }

  useEffect(() => {
    document.title = "DCloudnotes";
  },[])

  return (
    <div className='appContent'>
      {isAuthenticated ? (
        <div className="App">
          <div className="menu">
            <Sidebar />

            <button type="button" className="btn-logout" onClick={logout}>Logout</button>
          </div>
          <div className="detail">
            <Routes>
              <Route path="/" element={<MyNotes />} />
              <Route path="/addNotes" element={<AddNotes />} />
              <Route path="/recycleBin" element={<RecycleBin />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="loginPage">
          <button type='button' className="btn-connectWallet" onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}

export default App;
