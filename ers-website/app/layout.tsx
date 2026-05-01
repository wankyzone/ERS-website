import "./globals.css";

export const metadata = {
  title: "ERS Website",
  description: "ERS Platform"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0b1220",
          fontFamily: "system-ui, sans-serif",
          color: "white",
        }}
      >
        <div style={{ minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}