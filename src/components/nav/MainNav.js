import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/bnb_logo_black.svg"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

export default function MainNav() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const logoutUser = () => {
    return dispatch(logout())
  }
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/">
            <img
              src={logo}
              height="65"
              alt="Nairobnb Logo"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rooms">Rooms</NavLink>
            </li>

            {
              user.account_type === "Host" ?
              <li className="nav-item">
                <NavLink className="nav-link" to="/new-room">Add Room</NavLink>
              </li>
            :
              false
            }
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-4 mt-3">
            <button onClick={logoutUser} type="button" className="btn nav-link">Logout</button>
            </li>
          </ul>

          <div className="">
            <Link
              className="d-flex align-items-center hidden-arrow"
              to="#to"
              id=""
            >
              <img
                src={user.avatar ? user.avatar : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                className="rounded-circle"
                height="35"
                alt="user_photo"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
    );
  }