import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "../../__mocks__/mock-axios";
import Teams from "../Teams/Teams";
import { TeamsContext } from "../../context";
import App from "../../App";

afterEach(cleanup);

test("loads and displays teams data", async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [{ id: 1, name: "Oakland Athletics" }]
  });

  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <App>
      <TeamsContext.Provider>
        <Teams />
      </TeamsContext.Provider>
    </App>
  );

  expect(getByTestId("loading").textContent.trim()).toBe("loading...");

  expect(queryByTestId("error")).toBeNull();

  const teamName = await waitForElement(() => getAllByTestId("team-name"));
  expect(teamName.length).toBe(30);
  expect(teamName[0].textContent.trim()).toBe("Oakland Athletics");
});

test("renders images", async () => {
  const { getAllByTestId } = render(
    <App>
      <TeamsContext.Provider>
        <Teams />
      </TeamsContext.Provider>
    </App>
  );

  const teamImage = await waitForElement(() => getAllByTestId("image-test"));
  expect(teamImage.length).toBe(30);
  expect(teamImage[0].tagName.toLowerCase()).toBe("img");
});
