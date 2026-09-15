import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import api from '../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import toast from 'react-hot-toast';

const COLORS = ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'];

function StatCard({ label, value, color = 'text-surface-900' }) {
  return (
    <Card className="p-5">
      <CardContent className="p-0">
        <p className="stat-label">{label}</p>
        <p className={`stat-value ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

export default function Analytics() {
  const [overview,  setOverview]  = useState(null);
  const [byCategory,setByCategory]= useState([]);
  const [byPriority,setByPriority]= useState([]);
  const [trends,    setTrends]    = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  const [deptPerf,  setDeptPerf]  = useState([]);
  const [frequent,  setFrequent]  = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [o, c, p, t, ph, dp, f] = await Promise.allSettled([
        api.get('/analytics/overview'),
        api.get('/analytics/by-category'),
        api.get('/analytics/by-priority'),
        api.get('/analytics/trends'),
        api.get('/analytics/peak-hours'),
        api.get('/analytics/department-performance'),
        api.get('/analytics/frequent-issues'),
      ]);
      if (o.status  === 'fulfilled') setOverview(o.value.data.stats);
      if (c.status  === 'fulfilled') setByCategory(c.value.data.data.map((d) => ({ ...d, count: +d.count })));
      if (p.status  === 'fulfilled') setByPriority(p.value.data.data.map((d) => ({ ...d, count: +d.count })));
      if (t.status  === 'fulfilled') setTrends(t.value.data.data.map((d) => ({ ...d, count: +d.count })));
      if (ph.status === 'fulfilled') setPeakHours(ph.value.data.data.map((d) => ({ ...d, count: +d.count })));
      if (dp.status === 'fulfilled') setDeptPerf(dp.value.data.data.map((d) => ({ ...d, total: +d.total, resolved: +d.resolved, resolutionRate: +d.resolutionRate })));
      if (f.status  === 'fulfilled') setFrequent(f.value.data.data);
      const anyFailed = [o, c, p, t, ph, dp, f].some((r) => r.status === 'rejected');
      if (anyFailed) toast.error('Some analytics sections could not be loaded');
    } catch { toast.error('Failed to load analytics'); }
    finally { setLoading(false); }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-base font-semibold text-surface-900">Analytics</h2>
        <p className="text-xs text-surface-400 mt-0.5">System-wide complaint statistics</p>
      </div>

      {/* Overview */}
      {overview && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label="Total"       value={overview.total}      />
          <StatCard label="Pending"     value={overview.pending}    color="text-warning" />
          <StatCard label="In Progress" value={overview.inProgress} color="text-info" />
          <StatCard label="Resolved"    value={overview.resolved}   color="text-success" />
          <StatCard label="Escalated"   value={overview.escalated}  color="text-danger" />
        </div>
      )}

      {/* Category + Priority */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">By Category</CardTitle>
          </CardHeader>
          <CardContent>
            {byCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={byCategory} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80}
                    label={({ _id, count }) => `${_id}: ${count}`}>
                    {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-surface-400 text-center py-8">No data</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">By Priority</CardTitle>
          </CardHeader>
          <CardContent>
            {byPriority.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={byPriority}>
                  <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-surface-400 text-center py-8">No data</p>}
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Complaint Trends (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {trends.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trends}>
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} name="Complaints" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-sm text-surface-400 text-center py-8">No data for the last 30 days</p>}
        </CardContent>
      </Card>

      {/* Peak Hours + Dept Performance */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Peak Submission Hours</CardTitle>
          </CardHeader>
          <CardContent>
            {peakHours.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={peakHours}>
                  <XAxis dataKey="_id" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}:00`} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip labelFormatter={(v) => `${v}:00`} />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-surface-400 text-center py-8">No data</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {deptPerf.length > 0 ? (
              <div className="space-y-3">
                {deptPerf.map((d) => (
                  <div key={d._id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-surface-700">{d._id}</span>
                      <span className="text-xs text-surface-500">{d.resolved}/{d.total} · {d.resolutionRate?.toFixed(0)}%</span>
                    </div>
                    <Progress value={d.resolutionRate} className="h-1.5" />
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-surface-400 text-center py-8">No data</p>}
          </CardContent>
        </Card>
      </div>

      {/* Frequent issues */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Predictive: Frequently Reported Issues</CardTitle>
          <p className="text-xs text-surface-400">Locations with repeated issues — consider preventive maintenance</p>
        </CardHeader>
        <CardContent>
          {frequent.length > 0 ? (
            <div className="space-y-2">
              {frequent.map((f, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-surface-50 rounded-lg border border-surface-100">
                  <div>
                    <p className="text-xs font-medium text-surface-800">{f._id?.category} — {f._id?.location}</p>
                  </div>
                  <span className="text-xs font-semibold text-danger bg-danger-light px-2 py-0.5 rounded-full">
                    {f.count}× reported
                  </span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-surface-400 text-center py-4">No repeated issues found</p>}
        </CardContent>
      </Card>
    </div>
  );
}
