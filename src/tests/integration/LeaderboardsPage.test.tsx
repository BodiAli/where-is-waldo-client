import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { Mock } from "vitest";
import Leaderboards from "../../pages/Leaderboards/LeaderboardsPage";
import type { LeaderboardsType } from "../../types/types";

describe("LeaderboardsPage component", () => {
  it("should render leaderboards cards", async () => {
    const mockLeaderboards: { leaderboards: LeaderboardsType } = {
      leaderboards: [
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
      ],
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockLeaderboards)),
      })
    ) as Mock;

    const router = createMemoryRouter(
      [
        {
          path: "leaderboards",
          Component: Leaderboards,
        },
      ],
      { initialEntries: ["/leaderboards"] }
    );

    render(<RouterProvider router={router} />);

    const leaderboardCards: HTMLAnchorElement[] = await screen.findAllByRole("link");

    expect(leaderboardCards.length).toBe(3);
    expect(leaderboardCards[0].href).toContain(mockLeaderboards.leaderboards[0].id);
    expect(leaderboardCards[1].href).toContain(mockLeaderboards.leaderboards[1].id);
    expect(leaderboardCards[2].href).toContain(mockLeaderboards.leaderboards[2].id);
  });

  it("should navigate to '/leaderboards/leaderboardsId' when leaderboard card is clicked", async () => {
    const user = userEvent.setup();

    const mockLeaderboards: { leaderboards: LeaderboardsType } = {
      leaderboards: [
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
      ],
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: vi.fn(() => Promise.resolve(mockLeaderboards)),
      })
    ) as Mock;

    const router = createMemoryRouter(
      [
        {
          path: "leaderboards",
          Component: Leaderboards,
        },
        {
          path: "leaderboards/:leaderboardId",
          element: <h2>Leaderboard</h2>,
        },
      ],
      { initialEntries: ["/leaderboards"] }
    );

    render(<RouterProvider router={router} />);

    const leaderboardCards: HTMLAnchorElement[] = await screen.findAllByRole("link");

    await user.click(leaderboardCards[0]);

    expect(router.state.location.pathname).toBe("/leaderboards/easyLeaderboard");
  });
});
