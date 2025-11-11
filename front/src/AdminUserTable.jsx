import React from "react";

export default function AdminUsersTable({ users = [] }) {
  const limitedUsers = users.slice(0, 5); // limit to 5 rows

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">
          User Management
        </h2>
        <p className="text-sm text-slate-500">
          Showing {limitedUsers.length} of {users.length} users
        </p>
      </div>

      <div className="overflow-y-auto max-h-[340px]">
        <table className="min-w-full text-sm text-slate-700">
          <thead className="bg-slate-100 sticky top-0">
            <tr>
              <th className="text-left px-5 py-3 font-medium">#</th>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Email</th>
              <th className="text-left px-5 py-3 font-medium">Role</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {limitedUsers.length > 0 ? (
              limitedUsers.map((user, index) => (
                <tr
                  key={user.id || index}
                  className="hover:bg-slate-50 transition-colors duration-200 border-b last:border-0"
                >
                  <td className="px-5 py-3">{index + 1}</td>
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {user.name}
                  </td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3 capitalize">{user.role}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-slate-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
