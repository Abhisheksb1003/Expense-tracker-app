import Button from "react-bootstrap/Button";
import React, { Fragment, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Signuppage = () => {
  const enetredemail = useRef();
  const enetredPwd = useRef();
  const renenterdpwd = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = enetredemail.current.value;
    const pwd = enetredPwd.current.value;
    const renterdpwd = renenterdpwd.current.value;

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
  };
  return (
    <Fragment>
      <Container
        className="d-flex  align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        
        <Row>
          <Col xs={18} md={20} xl={14}>
           
            <Card style={{ backgroundColor: "gray" }}>
              <Card.Body>
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
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="form-control mb-3"
                    ref={renenterdpwd}
                  ></input>
                  <Button type="submit" variant="primary" block>
                    Sign Up
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Signuppage;