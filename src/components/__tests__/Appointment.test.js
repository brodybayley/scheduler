//rendering <Application/> below so need react.createElement
import React from "React";
//import helper functions from react testing library. Render function allows to render components
import { render } from "@testing-library/react";
//import component to be tested
import Appointment from "components/Appointment";


//test that renders react component
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});