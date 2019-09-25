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

  const { getByTestId, getAllByTestId, queryByTestId } = render(wrapper);

  expect(getByTestId("loading")).toHaveTextContent("loading...");

  expect(queryByTestId("error")).toBeNull();

  const teamName = await waitForElement(() => getAllByTestId("team-name"));
  expect(teamName.length).toBe(30);
  expect(teamName[0].textContent.trim()).toBe("Oakland Athletics");
});

test("renders images", async () => {
  let wrapper;

  await act(async () => {
    wrapper = <Teams />;
  });

  const { getAllByTestId } = render(wrapper);

  const teamImage = await waitForElement(() => getAllByTestId("image-test"));
  expect(teamImage.length).toBe(30);
  expect(teamImage[0].tagName.toLowerCase()).toBe("img");
});
