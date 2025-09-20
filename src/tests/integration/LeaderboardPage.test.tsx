import { render, screen } from "@testing-library/react";
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
            id: "joeId",
            leaderboardId: "leaderboardId",
            name: "Joe",
            score: 5000,
          },
          {
            id: "bodiId",
            leaderboardId: "leaderboardId",
            name: "Bodi",
            score: 4000,
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

  it("should render users ordered by their scores", () => {});
});
