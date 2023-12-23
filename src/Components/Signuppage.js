import Button from "react-bootstrap/Button";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment, useRef, useState } from "react";
import {useHistory} from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/Authslice";

const Signuppage = () => {
  const enetredemail = useRef();
  const enetredPwd = useRef();
  const renenterdpwd = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    setIsLogin((prevvalue) => !prevvalue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const email = enetredemail.current.value;
    const pwd = enetredPwd.current.value;
    let renterdpwd; // Declare renterdpwd outside the block
    if (!isLogin) {
      renterdpwd = renenterdpwd.current.value; // Assign value inside the block
    }
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: pwd,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (res.ok) {
            //alert("logged in successfully");
            history.replace("/home");
          } else {
            throw new Error("error");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          let token = data.idToken;
          let email = data.email; 
          dispatch(authActions.login({ token, email }));
          // Remove "@" and "." from the email address
          // const updatedEmail = email.replace(/[@.]/g, "");
          // localStorage.setItem("email", updatedEmail);
        })

        .catch((err) => {
          alert(err);
        });
    } else {
      if (pwd === renterdpwd) {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: pwd,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              alert("account created successfully");
            } else {
              throw new Error("could not create account");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        alert("password are not same");
      }
    }
  };
  return (
    <Fragment>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col xs={18} md={20} xl={14}>
            <Card
              style={{
                backgroundColor: "gray",
                width: "40rem",
                height: "21rem",
              }}
            >
              <Card.Title
                className="text-center mt-1"
                style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
              >
                {isLogin ? "login" : "Sign Up"}
              </Card.Title>
              <Card.Body style={{ fontSize: "25px" }}>
                <form onSubmit={submitHandler}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-2"
                    ref={enetredemail}
                  ></input>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-2"
                    ref={enetredPwd}
                  ></input>
                  {!isLogin && (
                    <input
                      type="password"
                      placeholder="Re-enter Password"
                      className="form-control mb-3"
                      ref={renenterdpwd}
                      {...(!isLogin ? { required: true } : { required: false })}
                    ></input>
                  )}
                  {isLogin && (
                    <div>
                      <NavLink
                        to="/forgotpwd"
                        style={{ fontSize: "18px", color: "yellow" }}
                        className="text-center"
                      >
                        Forgot Password?
                      </NavLink>
                    </div>
                  )}
                  <Button type="submit" variant="primary" block="true">
                    {isLogin ? "Login" : "create Account"}
                  </Button>
                </form>
              </Card.Body>
              <Button onClick={onClickHandler} variant="dark">
                {isLogin
                  ? "Dont Have an account? Click Here"
                  : "Have an account? click here to login"}{" "}
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Signuppage;