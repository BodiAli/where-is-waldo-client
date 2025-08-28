import type { RouteObject } from "react-router";
import AppLayout from "../AppLayout";
import IllustrationPage from "../pages/Illustration/IllustrationPage";
import IllustrationsPage from "../pages/Illustrations/IllustrationsPage";

const routes: RouteObject[] = [
  {
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: IllustrationsPage,
      },
      {
        path: "illustrations/:illustrationId",
        Component: IllustrationPage,
      },
    ],
  },
];

export default routes;
