import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const AdminPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/list-registrations');
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
    <>
      <Helmet>
        <title>Admin Dashboard | VDumpling Dynasty</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

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
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-nepal-red transition-colors"
            >
              ← Back to Site
            </a>
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
    </>
  );
};

export default AdminPage;
