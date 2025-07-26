
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
      <div className="py-6 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-primary/80 p-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome to Mr.GarageWala</h1>
                <p className="text-white/90 text-sm">Your trusted vehicle care partner</p>
              </div>
            </div>
            <p className="text-white/90 mb-6 text-lg leading-relaxed">
              Professional auto care services at your doorstep. Book services, buy parts, and get emergency help.
            </p>
            <div className="flex gap-3">
              <Link to="/services">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  <Wrench className="h-4 w-4 mr-2" />
                  Book Service
                </Button>
              </Link>
              <TutorialLauncher variant="button" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Tutorial Card */}
        <TutorialLauncher variant="card" />

        {/* Quick Actions */}
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
          <p className="section-subtitle">Fast access to essential services</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Link to="/services" className="feature-card group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm">Book Service</h3>
            <p className="text-xs text-muted-foreground mt-1">Professional care</p>
          </Link>

          <Link to="/spare-parts" className="feature-card group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm">Buy Parts</h3>
            <p className="text-xs text-muted-foreground mt-1">Genuine quality</p>
          </Link>

          <Link to="/sos" className="feature-card group hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm text-red-700">Emergency SOS</h3>
            <p className="text-xs text-red-600 mt-1">24/7 assistance</p>
          </Link>
        </div>

        {/* Feature Sections */}
        <div className="grid gap-6">
          {/* Used Vehicles */}
          <div className="service-card">
            <div className="section-header mb-4">
              <h2 className="section-title">Buy Used Vehicles</h2>
              <Link to="/used-vehicles" className="text-sm text-primary flex items-center hover:text-accent transition-colors">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Find Your Perfect Vehicle</h3>
                <p className="text-muted-foreground mb-3">Browse certified used cars, bikes & more with verified dealers</p>
                <Link to="/used-vehicles">
                  <Button className="btn-primary w-full">
                    <Car className="h-4 w-4 mr-2" />
                    Browse Used Vehicles
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Spare Parts */}
          <div className="service-card">
            <div className="section-header mb-4">
              <h2 className="section-title">Spare Parts Store</h2>
              <Link to="/spare-parts" className="text-sm text-primary flex items-center hover:text-accent transition-colors">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Quality Spare Parts</h3>
                <p className="text-muted-foreground mb-3">Genuine parts for all vehicle types with warranty</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/spare-parts">
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Shop Parts
                    </Button>
                  </Link>
                  <Link to="/sell-spare-part">
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Sell Parts
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Service Media */}
          <div className="service-card">
            <div className="section-header mb-4">
              <h2 className="section-title">Service Tracking</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Track Services Visually</h3>
                <p className="text-muted-foreground mb-3">Real-time photos, videos & live updates of your vehicle service</p>
                <Link to="/my-bookings">
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Your Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Nearby Garages */}
          <div className="service-card">
            <div className="section-header mb-4">
              <h2 className="section-title">Nearby Garages</h2>
              <Link to="/search" className="text-sm text-primary flex items-center hover:text-accent transition-colors">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="garage-card bg-gradient-to-r from-background to-secondary/30 border-border/50 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Auto Care Center</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>2.3 km away</span>
                        <span className="mx-2">•</span>
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="status-open">
                    Open
                  </div>
                </div>
              </div>
              
              <div className="garage-card bg-gradient-to-r from-background to-secondary/30 border-border/50 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Quick Wheel Service</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>3.5 km away</span>
                        <span className="mx-2">•</span>
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>4.6</span>
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
