import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import LeaderboardPage from "../../pages/Leaderboard/LeaderboardPage";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import type { LeaderboardType } from "../../types/types";

describe("LeaderboardPage component", () => {
  it("should render Error boundary with returned error message if leaderboard is not found", async () => {
    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: vi.fn(() => Promise.resolve({ error: "Leaderboard not found" })),
      })
    );

    const router = createMemoryRouter(
      [
        {
          ErrorBoundary: ErrorHandler,
          path: "leaderboards/:leaderboardId",
          Component: LeaderboardPage,
        },
      ],
      {
        initialEntries: ["/leaderboards/leaderboardId"],
      }
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByText("Leaderboard not found")).toBeInTheDocument();
  });

  it("should render heading declaring what leaderboard is currently rendered", async () => {
    const mockLeaderboard: { leaderboard: LeaderboardType } = {
      leaderboard: {
        id: "leaderboardId",
        illustrationId: "illustrationId",
        Illustration: {
          difficulty: "medium",
          id: "illustrationId",
          imageSrc: "imageSrc",
        },
        Users: [
          {
            id: "bodiId",
            leaderboardId: "leaderboardId",
            name: "Bodi",
            score: 4000,
          },
          {
            id: "joeId",
            leaderboardId: "leaderboardId",
            name: "Joe",
            score: 5000,
          },
          {
            id: "janeId",
            leaderboardId: "leaderboardId",
            name: "Jane",
            score: 6000,
          },
        ],
      },
    };

    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockLeaderboard)),
      })
    );

    const router = createMemoryRouter(
      [
        {
          Component: LeaderboardPage,
          path: "leaderboards/:leaderboardId",
        },
      ],
      {
        initialEntries: ["/leaderboards/leaderboardId"],
      }
    );

    render(<RouterProvider router={router} />);

    const heading = await screen.findByRole("heading", { level: 2, name: "Medium difficulty leaderboard" });

    expect(heading).toBeInTheDocument();
  });

  it("should render users table with expected column headers", async () => {
    const mockLeaderboard: { leaderboard: LeaderboardType } = {
      leaderboard: {
        id: "leaderboardId",
        illustrationId: "illustrationId",
        Illustration: {
          difficulty: "medium",
          id: "illustrationId",
          imageSrc: "imageSrc",
        },
        Users: [
          {
            id: "bodiId",
            leaderboardId: "leaderboardId",
            name: "Bodi",
            score: 4000,
          },
          {
            id: "joeId",
            leaderboardId: "leaderboardId",
            name: "Joe",
            score: 5000,
          },
          {
            id: "janeId",
            leaderboardId: "leaderboardId",
            name: "Jane",
            score: 6000,
          },
        ],
      },
    };

    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockLeaderboard)),
      })
    );

    const router = createMemoryRouter(
      [
        {
          Component: LeaderboardPage,
          path: "leaderboards/:leaderboardId",
        },
      ],
      {
        initialEntries: ["/leaderboards/leaderboardId"],
      }
    );

    render(<RouterProvider router={router} />);

    const table = await screen.findByRole("table");

    const columnHeaders = within(table).getAllByRole("columnheader");

    expect(columnHeaders.length).toBe(3);
    expect(columnHeaders[0]).toHaveTextContent("Rank");
    expect(columnHeaders[1]).toHaveTextContent("Name");
    expect(columnHeaders[2]).toHaveTextContent("Score");
  });

  it("should render users sent by the server with their rank and score converted to seconds", async () => {
    const mockLeaderboard: { leaderboard: LeaderboardType } = {
      leaderboard: {
        id: "leaderboardId",
        illustrationId: "illustrationId",
        Illustration: {
          difficulty: "medium",
          id: "illustrationId",
          imageSrc: "imageSrc",
        },
        Users: [
          {
            id: "bodiId",
            leaderboardId: "leaderboardId",
            name: "Bodi",
            score: 4000,
          },
          {
            id: "joeId",
            leaderboardId: "leaderboardId",
            name: "Joe",
            score: 5000,
          },
          {
            id: "janeId",
            leaderboardId: "leaderboardId",
            name: "Jane",
            score: 6000,
          },
        ],
      },
    };

    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockLeaderboard)),
      })
    );

    const router = createMemoryRouter(
      [
        {
          Component: LeaderboardPage,
          path: "leaderboards/:leaderboardId",
        },
      ],
      {
        initialEntries: ["/leaderboards/leaderboardId"],
      }
    );

    render(<RouterProvider router={router} />);

    const table = await screen.findByRole("table");
    const tableRows = within(table).getAllByRole("row");

    //  First row that is not column headers row
    const firstRowCells = within(tableRows[1]).getAllByRole("cell");
    const secondRowCells = within(tableRows[2]).getAllByRole("cell");
    const thirdRowCells = within(tableRows[3]).getAllByRole("cell");

    expect(tableRows.length).toBe(4);
    expect(firstRowCells[0]).toHaveTextContent("1");
    expect(firstRowCells[1]).toHaveTextContent("Bodi");
    expect(firstRowCells[2]).toHaveTextContent((4000 / 1000).toFixed(2));
    expect(secondRowCells[0]).toHaveTextContent("2");
    expect(secondRowCells[1]).toHaveTextContent("Joe");
    expect(secondRowCells[2]).toHaveTextContent((5000 / 1000).toFixed(2));
    expect(thirdRowCells[0]).toHaveTextContent("3");
    expect(thirdRowCells[1]).toHaveTextContent("Jane");
    expect(thirdRowCells[2]).toHaveTextContent((6000 / 1000).toFixed(2));
  });

  it("should render a leaderboard is empty paragraph if leaderboard Users are empty", async () => {
    const mockLeaderboard: { leaderboard: LeaderboardType } = {
      leaderboard: {
        id: "leaderboardId",
        illustrationId: "illustrationId",
        Illustration: {
          difficulty: "medium",
          id: "illustrationId",
          imageSrc: "imageSrc",
        },
        Users: [],
      },
    };

    window.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockLeaderboard)),
      })
    );

    const router = createMemoryRouter(
      [
        {
          Component: LeaderboardPage,
          path: "leaderboards/:leaderboardId",
        },
      ],
      {
        initialEntries: ["/leaderboards/leaderboardId"],
      }
    );

    render(<RouterProvider router={router} />);

    const paragraphElement = await screen.findByRole("paragraph");

    expect(paragraphElement).toHaveTextContent("Leaderboard is empty!");
  });
});
