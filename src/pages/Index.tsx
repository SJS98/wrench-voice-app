
import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TutorialLauncher } from "@/components/tutorial/TutorialLauncher";
import {
  Car,
  Wrench,
  Shield,
  ChevronRight,
  MapPin,
  Settings,
  Calendar,
  ShoppingCart,
  Camera,
  Zap,
  Heart,
  Star,
  Clock,
} from "lucide-react";

const HomePage = () => {
  return (
    <AppLayout title="Mr.GarageWala" showBackButton={false}>
      <div className="space-y-8">
        {/* Hero Section - Visual First */}
        <div className="action-card-blue">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center">
              <span className="text-4xl">🔧</span>
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
              <p className="text-xl text-blue-100">Professional Auto Care</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/services">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-6 rounded-2xl w-full text-lg">
                🚗 Book Service
              </Button>
            </Link>
            <TutorialLauncher variant="button" />
          </div>
        </div>

        {/* Tutorial Card */}
        <TutorialLauncher variant="card" />

        {/* Main Actions - Large Visual Buttons */}
        <div className="bg-white p-6 rounded-3xl border-2 border-gray-200">
          <h2 className="title-medium text-center mb-6">🎯 Quick Actions</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <Link to="/services" className="action-card-blue">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🔧</span>
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Book Service</h3>
                  <p className="text-xl text-blue-100">Professional repair & maintenance</p>
                </div>
              </div>
            </Link>

            <Link to="/spare-parts" className="action-card-green">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🛒</span>
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Buy Parts</h3>
                  <p className="text-xl text-green-100">Genuine spare parts</p>
                </div>
              </div>
            </Link>

            <Link to="/sos" className="action-card-red">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🚨</span>
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Emergency SOS</h3>
                  <p className="text-xl text-red-100">24/7 help available</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Other Services - Simple Visual Cards */}
        <div className="space-y-6">
          {/* Used Vehicles */}
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚗</span>
                <h2 className="title-medium">Buy Used Vehicles</h2>
              </div>
              <Link to="/used-vehicles" className="btn-secondary py-2 px-4 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl">
              <div className="flex items-center gap-6">
                <div className="icon-container-blue">
                  <Car className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Vehicle</h3>
                  <p className="text-readable text-gray-700 mb-4">Browse certified used cars, bikes & more with verified dealers</p>
                  <Link to="/used-vehicles">
                    <Button className="btn-primary">
                      🚗 Browse Vehicles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Spare Parts */}
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛒</span>
                <h2 className="title-medium">Spare Parts Store</h2>
              </div>
              <Link to="/spare-parts" className="btn-secondary py-2 px-4 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl">
              <div className="flex items-center gap-6">
                <div className="icon-container-green">
                  <Settings className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality Spare Parts</h3>
                  <p className="text-readable text-gray-700 mb-4">Genuine parts for all vehicle types with warranty</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/spare-parts">
                      <Button className="btn-success w-full">
                        🛒 Shop Parts
                      </Button>
                    </Link>
                    <Link to="/sell-spare-part">
                      <Button className="btn-secondary w-full">
                        💰 Sell Parts
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Tracking */}
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📱</span>
              <h2 className="title-medium">Track Your Service</h2>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-2xl">
              <div className="flex items-center gap-6">
                <div className="icon-container-purple">
                  <Camera className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">See Your Service Live</h3>
                  <p className="text-readable text-gray-700 mb-4">Watch photos & videos of your vehicle being repaired</p>
                  <Link to="/my-bookings">
                    <Button className="btn-primary">
                      📱 View Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Garages */}
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📍</span>
                <h2 className="title-medium">Near You</h2>
              </div>
              <Link to="/search" className="btn-secondary py-2 px-4 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="icon-container-green">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Auto Care Center</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base text-gray-600">📍 2.3 km away</span>
                        <span className="text-base text-gray-600">⭐ 4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="status-open">
                    Open
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="icon-container-blue">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Quick Wheel Service</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base text-gray-600">📍 3.5 km away</span>
                        <span className="text-base text-gray-600">⭐ 4.6</span>
                      </div>
                    </div>
                  </div>
                  <div className="status-open">
                    Open
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
