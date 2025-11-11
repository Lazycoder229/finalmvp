// StudentProgress.jsx
import React, { useState } from "react";
import { format } from "date-fns";
import {
  Clock,
  BookOpen,
  BarChart2,
  Target,
  Award,
  Star,
  Book,
} from "lucide-react"; // Lucide icons

export default function StudentProgress() {
  // Mock data
  const [totalHours, setTotalHours] = useState(37.5);
  const [weeklyData, setWeeklyData] = useState([
    { week: "Sep 10", hours: 2 },
    { week: "Sep 17", hours: 3 },
    { week: "Sep 24", hours: 5 },
    { week: "Oct 01", hours: 4 },
    { week: "Oct 08", hours: 6 },
    { week: "Oct 15", hours: 3 },
    { week: "Oct 22", hours: 8 },
    { week: "Oct 29", hours: 6 },
  ]);
  const [subjectData, setSubjectData] = useState([
    { subject: "React", hours: 12 },
    { subject: "Node.js", hours: 8 },
    { subject: "Python", hours: 10 },
    { subject: "SQL", hours: 7 },
  ]);
  const [recentLogs, setRecentLogs] = useState([
    { date: "2025-10-29", subject: "React", hours: 2, activity_type: "Study" },
    {
      date: "2025-10-28",
      subject: "Python",
      hours: 1.5,
      activity_type: "Practice",
    },
    { date: "2025-10-27", subject: "SQL", hours: 2, activity_type: "Homework" },
  ]);

  const thisWeekHours = weeklyData[weeklyData.length - 1]?.hours || 0;

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    hours: 0,
    log_date: format(new Date(), "yyyy-MM-dd"),
    activity_type: "Study",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged ${form.hours}h for ${form.subject}`);
    setShowModal(false);
  };

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Getting Started",
      desc: "Log first hour",
      achieved: totalHours > 0,
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: "Dedicated",
      desc: "10+ hours total",
      achieved: totalHours >= 10,
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Consistent",
      desc: "5h this week",
      achieved: thisWeekHours >= 5,
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Expert",
      desc: "50+ hours total",
      achieved: totalHours >= 50,
    },
  ];

  const maxWeeklyHours = Math.max(...weeklyData.map((d) => d.hours), 1);
  const maxSubjectHours = Math.max(...subjectData.map((d) => d.hours), 1);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Progress</h1>
          <p className="text-gray-500">Track your learning journey</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Log Study Hours
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 flex flex-col items-center">
          <Clock className="w-8 h-8 mb-2 text-blue-500" />
          <h2 className="text-xl font-semibold">{totalHours.toFixed(1)}h</h2>
          <p className="text-gray-500">Total Study Hours</p>
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col items-center">
          <BookOpen className="w-8 h-8 mb-2 text-green-500" />
          <h2 className="text-xl font-semibold">{subjectData.length}</h2>
          <p className="text-gray-500">Active Subjects</p>
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col items-center">
          <BarChart2 className="w-8 h-8 mb-2 text-purple-500" />
          <h2 className="text-xl font-semibold">{thisWeekHours}h</h2>
          <p className="text-gray-500">This Week</p>
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col items-center">
          <Target className="w-8 h-8 mb-2 text-yellow-500" />
          <h2 className="text-xl font-semibold">
            {totalHours > 0
              ? Math.round((thisWeekHours / Math.max(totalHours / 8, 1)) * 100)
              : 0}
            %
          </h2>
          <p className="text-gray-500">Weekly Progress</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Weekly Bar Chart */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-4">Study Hours (Last 8 Weeks)</h2>
            <div className="flex items-end gap-2 h-48">
              {weeklyData.map((w, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-purple-600 w-8 rounded-t"
                    style={{ height: `${(w.hours / maxWeeklyHours) * 100}%` }}
                  >
                    <span className="block text-center text-sm mt-1 text-gray-700">
                      {w.hours}h
                    </span>
                  </div>
                  <span className="text-xs mt-1 text-gray-500">{w.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-2">Recent Activity</h2>
            {recentLogs.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                No activity logged
              </p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Date</th>
                    <th className="py-2">Subject</th>
                    <th className="py-2">Hours</th>
                    <th className="py-2">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs.map((log, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2">
                        {format(new Date(log.date), "MMM dd")}
                      </td>
                      <td className="py-2">{log.subject}</td>
                      <td className="py-2 font-semibold">{log.hours}h</td>
                      <td className="py-2">{log.activity_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Hours by Subject */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-4">Hours by Subject</h2>
            <div className="flex flex-col gap-3">
              {subjectData.map((s, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{s.subject}</span>
                    <span className="text-gray-700">{s.hours}h</span>
                  </div>
                  <div className="bg-gray-200 h-4 rounded">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded"
                      style={{ width: `${(s.hours / maxSubjectHours) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((a, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-4 rounded ${
                    a.achieved
                      ? "bg-green-100 opacity-100"
                      : "bg-gray-100 opacity-50"
                  }`}
                >
                  <div className="mb-2">{a.icon}</div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-gray-500 text-sm text-center">
                    {a.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Log Hours Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Log Study Hours</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="border p-2 rounded w-full"
                value={form.subject}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="hours"
                placeholder="Hours"
                step="0.5"
                min="0.5"
                max="24"
                className="border p-2 rounded w-full"
                value={form.hours}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="log_date"
                className="border p-2 rounded w-full"
                value={form.log_date}
                onChange={handleChange}
                required
              />
              <select
                name="activity_type"
                className="border p-2 rounded w-full"
                value={form.activity_type}
                onChange={handleChange}
              >
                <option>Study</option>
                <option>Practice</option>
                <option>Reading</option>
                <option>Project</option>
                <option>Homework</option>
              </select>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Log Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
