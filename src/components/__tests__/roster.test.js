import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "../../__mocks__/mock-axios";
import Roster from "../Rosters/Roster";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

test("loads and displays players names", async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [{ id: 1, name: "A.J. Puk" }]
  });

  const location = { state: { team: "Blue Jays" } };
  const match = { params: { id: 141 } };

  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <Roster location={location} match={match} />
  );

  expect(getByTestId("loading").textContent.trim()).toBe("loading...");

  expect(queryByTestId("error")).toBeNull();

  const playerName = await waitForElement(() =>
    getAllByTestId("player-name").map(d => d.textContent.trim())
  );

  console.log(playerName);
  expect(playerName.length <= 40).toBe(true);
});
