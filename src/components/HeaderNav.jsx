import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HeaderNav = () => {

  const { user, setUser } = useContext(UserContext); //setUser 

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, [setUser]);

  const logout = () => {
    localStorage.removeItem("user");

    setUser({
      user: {
        firstName: null,
        lastName: null,
        picture: null,
        email: null,
        token: null,
      },
    });
    window.location.reload();
  };


  /**console.log(user);*/

  return (<Navbar expand="lg">
    <Container>
      <Link to="/" className="navbar-brand" ><img src="PlaidPal.png" alt="plaid pal logo" /></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link" >
            <i className="fas fa-house me-2"></i>
            Home
          </Link>

          {!user.email ?
            <Link to="/login" className="nav-link"  >
              <i className="fas fa-user me-2"></i>
              Log In
            </Link>
            :
            < Nav.Item className="nav-link" role="button" onClick={logout}>
              <i className="fas fa-user me-2"></i>
              Log Out
            </Nav.Item>

          }

          {!user.email ? <Link to="/signup" className="nav-link"  >
            <i className="fas fa-user me-2"></i>
            Register
          </Link> : ""}

          {user.email && user.googleId ?
            <>
              <Link to="/profile" className="nav-link nav-profile-link d-flex">
                <img src={user.picture} alt="profile avatar" className="me-1" />
                Profile
              </Link>

              <Link to="/summary" className="nav-link"  >
                <i className="fa-solid fa-chart-column me-2"></i>
                Summary
              </Link>
            </>
            :

            <>
            </>

          }

          <Link to="/react2chart" className="nav-link" >
            <i className="fa-solid fa-chart-area me-2"></i>
            R2C Examples
          </Link>
          <Link to="/googlechart" className="nav-link" >
            <i className="fa-solid fa-chart-gantt me-2"></i>
            RGC Examples
          </Link>

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}

export default HeaderNav;