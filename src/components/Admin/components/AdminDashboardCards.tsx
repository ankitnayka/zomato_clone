// components/AdminDashboardCards.tsx
import {
  Building2,
  Utensils,
  MenuSquare,
  Users,
  FolderKanban,
} from "lucide-react";

const stats = [
  {
    title: "Total Restaurants",
    value: 120,
    icon: <Building2 className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Total Cuisines",
    value: 35,
    icon: <Utensils className="w-6 h-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Menu Categories",
    value: 15,
    icon: <MenuSquare className="w-6 h-6 text-white" />,
    color: "bg-yellow-500",
  },
  {
    title: "Total Users",
    value: 2300,
    icon: <Users className="w-6 h-6 text-white" />,
    color: "bg-purple-600",
  },
  {
    title: "Collections",
    value: 12,
    icon: <FolderKanban className="w-6 h-6 text-white" />,
    color: "bg-red-500",
  },
];

export default function AdminDashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex items-center justify-between p-6 rounded-xl shadow-md bg-white"
        >
          <div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-2xl text-black font-semibold">{stat.value}</p>
          </div>
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.color}`}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
