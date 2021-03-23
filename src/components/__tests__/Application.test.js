import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    // use async await to wait until after Archie Cohen renders
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // used to start an empty appointment
    fireEvent.click(getByAltText(appointment, "Add"))
    // event to input user information
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // event to select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //event to save appointment
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });

});
