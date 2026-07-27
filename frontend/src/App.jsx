import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import Charts from "./components/Charts";
import ChatBox from "./components/ChatBox";

function App() {
  const [dashboard, setDashboard] = useState({
    work_orders: 0,
    deals: 0,
    completed: 0,
    completion_rate: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/dashboard");

      console.log(res.data);

      setDashboard(res.data);
    } catch (err) {
      console.error(err);
      console.error(err.response);
    }
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <Navbar />

      <div className="p-6">
        <DashboardCards dashboard={dashboard} />

        <Charts dashboard={dashboard} />

        <ChatBox />
      </div>
    </div>
  );
}

export default App;