
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
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/booking-details/:id" element={<BookingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserAuthProvider>
  </QueryClientProvider>
);

export default App;
