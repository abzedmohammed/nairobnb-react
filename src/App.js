import { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import AddHouse from './components/houses/AddHouse';
import HousesList from './components/houses/HousesList';
import SingleHouse from './components/houses/SingleHouse';
import MainNav from './components/nav/MainNav';
import Order from './components/order/Order';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from './features/user/userSlice';

function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const loading = useSelector(state => state.user.getUser.loading)

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    dispatch(fetchLoggedInUser(user_id));
  }, [])

  let loginRoutes = (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path='*' replace element={<Navigate to="/login" />}/>
    </Routes>
  )

  let routes = (
    <>
      <MainNav />
      {
        loading ? 
          <div className='loading'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto", animationPlayState: "running", animationDelay: "0s"}} width="55px" height="55px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#3b88fc" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" style={{animationPlayState: "running", animationDelay: "0s"}}>
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" style={{animationPlayState: "running", animationDelay: "0s"}}></animateTransform>
                </circle>
                </svg> 
            </div>
            Loading...
          </div>
        :
        <Routes>
          <Route path="*" element={<Navigate to="/home" /> } />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/rooms" element={<HousesList />} />
          <Route exact path="/rooms/:id" element={<SingleHouse />} />
          <Route exact path="/rooms/:id/order" element={<Order />} />
          <Route exact path="/new-room" element={<AddHouse user={user} />} />
      </Routes>
      }
    </>
  )
  return (
    <div className="App">
      {
        isLoggedIn && !user.error ? 
        routes
        :
        loginRoutes
      }
    </div>
  );
}

export default App;
