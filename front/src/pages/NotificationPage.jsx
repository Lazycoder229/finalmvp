import React, { useState, useEffect } from "react";
import { Bell, CheckCircle } from "lucide-react";

// --- MOCK DATA & HELPERS ---

// Mock data simulating notifications fetched from the database
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Assignment Graded",
    message: 'Your "React Component Design" assignment received an A+.',
    created_at: "2025-11-05T18:00:00Z",
  },
  {
    id: 2,
    title: "New Course Enrollment",
    message: 'You have been successfully enrolled in "Advanced Tailwind CSS".',
    created_at: "2025-11-04T15:30:00Z",
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "The platform will undergo maintenance tonight at 11 PM UTC.",
    created_at: "2025-11-03T09:00:00Z",
  },
  {
    id: 4,
    title: "Mentor Accepted",
    message: 'Your application to mentor "Intro to PHP" has been approved.',
    created_at: "2025-11-02T12:45:00Z",
  },
];

// Mock function to format time (simulating timeAgo function from PHP)
const timeAgo = (dateStr) => {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

// --- REACT COMPONENT ---

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data and marking as read on load
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // 1. Fetch notifications (simulated with MOCK_NOTIFICATIONS)
      const fetchedNotifications = MOCK_NOTIFICATIONS;
      setNotifications(fetchedNotifications);

      // 2. Mark all as read (simulated by a console log, as per PHP logic)
      if (fetchedNotifications.length > 0) {
        console.log(
          "SIMULATION: All notifications marked as read in the database."
        );
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // In a real application, the sidebar and topbar would be separate components.
  // Here, we provide a simple, self-contained layout.
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header (simulating topbar/content-area interaction) */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            All your recent activity and updates from EduPlatform.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-8 text-center text-gray-500">
            <Bell size={24} className="animate-spin mx-auto mb-2" />
            Loading notifications...
          </div>
        )}

        {/* Content Card (simulating the PHP 'card' div) */}
        {!isLoading && (
          <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-0">
              {/* Empty State */}
              {notifications.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-lg">
                  <CheckCircle
                    size={48}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <div className="text-xl font-semibold text-gray-800">
                    No notifications
                  </div>
                  <p className="text-gray-500 mt-1">
                    You're all caught up! Everything looks good.
                  </p>
                </div>
              ) : (
                // Notifications List
                <div>
                  {notifications.map((notif, index) => (
                    <div
                      key={notif.id}
                      className="flex items-start p-4 hover:bg-indigo-50/50 transition duration-150 cursor-pointer"
                    >
                      {/* Icon Indicator */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-3 mt-1">
                        {/* Placeholder Icon: replace with dynamic icon based on notification type */}
                        <Bell size={16} />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="notification-title font-semibold text-gray-800 leading-snug">
                            {notif.title}
                          </div>
                          <div className="notification-time text-xs text-gray-400 ml-4 flex-shrink-0">
                            {timeAgo(notif.created_at)}
                          </div>
                        </div>
                        <div className="notification-message text-sm text-gray-600 mt-0.5">
                          {notif.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
