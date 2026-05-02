export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0b1220",
      color: "white"
    }}>
      <div>
        <h1>ERS Platform</h1>
        <p>Welcome. Choose your path.</p>

        <a href="/auth/login">Login</a>
      </div>
    </div>
  );
}