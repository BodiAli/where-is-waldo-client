import type { RouteObject } from "react-router";
import AppLayout from "../components/AppLayout/AppLayout";
import IllustrationPage from "../pages/Illustration/IllustrationPage";
import IllustrationsPage from "../pages/Illustrations/IllustrationsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LeaderboardsPage from "../pages/Leaderboards/LeaderboardsPage";
import LeaderboardPage from "../pages/Leaderboard/LeaderboardPage";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";

const routes: RouteObject[] = [
  {
    ErrorBoundary: NotFoundPage,
    Component: AppLayout,

    children: [
      {
        ErrorBoundary: ErrorHandler,
        children: [
          {
            index: true,
            Component: IllustrationsPage,
          },
          {
            path: "illustrations/:illustrationId",
            Component: IllustrationPage,
          },
          {
            path: "leaderboards",
            Component: LeaderboardsPage,
          },
          {
            path: "leaderboards/:leaderboardId",
            Component: LeaderboardPage,
          },
        ],
      },
    ],
  },
];

export default routes;
