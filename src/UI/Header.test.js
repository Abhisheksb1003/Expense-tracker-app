import Header from "./Header";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux'; 
import store from "../../Store/MainStore";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
  test("renders Welcome text", () => {
    render(
      <Provider store={store}>
        {" "}
        <Header />
      </Provider>
    );
    
    const welcomeText = screen.getByText("Welcome To Expense Tracker", {
      exact: false,
    });
    expect(welcomeText).toBeInTheDocument();

    const h1text = screen.getByText("test", { exact: false });
    expect(h1text).toBeInTheDocument();
  });
  test("h1 text", () => {
    render(
      <Provider store={store}>
        {" "}
        <Header />
      </Provider>
    );
    const h1text = screen.getByText("test", { exact: false });
    expect(h1text).toBeInTheDocument();
  });

  test("premium button", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const button = screen.queryByRole('button', { name: /Activate Premium/i });
    if (button) {
    userEvent.click(button);
    const outputelement = screen.getByText('Premium Activated', {exact:false});
    expect(outputelement).toBeInTheDocument();
    }
  });
});