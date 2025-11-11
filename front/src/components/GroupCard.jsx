import React from "react";
import { Users, Zap, X } from "lucide-react";

export default function GroupCard({
  group,
  user,
  onEnter,
  onJoin,
  onLeave,
  onEdit,
  onDelete,
}) {
  const isInstructor = user?.id === group.instructor_id; // check creator
  const isJoined = group.joined; // only joined status
  const isStudent = !isInstructor; // non-creator users

  const enterButtonStyle =
    "bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700";
  const joinButtonStyle =
    "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700";
  const editButtonStyle =
    "bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow";
  const deleteButtonStyle =
    "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow";

  return (
    <div className="bg-white border border-gray-100 rounded shadow hover:shadow transition duration-300 p-6 flex flex-col justify-between h-full">
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-sky-700 bg-sky-100 rounded-xl border border-sky-300 shadow-sm">
            {group.subject}
          </span>
          <Zap
            className="w-5 h-5 text-sky-500 flex-shrink-0"
            title="Active Group"
          />
        </div>

        <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-snug">
          {group.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[42px]">
          {group.description || "No description available."}
        </p>

        {/* Metadata */}
        <div className="text-sm text-gray-700 space-y-3 mb-6 pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-800">
            <Users className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
            <span className="font-semibold">Members:</span>
            <span className="font-extrabold ml-2 text-lg">
              {group.member_count}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="bg-indigo-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold mr-3 flex-shrink-0">
              {group.instructor_name?.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold">Instructor:</span>
            <span className="ml-2 font-medium">{group.instructor_name}</span>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
        {/* Enter button always for joined users */}
        {isJoined && (
          <button
            onClick={onEnter}
            className={`w-full ${enterButtonStyle} text-white font-bold py-3 rounded shadow transition duration-200 transform hover:-translate-y-0.5`}
            title="Enter Group"
          >
            Enter Group
          </button>
        )}

        {/* Instructor actions */}
        {isInstructor && (
          <div className="flex gap-2 mt-2">
            {onEdit && (
              <button onClick={onEdit} className={editButtonStyle}>
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className={deleteButtonStyle}>
                Delete
              </button>
            )}
          </div>
        )}

        {/* Student joined actions */}
        {isStudent && isJoined && onLeave && (
          <button
            onClick={onLeave}
            title="Leave Group"
            className="p-3 rounded-xl text-red-600 border border-red-200 hover:bg-red-50 transition duration-200 flex-shrink-0 mt-2"
          >
            Leave Group
          </button>
        )}

        {/* Join button for non-joined users */}
        {!isJoined && onJoin && (
          <button
            onClick={onJoin}
            className={`w-full ${joinButtonStyle} text-white font-bold py-3 rounded shadow transition duration-200 transform hover:-translate-y-0.5`}
            title="Join Group"
          >
            Join Group
          </button>
        )}
      </div>
    </div>
  );
}
