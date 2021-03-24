import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

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
    fireEvent.click(getByAltText(appointment, "Add"));
    // event to input user information
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // event to select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //event to save appointment
    fireEvent.click(getByText(appointment, "Save"));
    //Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //Wait until the element with the text "Lydia Miller-Jones" is displayed
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    //check that the DayListItem with the text "Monday" also has the txt "no spots remaining"
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //1. Render the application
    const { container } = render(<Application />);
    //2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. Click the "delete" button on the booked appointment

    //4. Check that the confirmation message is shown.

    // 5. Click the "Confirm" button on the confirmation.

    // 6. Check that the element with the text "Deleting" is displayed.

    // 7. Wait until the element with the "Add" button is displayed.

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  })

});
