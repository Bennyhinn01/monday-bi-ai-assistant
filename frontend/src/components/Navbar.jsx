function Navbar() {
  return (
    <nav
      style={{
        background: "#ffffff",
        padding: "18px 35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,.05)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 55,
            height: 55,
            borderRadius: 15,
            background: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 26,
            marginRight: 15
          }}
        >
          🤖
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: "#1e293b"
            }}
          >
            Monday BI AI
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: 15
            }}
          >
            AI Business Intelligence Assistant
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#eff6ff",
          color: "#2563eb",
          padding: "8px 18px",
          borderRadius: 30,
          fontWeight: "600"
        }}
      >
        Powered by Python + Gemini
      </div>
    </nav>
  );
}

export default Navbar;