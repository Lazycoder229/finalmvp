import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Star, Inbox, Send, Award, MessageSquare, User } from "lucide-react";

// --- Mock Data and API Simulation ---
// Note: Since a real API is not available in this environment,
// I've created mock data to show the design and functionality.
const MOCK_DATA = {
  received: [
    {
      id: 1,
      from_name: "Jane Doe",
      from_email: "jane.d@example.com",
      rating: 5,
      comment: "Excellent work on the Q3 presentation!",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 2,
      from_name: "Alex Smith",
      from_email: "alex.s@example.com",
      rating: 4,
      comment: "Solid delivery, perhaps add more visuals next time.",
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: 3,
      from_name: "Chris Lee",
      from_email: "chris.l@example.com",
      rating: 3,
      comment:
        "The project was completed, but communication could be improved.",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    },
    {
      id: 4,
      from_name: "Pat Brown",
      from_email: "pat.b@example.com",
      rating: 5,
      comment: "A pleasure to work with, highly skilled and dependable.",
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 5,
      from_name: "Sam Green",
      from_email: "sam.g@example.com",
      rating: 2,
      comment: "Needs immediate follow-up on critical items.",
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    },
  ],
  given: [
    {
      id: 6,
      to_name: "Jamie Fox",
      to_email: "jamie.f@example.com",
      rating: 5,
      comment: "Fantastic job leading the team!",
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      id: 7,
      to_name: "Taylor King",
      to_email: "taylor.k@example.com",
      rating: 4,
      comment: "Good effort, but missed one deadline.",
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
  ],
  avgRating: 4.0, // Pre-calculated average for mock data
  totalReceived: 5, // Count of received feedback items
};

// --- Component Definition ---

export default function FeedbackDashboard() {
  const [receivedFeedback, setReceivedFeedback] = useState([]);
  const [givenFeedback, setGivenFeedback] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [activeTab, setActiveTab] = useState("received");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching feedback data from API
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        // In a real app, replace this with your actual fetch call:
        // const res = await fetch("/api/feedback");
        // const data = await res.json();

        // Using mock data for display
        const data = MOCK_DATA;

        setReceivedFeedback(data.received || []);
        setGivenFeedback(data.given || []);
        setAvgRating(data.avgRating || 0);
        setTotalReceived(data.totalReceived || 0);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  // Renders a set of full and empty Star icons based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex gap-0.5 text-lg">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) {
            // Full gold star
            return (
              <Star key={i} className="text-amber-400 fill-amber-400 w-5 h-5" />
            );
          } else if (hasHalfStar && i === fullStars) {
            // Half star (Simplified to only full/empty for consistency with original logic)
            return <Star key={i} className="text-gray-300 w-5 h-5" />;
          } else {
            // Empty (outline) star
            return <Star key={i} className="text-gray-300 w-5 h-5" />;
          }
        })}
      </div>
    );
  };

  // The visual component for a single feedback item
  const FeedbackCard = ({ feedback, type = "received" }) => {
    const name = type === "received" ? feedback.from_name : feedback.to_name;
    const email = type === "received" ? feedback.from_email : feedback.to_email;

    let borderColorClass;
    let tagColorClass;

    if (feedback.rating === 5) {
      borderColorClass = "border-green-500";
      tagColorClass = "bg-green-500";
    } else if (feedback.rating >= 4) {
      borderColorClass = "border-blue-500";
      tagColorClass = "bg-blue-500";
    } else if (feedback.rating >= 3) {
      borderColorClass = "border-amber-500";
      tagColorClass = "bg-amber-500";
    } else {
      borderColorClass = "border-red-500";
      tagColorClass = "bg-red-500";
    }

    return (
      <div
        key={feedback.id}
        className={`p-5 bg-white shadow-lg rounded-xl transition hover:shadow-xl duration-300 border-l-4 ${borderColorClass} border-t border-r border-b border-gray-100`}
      >
        {/* Header: User Info and Rating */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg border-2 border-indigo-200">
              {name?.[0]?.toUpperCase()}
            </div>
            {/* Name and Email */}
            <div>
              <strong className="text-lg text-gray-800">
                {name || (type === "received" ? "Anonymous" : "You")}
              </strong>
              <p className="text-sm text-gray-500 m-0 leading-tight">
                {email || "N/A"}
              </p>
            </div>
          </div>
          {/* Stars */}
          <div className="flex items-center">
            {renderStars(feedback.rating)}
          </div>
        </div>

        {/* Comment/Body */}
        {feedback.comment && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
            <p className="text-gray-700 m-0 italic text-base">
              "{feedback.comment}"
            </p>
          </div>
        )}

        {/* Footer: Time Ago and Rating Tag */}
        <div className="flex justify-between items-center pt-2">
          <small className="text-gray-400 text-xs">
            {formatDistanceToNow(new Date(feedback.created_at), {
              addSuffix: true,
            })}
          </small>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${tagColorClass}`}
          >
            {feedback.rating.toFixed(1)} / 5
          </span>
        </div>
      </div>
    );
  };

  // Stats Card Component
  const StatCard = ({ icon: Icon, title, value, colorClass }) => (
    <div
      className={`p-5 bg-white rounded-xl shadow-lg border-b-4 ${colorClass} transition hover:scale-[1.02] duration-300`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 rounded-full bg-opacity-20 ${colorClass
            .replace("border-", "bg-")
            .replace("-500", "-100")} ${colorClass.replace(
            "border-",
            "text-"
          )}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
          <p className="text-sm font-medium text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="text-lg font-medium text-indigo-600 flex items-center space-x-2">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading Feedback Data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Feedback Dashboard
          </h1>
          <p className="text-lg text-gray-500 mt-1">
            View and manage your performance feedback.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={Star}
            title="Average Rating"
            value={avgRating.toFixed(1)}
            colorClass="border-amber-500 text-amber-600"
          />
          <StatCard
            icon={Inbox}
            title="Feedback Received"
            value={totalReceived}
            colorClass="border-indigo-500 text-indigo-600"
          />
          <StatCard
            icon={Send}
            title="Feedback Given"
            value={givenFeedback.length}
            colorClass="border-green-500 text-green-600"
          />
          <StatCard
            icon={Award}
            title="5-Star Reviews"
            value={receivedFeedback.filter((f) => f.rating === 5).length}
            colorClass="border-rose-500 text-rose-600"
          />
        </div>

        {/* Tabs for Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === "received"
                  ? "border-b-2 border-indigo-600 text-indigo-600 bg-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("received")}
            >
              Received Feedback ({receivedFeedback.length})
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === "given"
                  ? "border-b-2 border-indigo-600 text-indigo-600 bg-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("given")}
            >
              Given Feedback ({givenFeedback.length})
            </button>
          </nav>
        </div>

        {/* Tab Contents */}
        <div className="mt-6">
          {activeTab === "received" &&
            (receivedFeedback.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No Feedback Received Yet"
                message="Feedback from your colleagues and team members will appear here."
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {receivedFeedback.map((f) => (
                  <FeedbackCard key={f.id} feedback={f} type="received" />
                ))}
              </div>
            ))}

          {activeTab === "given" &&
            (givenFeedback.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="No Feedback Given Yet"
                message="Feedback you provide to others will appear in this list."
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {givenFeedback.map((f) => (
                  <FeedbackCard key={f.id} feedback={f} type="given" />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Helper component for Empty State
const EmptyState = ({ icon: Icon, title, message }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-200 rounded-xl shadow-md min-h-60">
    <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-500 mt-2 text-center max-w-sm">{message}</p>
  </div>
);
