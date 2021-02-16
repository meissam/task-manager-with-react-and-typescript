import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskItem from "./TaskItem";

afterEach(cleanup);



// this test will check te task item snapshot
it("renders", () => {
  const { asFragment } = render(<Router><TaskItem /></Router>);
  expect(asFragment()).toMatchSnapshot();
});


