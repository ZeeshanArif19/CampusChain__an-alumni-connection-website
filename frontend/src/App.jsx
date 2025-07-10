import React, { useState } from "react";
import Button from "./components/ui/Button.jsx";
import { Card, CardContent } from "./components/ui/Card.jsx";
import {
  CalendarIcon,
  UsersIcon,
  CheckCircleIcon,
  TrophyIcon,
  EyeIcon,
  ListIcon,
} from "lucide-react";

const categories = [
  { icon: "</>", label: "Code" },
  { icon: "💼", label: "Business" },
  { icon: "👨‍🏫", label: "Teaching" },
  { icon: "👥", label: "Community" },
  { icon: "💻", label: "Tech" },
  { icon: "🏆", label: "Competition" },
];

export default function App() {
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    url: "",
  });

  const clearForm = () => {
    setEventData({
      title: "",
      category: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      url: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="text-2xl font-bold flex items-center mb-6">
        <span className="mr-2">🔒</span> Admin Dashboard - Events Management
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {["Total Events", "Total Applicants", "Active Events", "Completed Events"].map((label, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 text-center">
              <div className="text-purple-600 text-2xl mb-2">
                {[<CalendarIcon />, <UsersIcon />, <CheckCircleIcon />, <TrophyIcon />][idx]}
              </div>
              <div className="text-xl font-semibold">0</div>
              <div className="text-sm text-gray-500">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="w-2/3">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-lg font-bold mb-4 flex items-center">
                <span className="mr-2">+</span> Create New Event
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Event Title *"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="p-2 border rounded-md"
                    value={eventData.category}
                    onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                  >
                    <option value="">Select Category *</option>
                    {categories.map((cat) => (
                      <option key={cat.label} value={cat.label}>{cat.label}</option>
                    ))}
                  </select>

                  <select
                    className="p-2 border rounded-md"
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  >
                    <option value="">Select Location *</option>
                    <option>Online</option>
                    <option>Campus</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="p-2 border rounded-md"
                    value={eventData.startDate}
                    onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                  />
                  <input
                    type="date"
                    className="p-2 border rounded-md"
                    value={eventData.endDate}
                    onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                  />
                </div>

                <textarea
                  rows="4"
                  className="w-full p-2 border rounded-md"
                  placeholder="Description *"
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                ></textarea>

                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Registration/Application URL"
                  value={eventData.url}
                  onChange={(e) => setEventData({ ...eventData, url: e.target.value })}
                />

                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center border p-3 rounded-lg w-28 text-center hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="text-xl">{cat.icon}</div>
                      <div className="text-sm mt-1">{cat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-4">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">+ Create Event</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={clearForm}>Clear Form</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center text-lg font-bold mb-4">
                <ListIcon className="mr-2" /> Manage Events
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="p-2">Event Title</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Location</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dynamic Rows Here */}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/3">
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-bold mb-4 flex items-center">
                <EyeIcon className="mr-2" /> Live Preview
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-purple-700 text-white p-6 rounded-lg mb-4">
                <div className="text-4xl mb-4">🗓️
                </div>
                <div className="font-bold text-lg">{eventData.title || "Event Title"}</div>
                <div className="text-sm mt-1">
                  🗓️ {eventData.startDate || "Select Date"}<br />
                  🔍 {eventData.category || "Select Category"}<br />
                  📍 {eventData.location || "Select Location"}
                </div>
                <div className="text-xs mt-2">{eventData.description || "Enter event description to see preview..."}</div>

                <div className="flex gap-2 mt-4">
                  <Button className="bg-purple-600 text-white">Apply Now</Button>
                  <Button className="bg-black text-white">Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
