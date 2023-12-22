import React, { Fragment,useEffect, useRef, useState } from "react";
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/ExpenseSlice";

const DailyExpenses = () => {
  const [expense, setExpense] = useState([]);
  const enetredAmount = useRef();
  const enetredDesc = useRef();
  const EnetredCategory = useRef();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  //console.log("expensedata", expensedata);
  //console.log("darktheme", darkTheme);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(
        "https://expensetracker-9c3dc-default-rtdb.firebaseio.com/expenses.json"
      );
      const firebasedata = await response.json();
      if (firebasedata) {
        // Convert the object to an array
        const dataArray = Object.entries(firebasedata).map(([id, data]) => ({
          id,
          ...data,
        }));

        const greaterthan10000 = dataArray.some((item) => item.amount >= 10000);

        if (greaterthan10000) {
          dispatch(expenseAction.updatePremium());
        }

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
      "https://expensetracker-9c3dc-default-rtdb.firebaseio.com/expenses.json",
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
        return res.json();
      })
      .then((data) => {
        const activatePremium = data.some((item) => item.amount >= 10000);

        if (activatePremium) {
          dispatch(expenseAction.updatePremium());
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setExpense((prevdata) => [...prevdata, data]);
  };
  const deleteHandler = (id) => {
    fetch(
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/expenses/${id}.json`,
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
      `https://expensetracker-9c3dc-default-rtdb.firebaseio.com/expenses/${data.id}.json`,
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
  const downlaodCSVHandler = () => {
    // Get all expense data from Firebase
    fetch(
      "https://expensetracker-9c3dc-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((response) => response.json())
      .then((firebasedata) => {
        if (firebasedata) {
          const dataArray = Object.entries(firebasedata).map(([id, data]) => ({
            id,
            ...data,
          }));

          // Convert data array to CSV content
          const csvContent =
            "Amount,Description,Category\n" +
            dataArray
              .map(
                (item) => `${item.amount},${item.description},${item.category}`
              )
              .join("\n");

          // Create a Blob with the CSV content
          const blob = new Blob([csvContent], { type: "text/csv" });

          // Create a download link
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "expenses.csv";

          // Append the download link to the document and trigger the download
          document.body.appendChild(a);
          a.click();

          // Clean up
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase:", error);
      });
  };

  return (
    <Fragment>
      <div className={`${darkTheme ? "dark-theme" : "white-theme"}`}>
        <Container className="d-flex justify-content-center">
          <Row>
            <Col md={darkTheme ? 8 : 12}>
              <Card
                style={{
                  backgroundColor: "lightskyblue",
                  margin: "5vh",
                  height: "90%",
                  padding: "3vh",
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
            {darkTheme && (
              <Col md={4}>
                <Card
                  style={{
                    backgroundColor: "lightskyblue",
                    margin: "5vh",
                    marginTop: "20vh",
                    height: "35%",
                    padding: "5vh",
                    width: "100%",
                  }}
                >
                  <Card.Title className="text-center">
                    Download Expenses
                  </Card.Title>
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Button onClick={downlaodCSVHandler}>Download CSV</Button>
                  </Card.Body>
                </Card>
              </Col>
            )}
            <Col className="mt-5">
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
      </div>
      <style jsx>{`
        .dark-theme {
          background-color: #001f3f; /* Dark blue background color */
        }
      `}</style>
    </Fragment>
  );
};
export default DailyExpenses;