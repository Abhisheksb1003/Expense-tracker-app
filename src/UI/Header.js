import React from "react";
import { Container, Navbar, Nav, Card,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
    const logoutHandler=()=>{
      localStorage.removeItem('idToken')
    }
    return (
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand className="text-white">
            Welcome To Expense Tracker
          </Navbar.Brand>
          <Nav>
            <Card style={{ backgroundColor: "#ffc0cb", borderRadius: "20px" }}>
              <Card.Body>
                <Card.Text>
                  Your profile is incomplete.
                  <Link
                    to="/profile"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Complete now
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
            <Button
              onClick={logoutHandler}
              style={{ borderRadius: "25px", backgroundColor: "red" }}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    );
  };
  export default Header;