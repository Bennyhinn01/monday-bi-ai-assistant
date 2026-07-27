import {
  ClipboardList,
  Handshake,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

function Card({ title, value, icon }) {
  return (
    <div
      style={{
        background: "white",
        padding: 25,
        borderRadius: 18,
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            color: "#64748b",
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#111827",
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: 14,
          borderRadius: 14,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

function DashboardCards({ dashboard }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
        margin: 30,
      }}
    >
      <Card
        title="Work Orders"
        value={dashboard.work_orders}
        icon={<ClipboardList size={30} />}
      />

      <Card
        title="Deals"
        value={dashboard.deals}
        icon={<Handshake size={30} />}
      />

      <Card
        title="Completed"
        value={dashboard.completed}
        icon={<CheckCircle size={30} />}
      />

      <Card
        title="Completion Rate"
        value={dashboard.completion_rate}
        icon={<TrendingUp size={30} />}
      />
    </div>
  );
}

export default DashboardCards;