import {useState, useEffect} from "react";
import{Navbar, Nav, Container} from "react-bootstrap";
import logo from '../assets/img/Retro.png';
import {Cam} from './cam.js'
import Auth from '../utils/auth'
import snappic from '../assets/img/icons8-plus-64.svg';


export const NavBar = () =>{
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(()=>{
        const onScroll = () =>{
            if (window.scrollY > 50){
                setScrolled(true);
            }else{
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    },[]);

    const onUpdateActiveLink = (value) =>{
        setActiveLink(value);
    }

    return(
        <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
        <Container>
          <Navbar.Brand href="#home">
            {/* this is where a potential logo will go for future reference when we find something cool */}
            <a href="/home"> 
            <img src={logo} alt="Logo"/> 
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"> 
          <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              {Auth.loggedIn() ? (<>
                <Nav.Link href="/home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('home')}>Home</Nav.Link>
                <Nav.Link href="#"className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('save new location')}>Save new location</Nav.Link>
                <Nav.Link href="/"className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={()=> Auth.logout()}>Log Out</Nav.Link>
                <span className="navbar-text">
                    <div className="social-icon">
                            <a href="/cam" ><img src={snappic} alt=""/></a>
                    </div>
                </span>
              </>
              ): (
                <>
                <Nav.Link href="/signup"className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('signup')}>Register</Nav.Link>
              <Nav.Link href="/login"className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('login')}>Login</Nav.Link>
              <Nav.Link href="/"className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={()=> Auth.logout()}>Exit</Nav.Link>
              </>
              )}
              
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}