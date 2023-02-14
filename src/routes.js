import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from './components/404';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import AddHouse from './components/houses/AddHouse';
import HousesList from './components/houses/HousesList';
import SingleHouse from './components/houses/SingleHouse';
import Order from './components/order/Order';


export default function ApplicationRoutes(){
    const userInfo = useSelector(state => state.user)

    const authenticatedRoutes = (component) => {
        return userInfo.isLoggedIn ? component : <Navigate to="/login" />;
    }

    const unAuthenticatedRoutes = (component) => {
        if (userInfo.isLoggedIn){
            return  <Navigate to="/rooms" />
        }
        return component 
    }

    return (
        <Routes>
            <Route exact path="/" element={ <Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/rooms" element={<HousesList />} />
            <Route exact path="/login" element={ unAuthenticatedRoutes(<Login />) } />
            <Route exact path="/register" element={unAuthenticatedRoutes(<Register />)} />
            <Route path="*" element={<ErrorPage /> } />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/rooms" element={ authenticatedRoutes(<HousesList /> )} />
            <Route exact path="/rooms/:id" element={ authenticatedRoutes(<SingleHouse /> )} />
            <Route exact path="/rooms/:id/order" element={ authenticatedRoutes(<Order />) } />
            <Route exact path="/new-room" element={ authenticatedRoutes(<AddHouse user={userInfo.user} /> )} />
        </Routes>
    )
}

