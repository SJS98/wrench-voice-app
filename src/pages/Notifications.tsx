
import { useState } from "react";
import { Bell, Calendar, Clock, CheckCircle, AlertTriangle, Info, Car } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "status" | "promo" | "alert";
  time: string;
  isRead: boolean;
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Service Reminder",
    message: "Your car is due for service next week. Book now for 10% discount!",
    type: "reminder",
    time: "2h ago",
    isRead: false
  },
  {
    id: "2",
    title: "Service Complete",
    message: "Your car service at Auto Care Center has been completed. You can pick up your car now.",
    type: "status",
    time: "Yesterday",
    isRead: false
  },
  {
    id: "3",
    title: "Limited Time Offer",
    message: "Get 20% off on all brake services this weekend!",
    type: "promo",
    time: "2d ago",
    isRead: true
  },
  {
    id: "4",
    title: "Booking Confirmed",
    message: "Your service booking for 15th May, 2:30 PM has been confirmed.",
    type: "status",
    time: "3d ago",
    isRead: true
  },
  {
    id: "5",
    title: "Emergency Alert",
    message: "Heavy rain warning in your area. Make sure your car has good wipers and tires.",
    type: "alert",
    time: "5d ago",
    isRead: true
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const markAllAsRead = () => {
    setNotifications((prev) => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-6 w-6 text-blue-500" />;
      case "status":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "promo":
        return <Info className="h-6 w-6 text-purple-500" />;
      case "alert":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <AppLayout title="Notifications" showBackButton>
      <div className="page-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Notifications</h2>
          <button 
            className="text-sm text-garage-purple"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex gap-3 p-4 rounded-lg border ${
                  notification.isRead 
                    ? "bg-white border-gray-200" 
                    : "bg-garage-purple/5 border-garage-purple/20"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-medium ${!notification.isRead ? "text-garage-purple" : ""}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No notifications yet</h3>
            <p className="text-sm text-muted-foreground">
              We'll notify you when something important happens
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
