import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthProvider } from "./contexts/UserAuthContext";

// Pages
import Index from "./pages/Index";
import Search from "./pages/Search";
import Services from "./pages/Services";
import SOS from "./pages/SOS";
import GarageDetails from "./pages/GarageDetailsFixed"; // Use the fixed version
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import MyVehicles from "./pages/MyVehicles";
import NotFound from "./pages/NotFound";
import BookService from "./pages/BookService";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

// New booking flow pages
import Booking from "./pages/Booking";
import BookingPayment from "./pages/BookingPayment";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import Settings from "./pages/Settings";
import RegisterOwner from "./pages/RegisterOwner";
import OwnerDashboard from "./pages/OwnerDashboard";
import EditGarageProfile from "./pages/EditGarageProfile";
import ManageBookings from "./pages/ManageBookings";
import ManageServices from "./pages/ManageServices";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Used Vehicles Pages
import UsedVehicles from "./pages/UsedVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import SellVehicle from "./pages/SellVehicle";
import MyListings from "./pages/MyListings";
import SavedVehicles from "./pages/SavedVehicles";

// Spare Parts Pages
import SpareParts from "./pages/SpareParts";
import SparePartDetails from "./pages/SparePartDetails";
import SellSparePart from "./pages/SellSparePart";
import SparePartCart from "./pages/SparePartCart";
import MySparePartOrders from "./pages/MySparePartOrders";

// Service Media Pages
import ServiceBookMedia from "./pages/ServiceBookMedia";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/garage/:id" element={<GarageDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-vehicles" element={<MyVehicles />} />
            <Route path="/book-service/:id" element={<BookService />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/booking-details/:id" element={<BookingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* New booking flow routes */}
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/payment" element={<BookingPayment />} />
            <Route
              path="/booking/confirmation"
              element={<BookingConfirmationPage />}
            />

            <Route path="/settings" element={<Settings />} />
            <Route path="/register-owner" element={<RegisterOwner />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/edit-garage" element={<EditGarageProfile />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
            <Route path="/manage-services" element={<ManageServices />} />

            {/* Used Vehicles Routes */}
            <Route path="/used-vehicles" element={<UsedVehicles />} />
            <Route path="/used-vehicles/:id" element={<VehicleDetails />} />
            <Route path="/used-vehicles/sell" element={<SellVehicle />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/saved-vehicles" element={<SavedVehicles />} />
            
            {/* Spare Parts Routes */}
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/spare-parts/:id" element={<SparePartDetails />} />
            <Route path="/sell-spare-part" element={<SellSparePart />} />
            <Route path="/spare-parts/cart" element={<SparePartCart />} />
            <Route path="/my-spare-part-orders" element={<MySparePartOrders />} />
            
            {/* Service Media Routes */}
            <Route path="/service-book/:id/media" element={<ServiceBookMedia />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserAuthProvider>
  </QueryClientProvider>
);

export default App;
