import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// ─── Login Screen ───────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store token in sessionStorage (cleared when browser tab closes)
      sessionStorage.setItem('vdd_admin_token', data.token);
      onLogin(data.token);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nepal-red/10 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-nepal-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-nepal-red">VDD</span> Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              autoFocus
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-nepal-red/30 focus:border-nepal-red outline-none transition-all"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-nepal-red/30 focus:border-nepal-red outline-none transition-all pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-nepal-red text-white text-sm font-semibold rounded-lg hover:bg-nepal-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Back to site */}
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-gray-400 hover:text-nepal-red transition-colors">
            ← Back to Site
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Dashboard ────────────────────────────────────────────
const AdminDashboard = ({ token, onLogout }) => {
  const [registrations, setRegistrations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/list-registrations', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        onLogout();
        return;
      }

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRegistrations(data.registrations || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filtered = registrations.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.name?.toLowerCase().includes(term) ||
      r.mobile_number?.includes(term) ||
      r.payment_code?.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'DOB', 'Mobile', 'Payment Code', 'Status', 'Registered At'];
    const rows = filtered.map((r) => [
      r.id,
      r.name,
      formatDate(r.date_of_birth),
      r.mobile_number,
      r.payment_code,
      r.payment_status,
      formatDateTime(r.created_at),
    ]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vip-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              <span className="text-nepal-red">VDD</span> Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">VIP Card Registrations</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-nepal-red transition-colors hidden sm:inline"
            >
              ← Back to Site
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-nepal-red transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats + Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Registrations</p>
              <p className="text-2xl font-bold text-nepal-red">{total}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Showing</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search name, mobile, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 sm:w-64 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-nepal-red/30 focus:border-nepal-red outline-none"
            />
            <button
              onClick={fetchRegistrations}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 text-sm font-medium text-white bg-nepal-red rounded-lg hover:bg-nepal-red/90 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-nepal-red"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">Error: {error}</p>
            <button
              onClick={fetchRegistrations}
              className="mt-3 text-sm text-nepal-red hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg">No registrations found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm ? 'Try a different search term' : 'Waiting for first customer...'}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">DOB</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r, i) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-400">{r.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(r.date_of_birth)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">+91 {r.mobile_number}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono font-semibold text-nepal-red bg-red-50 px-2 py-1 rounded">
                          {r.payment_code}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            r.payment_status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {r.payment_status || 'pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDateTime(r.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((r) => (
                <div key={r.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{r.name}</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        r.payment_status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {r.payment_status || 'pending'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>📱 +91 {r.mobile_number}</p>
                    <p>🎂 {formatDate(r.date_of_birth)}</p>
                    <p>
                      🏷️{' '}
                      <span className="font-mono font-semibold text-nepal-red">
                        {r.payment_code}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">{formatDateTime(r.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Admin Page ────────────────────────────────────────────
const AdminPage = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem('vdd_admin_token') || null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vdd_admin_token');
    setToken(null);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | VDumpling Dynasty</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {token ? (
        <AdminDashboard token={token} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </>
  );
};

export default AdminPage;
