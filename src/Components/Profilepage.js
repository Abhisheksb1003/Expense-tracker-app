import React, { Fragment, useRef } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const Profilepage = () => {
  const enetredname = useRef();
  const enetredphotourl = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const name = enetredname.current.value;
    const photo = enetredphotourl.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA20QgzIbGGBJE2GjAckzUje0TsQ023o2M",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("idToken"),
          displayName: name,
          photoUrl: photo,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error not successfull");
        }
        if (res.ok) {
          alert("done updated");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "50vh" }}
      >
        <Row>
          <Col>
            <Card
              style={{
                backgroundColor: "gray",
                padding: "20px",
              }}
            >
              <Card.Body>
                <Card.Text>
                  <form onSubmit={submitHandler}>
                    <label>Full Name</label>
                    <input
                      className=" mb-2"
                      type="text"
                      ref={enetredname}
                    ></input>
                    <label>Profile Photo Url</label>
                    <input
                      className=" mb-2"
                      type="url"
                      ref={enetredphotourl}
                    ></input>
                    <Button type="submit"> Update</Button>
                  </form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Profilepage;