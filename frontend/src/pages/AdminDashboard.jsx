import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { BarChart3 } from 'lucide-react';

const STATUS_VARIANT   = { PENDING: 'pending', IN_PROGRESS: 'progress', RESOLVED: 'resolved', ESCALATED: 'escalated' };
const PRIORITY_VARIANT = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical' };

export default function AdminDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filters, setFilters]       = useState({ status: '', category: '', priority: '' });
  const [stats, setStats]           = useState(null);

  useEffect(() => {
    fetchComplaints();
    if (user?.role === 'admin') fetchStats();
  }, [filters, user?.role]);

  const fetchStats = async () => {
    try {
      const res = await api.get('/analytics/overview');
      setStats(res.data.stats);
    } catch { setStats(null); }
  };

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const res = await api.get('/complaints', { params });
      setComplaints(res.data.complaints);
    } catch { toast.error('Failed to load complaints'); }
    finally { setLoading(false); }
  };

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val === '__ALL__' ? '' : val }));

  return (
    <div className="max-w-6xl space-y-5">

      {/* Stats row (admin only) */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total',       value: stats.total,      color: 'text-surface-900' },
            { label: 'Pending',     value: stats.pending,    color: 'text-warning' },
            { label: 'In Progress', value: stats.inProgress, color: 'text-info' },
            { label: 'Resolved',    value: stats.resolved,   color: 'text-success' },
            { label: 'Escalated',   value: stats.escalated,  color: 'text-danger' },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <CardContent className="p-0">
                <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 tabular-nums ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters + analytics link */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Status */}
          <Select value={filters.status || '__ALL__'} onValueChange={(v) => setFilter('status', v)}>
            <SelectTrigger className="w-36 text-xs h-8">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Status</SelectItem>
              {['PENDING','IN_PROGRESS','RESOLVED','ESCALATED'].map((s) => (
                <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Category */}
          <Select value={filters.category || '__ALL__'} onValueChange={(v) => setFilter('category', v)}>
            <SelectTrigger className="w-36 text-xs h-8">
              <SelectValue placeholder="All Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Category</SelectItem>
              {['ELECTRICAL','PLUMBING','HVAC','IT_SUPPORT','SECURITY','OTHER'].map((c) => (
                <SelectItem key={c} value={c}>{c.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Priority */}
          <Select value={filters.priority || '__ALL__'} onValueChange={(v) => setFilter('priority', v)}>
            <SelectTrigger className="w-32 text-xs h-8">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Priority</SelectItem>
              {['LOW','MEDIUM','HIGH','CRITICAL'].map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {user?.role === 'admin' && (
          <Link to="/analytics" className="btn-secondary text-xs px-3 py-1.5 gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> Analytics
          </Link>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">{[1,2,3,4].map((i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}</div>
      ) : complaints.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-sm font-medium text-surface-700">No complaints found</p>
          <p className="text-xs text-surface-400 mt-1">Try adjusting your filters</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID / Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Submitted by</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((c) => (
                <TableRow
                  key={c._id}
                  className="cursor-pointer"
                  onClick={() => (window.location.href = `/complaint/${c._id}`)}
                >
                  <TableCell>
                    <span className="text-2xs font-mono text-surface-400">#{c.complaintId}</span>
                    <p className="font-medium text-surface-900 text-xs mt-0.5 truncate max-w-xs">{c.title}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-surface-500">{c.category?.replace('_', ' ')}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[c.status]}>{c.status?.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={PRIORITY_VARIANT[c.priority]}>{c.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-surface-600">{c.submittedBy?.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-surface-400">
                      {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
