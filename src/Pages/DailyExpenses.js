import React, { Fragment, useRef, useState } from "react";
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DailyExpenses = () => {
  const [expense, setExpense] = useState([]);
  const enetredAmount = useRef();
  const enetredDesc = useRef();
  const EnetredCategory = useRef();

  const formsubmitHnadler = (e) => {
    e.preventDefault();

    let amount = enetredAmount.current.value;
    let description = enetredDesc.current.value;
    let category = EnetredCategory.current.value;
    const data = {
      amount: amount,
      description: description,
      category: category,
    };
    console.log(data);

    setExpense((prevdata) => [...prevdata, data]);
  };

  return (
    <Fragment>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col md={10}>
            <Card
              style={{
                backgroundColor: "lightskyblue",
                margin: "5vh",
                width: "100vh",
                padding: "5vh",
              }}
            >
              <form style={{ fontSize: "20px" }} onSubmit={formsubmitHnadler}>
                <label>Money</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  ref={enetredAmount}
                ></input>
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control mb-3"
                  ref={enetredDesc}
                ></textarea>
                <label>Category</label>
                <select className="form-control mb-3" ref={EnetredCategory}>
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Salary</option>
                </select>
                <div>
                  <Button
                    style={{ fontSize: "20px" }}
                    type="submit"
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Card>
          </Col>
          <Col>
            <Card style={{ backgroundColor: "grey" }}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {expense.map((data, index) => (
                    <tr key={index}>
                      <td>{data.amount}</td>
                      <td>{data.description}</td>
                      <td>{data.category}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default DailyExpenses;