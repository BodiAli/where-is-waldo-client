import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { Mock } from "vitest";
import Leaderboards from "../../pages/Leaderboards/LeaderboardsPage";
import type { LeaderboardsType } from "../../types/types";

describe("LeaderboardsPage component", () => {
  it("should render leaderboards cards", async () => {
    const mockLeaderboards: LeaderboardsType = [
      {
        id: "easyLeaderboard",
        illustrationId: "easyIllustration",
        Illustration: {
          difficulty: "easy",
          id: "easyIllustration",
          imageSrc: "imageSrc",
        },
      },
      {
        id: "mediumLeaderboard",
        illustrationId: "mediumIllustration",
        Illustration: {
          difficulty: "medium",
          id: "mediumIllustration",
          imageSrc: "imageSrc",
        },
      },
      {
        id: "hardLeaderboard",
        illustrationId: "hardIllustration",
        Illustration: {
          difficulty: "hard",
          id: "hardIllustration",
          imageSrc: "imageSrc",
        },
      },
    ];

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve({ mockLeaderboards })),
      })
    ) as Mock;

    const router = createMemoryRouter([
      {
        path: "leaderboards",
        Component: Leaderboards,
      },
    ]);

    render(<RouterProvider router={router} />);

    const leaderboardCards = await screen.findAllByRole("link");

    expect(leaderboardCards.length).toBe(3);
  });
});
