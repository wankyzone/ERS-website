"use client";

import { useEffect, useState } from "react";
import UserControlPanel from "./UserControlPanel";

/* ===================== TYPES ===================== */

type Metrics = {
  totalEscrow: number;
  totalPaidOut: number;
  revenue: number;
};

type Payout = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
};

type Alert = {
  message: string;
};

/* ===================== MAIN DASHBOARD ===================== */

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!metrics) return <div className="p-6 text-red-500">Failed to load data</div>;

  return (
    <div className="p-6 space-y-6">

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Escrow Holding" value={metrics.totalEscrow} />
        <Card title="Total Paid Out" value={metrics.totalPaidOut} />
        <Card title="Platform Revenue" value={metrics.revenue} />
      </div>

      {/* TABLE + ALERTS */}
      <div className="grid grid-cols-1 gap-6">
        <PayoutTable />
        <AlertsPanel />
        <FraudPanel />
        <RiskPanel />
        <UserControlPanel />
      </div>

    </div>
  );
}

/* ===================== CARD ===================== */

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">
        ₦{value.toLocaleString()}
      </p>
    </div>
  );
}

/* ===================== PAYOUT TABLE ===================== */

function PayoutTable() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState<string | null>(null);

  const fetchPayouts = async () => {
    try {
      const res = await fetch("/api/admin/payouts");
      const data = await res.json();
      setPayouts(data);
    } catch (err) {
      console.error("Failed to fetch payouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  /* ===== RETRY FUNCTION ===== */

  const retryPayout = async (id: string) => {
    setRetrying(id);

    try {
      const res = await fetch("/api/admin/retry-payout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payout_id: id }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Retry initiated");
        await fetchPayouts(); // 🔥 no full reload
      }
    } catch (err) {
      console.error(err);
      alert("Retry failed");
    } finally {
      setRetrying(null);
    }
  };

  if (loading) return <div>Loading payouts...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-bold mb-4">Payout Monitoring</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {payouts.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2">{p.user_id}</td>
              <td>₦{p.amount.toLocaleString()}</td>

              {/* 🔥 UPDATED STATUS CELL */}
              <td>
                <div className="flex gap-2 items-center">
                  <StatusBadge status={p.status} />

                  {p.status === "failed" && (
                    <button
                      onClick={() => retryPayout(p.id)}
                      disabled={retrying === p.id}
                      className="text-xs bg-black text-white px-2 py-1 rounded disabled:opacity-50"
                    >
                      {retrying === p.id ? "Retrying..." : "Retry"}
                    </button>
                  )}
                </div>
              </td>

              <td>{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===================== STATUS BADGE ===================== */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    processing: "bg-yellow-100 text-yellow-700",
    pending: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}

/* ===================== ALERT PANEL ===================== */

function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Checking alerts...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-bold mb-2">⚠️ Alerts</h2>

      {alerts.length === 0 && (
        <p className="text-green-600">No issues detected</p>
      )}

      {alerts.map((a, i) => (
        <div key={i} className="text-red-500">
          {a.message}
        </div>
      ))}
    </div>
  );
}

function FraudPanel() {
  const [fraud, setFraud] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFraud = async () => {
    const res = await fetch("/api/admin/fraud");
    const data = await res.json();
    setFraud(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFraud();
  }, []);

  const toggleFreeze = async (user_id: string, freeze: boolean) => {
    await fetch("/api/admin/freeze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, freeze }),
    });

    fetchFraud();
  };

  if (loading) return <div>Loading fraud signals...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-bold mb-3">🚨 Fraud Intelligence</h2>

      {fraud.length === 0 && (
        <p className="text-green-600">No fraud detected</p>
      )}

      {fraud.map((f) => {
        const user = f.profiles;

        return (
          <div key={f.id} className="border-b py-3">
            <p className="font-semibold">{f.signal_type}</p>

            <p className="text-xs text-gray-500">
              User: {user?.email}
            </p>

            <p className="text-xs">
              Risk Score: {user?.risk_score}
            </p>

            <p className="text-xs text-red-500">
              Severity: {f.severity}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(f.created_at).toLocaleString()}
            </p>

            <div className="mt-2">
              {user?.is_frozen ? (
                <button
                  onClick={() => toggleFreeze(user.id, false)}
                  className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                >
                  Unfreeze
                </button>
              ) : (
                <button
                  onClick={() => toggleFreeze(user.id, true)}
                  className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                >
                  Freeze
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RiskPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users-risk")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading risk analysis...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-bold mb-3">🧠 Risk Scoring</h2>

      {users.length === 0 && (
        <p className="text-green-600">No risky users</p>
      )}

      {users.map((u) => (
        <div key={u.id} className="border-b py-2">
          <p className="text-sm">{u.id}</p>

          <p className="text-xs text-gray-500">
            Risk Score: {u.risk_score}
          </p>

          {u.is_frozen && (
            <span className="text-red-600 text-xs font-bold">
              FROZEN
            </span>
          )}
        </div>
      ))}
    </div>
  );
}