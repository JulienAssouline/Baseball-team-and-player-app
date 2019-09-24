import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "../../__mocks__/mock-axios";
import Teams from "../Teams/Teams";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

test("loads and displays teams data", async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [{ id: 1, name: "Oakland Athletics" }]
  });
  let wrapper;

  await act(async () => {
    wrapper = <Teams />;
  });

  const { getByTestId, getAllByTestId } = render(wrapper);

  expect(getByTestId("loading")).toHaveTextContent("loading...");

  const resolvedDiv = await waitForElement(() => getAllByTestId("team-name"));
  expect(resolvedDiv.length).toBe(30);
  expect(resolvedDiv[0].textContent.trim()).toBe("Oakland Athletics");
});
