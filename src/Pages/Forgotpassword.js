import React, { Fragment, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Forgotpassword = () => {
  const [emailSent, setEmailSent] = useState(false);
   const history= useHistory()
  const enetredemail = useRef();

  const ressetHandler = (e) => {
    e.preventDefault();
    const email = enetredemail.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          setEmailSent(true);
        }
        if (!res.ok) {
          throw new Error("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickHandler = () => {
    history.replace('/login')
  };
  return (
    <Fragment>
      <Container
        style={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col>
            <Card
              style={{
                backgroundColor: "grey",
                width: "33rem",
                padding: "10px",
              }}
            >
              {emailSent ? (
                <h1 style={{ color: "white" }}>Reset link sent to your mail</h1>
              ) : (
                <div>
                  <Card.Title style={{ textAlign: "center", fontSize: "30px" }}>
                    Forgot Password
                  </Card.Title>
                  <form onSubmit={ressetHandler} style={{ fontSize: "20px" }}>
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      ref={enetredemail}
                      required
                    ></input>
                    <Button
                      className="mt-3"
                      type="submit"
                      style={{ fontSize: "20px" }}
                    >
                      Reset
                    </Button>
                  </form>
                </div>
              )}
              <Button onClick={onClickHandler} variant="dark" className="mt-2">
                click here to login
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Forgotpassword;