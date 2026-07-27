import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

export default function Charts({ dashboard }) {
  if (!dashboard) return null;

  const pieData = [
    {
      name: "Completed",
      value: dashboard.completed,
    },
    {
      name: "Remaining",
      value: dashboard.work_orders - dashboard.completed,
    },
  ];

  const barData = [
    {
      name: "Work Orders",
      Total: dashboard.work_orders,
    },
    {
      name: "Deals",
      Total: dashboard.deals,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Work Order Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Business Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}