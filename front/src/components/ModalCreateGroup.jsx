import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ModalCreateGroup({ onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.subject) {
      alert("Please fill in required fields");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Group" : "Start a New Study Group"}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Group Name *
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Advanced React Hooks"
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject / Topic *
            </label>
            <input
              type="text"
              id="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Web Dev, Finance, Biology"
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief overview of this group"
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              {initialData ? "Save Changes" : "Save Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
