
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Search from './Search'
import './Header.css'

const Header = (props) => {
    const { user, logout, query, onChange, title } = props
    return (
        <div >
            <Navbar expand="lg">
                <Container fluid >
                <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                            style={{ Height: '100px' }}
                        >
                            <div className= "leftNav">
                            <Link to="/"><span className="link-padding">Home</span></Link>
                            <Link to="/AddBook"><span className="link-padding">Add Book</span></Link>
                            <Search className="col-3 mr-6" query={query} onChange={onChange}></Search>
                            </div>
                        </Nav>
                        
                       <div className="mx-auto" style={{width: "29%"}}>
                        <Link to="/"><h1 data-testid="pageTitle">My Bookshelf</h1></Link>
                        </div>
                        <div className="d-flex mr">
                        <div className= "rightNav">
                        {user && "Hi " + user.user.email}
                            {user && <Button className= "btn btn-light" style={{ backgroundColor: 'transparent', border: '0px solid transparent' }} onClick={() => { logout() }}>  Logout</Button>}
                            </div>
                            {!user && <Link to="/login">Login</Link>} {!user && <Link to="/register"> /Register</Link>}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header


