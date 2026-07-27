import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
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
    console.log(err);
    console.log(err.response);
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

      <DashboardCards dashboard={dashboard} />
      <ChatBox />
    </div>
  );
}

export default App;