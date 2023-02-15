import { useEffect, useState } from 'react';
import MainNav from './components/nav/MainNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from './features/user/userSlice';
import ApplicationRoutes from './routes';

function App() {
  const dispatch = useDispatch()
  const [loadingMessage, setloadingMessage] = useState('Getteing server up and running. Please wait...')
  const loading = useSelector(state => state.user.getUser.loading)

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    dispatch(fetchLoggedInUser(user_id));
    setTimeout(() => {
      setloadingMessage("Building for you amazing hotels ...")
    }, 6000);

    setTimeout(() => {
      setloadingMessage("Applying cuteness to the rooms...")
    }, 12000);

    setTimeout(() => {
      setloadingMessage("Cleaning up the room ...")
    }, 15000);

    setTimeout(() => {
      setloadingMessage("Almost there ...")
    }, 20000);
  }, [])

  return (
    <div className="App">
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
            {loadingMessage}
          </div>
        :
        <ApplicationRoutes /> 
      }
    </div>
  );
}

export default App;
