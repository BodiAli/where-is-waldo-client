import type { RouteObject } from "react-router";
import AppLayout from "../components/AppLayout/AppLayout";
import IllustrationPage from "../pages/Illustration/IllustrationPage";
import IllustrationsPage from "../pages/Illustrations/IllustrationsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Leaderboards from "../pages/Leaderboards/Leaderboards";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
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
            Component: Leaderboards,
          },
          {
            path: "leaderboards/:leaderboardId",
            Component: Leaderboard,
          },
        ],
      },
    ],
  },
];

export default routes;
