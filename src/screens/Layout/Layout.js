import { Outlet, Link } from "react-router-dom";

const Layout = () =>{
    return(
    <>
      <nav>
        <ul>
          <li>
            <Link to="/banco-de-ideias-cetificadora-3/">SignPage</Link>
          </li>
          <li>
            <Link to="/banco-de-ideias-cetificadora-3/LoginPage">LoginPage</Link>
          </li>
          <li>
            <Link to="/banco-de-ideias-cetificadora-3/IdeasPage">IdeasPage</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
    )
}

export default Layout