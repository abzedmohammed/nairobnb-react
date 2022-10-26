import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import AddHouse from './components/houses/AddHouse';
import HousesList from './components/houses/HousesList';
import SingleHouse from './components/houses/SingleHouse';
import MainNav from './components/nav/MainNav';
import Order from './components/order/Order';

function App() {
  const [user, setUser] = useState({})
  const [rooms, setRooms] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    fetch(`http://localhost:9292/users/${user_id}`)
    .then(res => res.json())
     .then(data => {
      setUser(data)
      setIsLoggedIn(true)
     })

     fetch("http://localhost:9292/bnbs")
     .then(res => res.json())
     .then(data => setRooms(data))
  }, [])

  function getUserData(profile){
    setIsLoggedIn(true)
    setUser(profile)
  }

  function logout(){
    sessionStorage.clear();
    setIsLoggedIn(false)
    setUser({})
  }

  function handleNewRoom(room){
    fetch("http://localhost:9292/bnbs", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div className="App">
      <ToastContainer />
          {
            isLoggedIn ? <MainNav logout={logout} user={user} isLoggedIn={isLoggedIn} /> : false
          }
          <Routes>
            <Route path="*" element={
              !isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/home" /> 
            } />
            <Route exact path="/home" element={<Home user={user} />} />
            <Route exact path="/rooms" element={<HousesList rooms={rooms} />} />
            <Route exact path="/rooms/:id" element={<SingleHouse />} />
            <Route exact path="/rooms/:id/order" element={<Order />} />
            <Route exact path="/new-room" element={<AddHouse handleNewRoom={handleNewRoom} />} />
          <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} getUserData={getUserData} />} />
          <Route exact path="/register" element={<Register isLoggedIn={isLoggedIn} getUserData={getUserData} />} />
        </Routes>
    </div>
  );
}

export default App;
