// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Home from './pages/Home/Home.jsx';
import StreetFood from './pages/StreetFood/StreetFood.jsx';
import Markets from './pages/Markets/Markets.jsx';
import AddFoodSpot from './pages/StreetFood/AddFoodSpot.jsx';
import AddReview from './pages/StreetFood/AddReview.jsx';
import MarketDetails from './pages/Markets/MarketDetails.jsx';
import Login from './pages/Authentication/Login/Login.jsx';
import Register from './pages/Authentication/Register/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import FoodStallDetails from './pages/StreetFood/FoodStallDetails.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import VendorDetails from './pages/Vendor/VendorDetails.jsx';
import WatchlistPage from './pages/Watchlist/WatchlistPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "street-food",
        element: (
          <PrivateRoute>
            <StreetFood />
          </PrivateRoute>
        )
      },
      {
        path: "markets",
        element: (
          <PrivateRoute>
            <Markets />
          </PrivateRoute>
        )
      },
      {
        path: "street-food/add",
        element: (
          <PrivateRoute>
            <AddFoodSpot />
          </PrivateRoute>
        )
      },
      {
        path: "street-food/:id/review",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        )
      },
      {
        path: "street-food/:id",
        element: (
          <PrivateRoute>
            <FoodStallDetails />
          </PrivateRoute>
        )
      },
      {
        path: "markets/:id",
        element: (
          <PrivateRoute>
            <MarketDetails />
          </PrivateRoute>
        )
      },
      {
        path: "community",
        element: (
          <PrivateRoute>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Community Page</h1>
                <p className="text-gray-600 mt-2">Coming Soon...</p>
              </div>
            </div>
          </PrivateRoute>
        )
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-2">Coming Soon...</p>
              </div>
            </div>
          </PrivateRoute>
        )
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        )
      },
      {
        path: "markets/:marketId/vendor/:vendorId",
        element: (
          <PrivateRoute>
            <VendorDetails />
          </PrivateRoute>
        )
      },
      {
        path: "watchlist",  // Changed from "dashboard"
        element: (
          <PrivateRoute>
            <WatchlistPage />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)