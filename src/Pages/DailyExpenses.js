import React, { Fragment,useEffect, useRef, useState } from "react";
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import ExpenseSlice, { expenseAction } from "../../Store/ExpenseSlice";

const DailyExpenses = () => {
  const [expense, setExpense] = useState([]);
  const enetredAmount = useRef();
  const enetredDesc = useRef();
  const EnetredCategory = useRef();
  const dispatch = useDispatch();
  const expensedata = useSelector((state) => state.expense.store);
  console.log("expensedata", expensedata);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(
        "https://expensetracker-7313d-default-rtdb.firebaseio.com/expenses.json"
      );
      const firebasedata = await response.json();
      if (firebasedata) {
        // Convert the object to an array
        const dataArray = Object.entries(firebasedata).map(([id, data]) => ({
          id,
          ...data,
        }));

        setExpense(dataArray);
        dispatch(expenseAction.saveExpense(dataArray));
      }
    };
    getdata();
  }, []);
  const formsubmitHnadler = (e) => {
    e.preventDefault();
    let entamount = enetredAmount.current.value;
    let entdescription = enetredDesc.current.value;
    let entcategory = EnetredCategory.current.value;
    const data = {
      amount: entamount,
      description: entdescription,
      category: entcategory,
    };
    fetch(
      "https://expensetracker-7313d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify({
          amount: entamount,
          description: entdescription,
          category: entcategory,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        if (res.ok) {
          dispatch(expenseAction.saveExpense(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setExpense((prevdata) => [...prevdata, data]);
  };
  const deleteHandler = (id) => {
    fetch(
      `https://expensetracker-7313d-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("item deleted successfully");
          dispatch(expenseAction.deleteExpense(id));
          setExpense((prevExpense) =>
            prevExpense.filter((item) => item.id !== id)
          );
        } else {
          throw new Error("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editHandler = (data) => {
    enetredAmount.current.value = data.amount;
    enetredDesc.current.value = data.description;
    EnetredCategory.current.value = data.category;
    setExpense((prevExpense) =>
      prevExpense.filter((item) => item.id !== data.id)
    );

    dispatch(expenseAction.deleteExpense(data.id));

    fetch(
      `https://expensetracker-7313d-default-rtdb.firebaseio.com/expenses/${data.id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Table striped bordered hover responsive variant="dark">
                <thead>
                  <tr className="text-center">
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {expense.map((data, index) => (
                  <tbody>
                    <tr key={index} className="text-center">
                      <td>{data.amount}</td>
                      <td>{data.description}</td>
                      <td>{data.category}</td>
                      <td>
                        <Button
                          onClick={() => editHandler(data)}
                          variant="info"
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => deleteHandler(data.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default DailyExpenses;