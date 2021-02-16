import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddTask from "./AddTask";

afterEach(cleanup);



// this test will check if headerH1 in AddTask has a title of "Add task" or not
it("renders the correct button", () => {
  const { getByTestId, getByText } = render(<Router><AddTask /></Router>);
  expect(getByTestId('headerH1')).toHaveTextContent("Add Task")
});


