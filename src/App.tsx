import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SetAvatar from './components/avatar';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Signup';
import OuterLayout from './styles/layout';

function App() {
  return (
    <div className="App">
      <Routes>
     <Route path="/register" element={<OuterLayout><Register /></OuterLayout> } />
        <Route path="/login" element={<OuterLayout><Login /></OuterLayout> } />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat /> } />
      </Routes>
    </div>
  );
}

export default App;
