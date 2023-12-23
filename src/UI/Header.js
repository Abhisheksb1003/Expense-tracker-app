import React, { useState } from "react";
import { Container, Navbar, Nav, Card,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/Authslice";
import { Themeactions } from "../Store/ThemeSlice";
import { useEffect } from "react";

const Header = () => {
  const [verified, setVerified] = useState(false);
  const history = useHistory();
  const isloggedin = useSelector((state) => state.auth.isLoggedin);
  const idToken = useSelector((state) => state.auth.token);
  const premium = useSelector((state) => state.theme.darkTheme);
  const btnpremium = useSelector((state) => state.expense.premium);
  const dispatch = useDispatch();
  console.log("btnpremium", btnpremium);
  //console.log("showlogin", isloggedin);
  //console.log('premium', premium)
  useEffect(() => {
    let id = localStorage.getItem("idToken");
    if (id) {
      dispatch(authActions.rerenderlogin());
    }
  }, [dispatch]);
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
  const setPremiumHandler = () => {
    dispatch(Themeactions.setDarkTheme());
  };
  return (
    <Navbar bg="dark">
  
      <Container className="d-flex ">
     
        <Navbar.Brand className="text-white">
          Welcome To Expense Tracker
          <h1>test</h1>
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
            {btnpremium && (
              <Button
                style={{ borderRadius: "20px" }}
                onClick={setPremiumHandler}
                className="m-2"
              >
                {premium ? "Premium Activated" : "Activate Premium"}
              </Button>
            )}
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