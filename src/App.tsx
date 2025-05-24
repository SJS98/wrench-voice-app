import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { UserAuthProvider } from "./contexts/UserAuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterOwner from "./pages/RegisterOwner";
import HomePage from "./pages/Index";
import GarageDetailsPage from "./pages/GarageDetails";
import BookService from "./pages/BookService";
import Booking from "./pages/Booking";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import BookingPayment from "./pages/BookingPayment";
import MyVehicles from "./pages/MyVehicles";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import Services from "./pages/Services";
import UsedVehicles from "./pages/UsedVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import SOS from "./pages/SOS";
import Settings from "./pages/Settings";
import SavedVehicles from "./pages/SavedVehicles";
import SellVehicle from "./pages/SellVehicle";
import NotFound from "./pages/NotFound";
import MyListings from "./pages/MyListings";
import OwnerDashboard from "./pages/OwnerDashboard";
import EditGarageProfile from "./pages/EditGarageProfile";
import ManageBookings from "./pages/ManageBookings";
import ManageServices from "./pages/ManageServices";
import ServiceBookMedia from "./pages/ServiceBookMedia";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SpareParts from "./pages/SpareParts";
import SparePartDetails from "./pages/SparePartDetails";
import SparePartCart from "./pages/SparePartCart";
import SellSparePart from "./pages/SellSparePart";
import MySparePartOrders from "./pages/MySparePartOrders";
import Notifications from "./pages/Notifications";

// Import new dispute system pages
import ReportIssue from "./pages/ReportIssue";
import DisputeAdmin from "./pages/DisputeAdmin";
import GarageDisputes from "./pages/GarageDisputes";
import TrustPolicy from "./pages/TrustPolicy";

const App = () => {
  const preventZoomFunction = () => {
    // Prevent zoom via keyboard (Ctrl/Cmd + +/-/0)
    const preventZoom = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "=" || e.key === "+" || e.key === "-" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    // Prevent zoom via mouse wheel (Ctrl/Cmd + wheel)
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom and pinch-zoom on mobile
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Prevent pinch-zoom (multi-touch)
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventZoom, { passive: false });
    window.addEventListener("wheel", preventWheelZoom, { passive: false });
    document.addEventListener("touchend", preventDoubleTapZoom, {
      passive: false,
    });
    document.addEventListener("touchstart", preventPinchZoom, {
      passive: false,
    });
    document.addEventListener("gesturestart", (e) => e.preventDefault(), {
      passive: false,
    }); // For Safari

    // Set viewport meta tag to disable user scaling (extra precaution)
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(meta);

    return {
      meta,
      preventZoom,
      preventWheelZoom,
      preventDoubleTapZoom,
      preventPinchZoom,
    };
  };
  // Restrict browser zoom (desktop and mobile)
  React.useEffect(() => {
    const {
      meta,
      preventZoom,
      preventWheelZoom,
      preventDoubleTapZoom,
      preventPinchZoom,
    } = preventZoomFunction();
    return () => {
      window.removeEventListener("keydown", preventZoom);
      window.removeEventListener("wheel", preventWheelZoom);
      document.removeEventListener("touchend", preventDoubleTapZoom);
      document.removeEventListener("touchstart", preventPinchZoom);
      document.removeEventListener("gesturestart", (e) => e.preventDefault());
      if (meta.parentNode) {
        meta.parentNode.removeChild(meta);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <UserAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-owner" element={<RegisterOwner />} />

            {/* Garage */}
            <Route path="/garage/:id" element={<GarageDetailsPage />} />
            <Route path="/search" element={<Search />} />

            {/* Services */}
            <Route path="/services" element={<Services />} />
            <Route path="/book-service/:garageId" element={<BookService />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-payment" element={<BookingPayment />} />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmationPage />}
            />

            {/* User Bookings */}
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service-book/:bookingId/media"
              element={
                <ProtectedRoute>
                  <ServiceBookMedia />
                </ProtectedRoute>
              }
            />

            {/* Vehicles */}
            <Route
              path="/my-vehicles"
              element={
                <ProtectedRoute>
                  <MyVehicles />
                </ProtectedRoute>
              }
            />
            <Route path="/used-vehicles" element={<UsedVehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
            <Route
              path="/saved-vehicles"
              element={
                <ProtectedRoute>
                  <SavedVehicles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sell-vehicle"
              element={
                <ProtectedRoute>
                  <SellVehicle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-listings"
              element={
                <ProtectedRoute>
                  <MyListings />
                </ProtectedRoute>
              }
            />

            {/* Spare Parts */}
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/spare-part/:id" element={<SparePartDetails />} />
            <Route path="/spare-part-cart" element={<SparePartCart />} />
            <Route
              path="/sell-spare-part"
              element={
                <ProtectedRoute>
                  <SellSparePart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-spare-part-orders"
              element={
                <ProtectedRoute>
                  <MySparePartOrders />
                </ProtectedRoute>
              }
            />

            {/* User Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Owner Dashboard */}
            <Route
              path="/owner-dashboard"
              element={
                <ProtectedRoute>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-garage-profile"
              element={
                <ProtectedRoute>
                  <EditGarageProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-bookings"
              element={
                <ProtectedRoute>
                  <ManageBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-services"
              element={
                <ProtectedRoute>
                  <ManageServices />
                </ProtectedRoute>
              }
            />

            {/* Dispute System - NEW */}
            <Route
              path="/report-issue"
              element={
                <ProtectedRoute>
                  <ReportIssue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report-issue/:bookingId"
              element={
                <ProtectedRoute>
                  <ReportIssue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dispute-admin"
              element={
                <ProtectedRoute>
                  <DisputeAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/garage-disputes"
              element={
                <ProtectedRoute>
                  <GarageDisputes />
                </ProtectedRoute>
              }
            />
            <Route path="/trust-policy" element={<TrustPolicy />} />

            {/* Miscellaneous */}
            <Route path="/sos" element={<SOS />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </UserAuthProvider>
    </div>
  );
};

export default App;
