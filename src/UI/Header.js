import React, { useState } from "react";
import { Container, Navbar, Nav, Card,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Store/Authslice";

const Header = () => {
  const [verified, setVerified] = useState(false);
  const history = useHistory();
  const isloggedin = useSelector((state) => state.auth.isLoggedin);
  const idToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  console.log("showlogout", isloggedin);

  const verifiemailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }),
        Headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("verified successfully");
          setVerified(true);
        }
        if (!res.ok) {
          throw new Error("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand className="text-white">
          Welcome To Expense Tracker
        </Navbar.Brand>
        {isloggedin && (
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
              style={{ borderRadius: "20px" }}
              onClick={verifiemailHandler}
              className="m-2"
            >
              {verified ? "Email Verified" : "Verify Email"}
            </Button>
            <Button
              onClick={logoutHandler}
              style={{ borderRadius: "25px", backgroundColor: "red" }}
            >
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;