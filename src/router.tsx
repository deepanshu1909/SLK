import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/layout";
import Index from "./routes/index";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";
import DashboardIndex from "./routes/dashboard.index";
import DashboardAgents from "./routes/dashboard.agents";
import DashboardAnalytics from "./routes/dashboard.analytics";
import DashboardBilling from "./routes/dashboard.billing";
import DashboardBookings from "./routes/dashboard.bookings";
import DashboardCampaigns from "./routes/dashboard.campaigns";
import DashboardChat from "./routes/dashboard.chat";
import DashboardCRM from "./routes/dashboard.crm";
import DashboardReviews from "./routes/dashboard.reviews";
import DashboardSettings from "./routes/dashboard.settings";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root isError />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardIndex />,
          },
          {
            path: "agents",
            element: <DashboardAgents />,
          },
          {
            path: "analytics",
            element: <DashboardAnalytics />,
          },
          {
            path: "billing",
            element: <DashboardBilling />,
          },
          {
            path: "bookings",
            element: <DashboardBookings />,
          },
          {
            path: "campaigns",
            element: <DashboardCampaigns />,
          },
          {
            path: "chat",
            element: <DashboardChat />,
          },
          {
            path: "crm",
            element: <DashboardCRM />,
          },
          {
            path: "reviews",
            element: <DashboardReviews />,
          },
          {
            path: "settings",
            element: <DashboardSettings />,
          },
        ],
      },
    ],
  },
]);

export { queryClient };
export { QueryClientProvider };
