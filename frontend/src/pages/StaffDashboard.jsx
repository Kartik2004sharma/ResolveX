import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CheckCircle2, Clock, ArrowUpCircle, Building2 } from 'lucide-react';

const STATUS_VARIANT   = { PENDING: 'pending', IN_PROGRESS: 'progress', RESOLVED: 'resolved', ESCALATED: 'escalated' };
const PRIORITY_VARIANT = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical' };

export default function StaffDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [updating, setUpdating]     = useState(null); // complaint id being updated

  useEffect(() => { fetchComplaints(); }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await api.get('/complaints');
      setComplaints(res.data.complaints);
    } catch { toast.error('Failed to load complaints'); }
    finally { setLoading(false); }
  };

  const quickUpdate = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/complaints/${id}`, { status });
      toast.success(`Marked ${status.replace('_', ' ')}`);
      fetchComplaints();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(null);
    }
  };

  // Counts
  const pending    = complaints.filter((c) => c.status === 'PENDING').length;
  const inProgress = complaints.filter((c) => c.status === 'IN_PROGRESS').length;
  const escalated  = complaints.filter((c) => c.status === 'ESCALATED').length;
  const resolved   = complaints.filter((c) => c.status === 'RESOLVED').length;

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-surface-900">
            My Queue
            <span className="ml-2 text-xs font-normal text-surface-400">({user?.department?.replace('_', ' ')} Dept.)</span>
          </h2>
          <p className="text-xs text-surface-400 mt-0.5">Complaints assigned to you or your department</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500 border border-surface-200 rounded-lg px-2.5 py-1.5">
          <Building2 className="w-3.5 h-3.5" />
          {user?.department?.replace('_', ' ')}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending',     value: pending,    color: 'text-warning',   icon: <Clock className="w-4 h-4 text-warning" /> },
          { label: 'In Progress', value: inProgress, color: 'text-info',      icon: <ArrowUpCircle className="w-4 h-4 text-info" /> },
          { label: 'Escalated',   value: escalated,  color: 'text-danger',    icon: <ArrowUpCircle className="w-4 h-4 text-danger" /> },
          { label: 'Resolved',    value: resolved,   color: 'text-success',   icon: <CheckCircle2 className="w-4 h-4 text-success" /> },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider">{s.label}</p>
                {s.icon}
              </div>
              <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complaint table */}
      {loading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}</div>
      ) : complaints.length === 0 ? (
        <Card className="p-12 text-center">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-3" />
          <p className="text-sm font-medium text-surface-700">All clear!</p>
          <p className="text-xs text-surface-400 mt-1">No complaints assigned to you right now</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((c) => {
                const slaOk = c.slaDeadline && new Date(c.slaDeadline) > new Date();
                const isUpdating = updating === c._id;
                return (
                  <TableRow key={c._id}>
                    <TableCell>
                      <Link to={`/complaint/${c._id}`} className="hover:text-primary-600 transition-colors">
                        <span className="text-2xs font-mono text-surface-400">#{c.complaintId}</span>
                        <p className="font-medium text-surface-900 text-xs mt-0.5 max-w-[200px] truncate">{c.title}</p>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={PRIORITY_VARIANT[c.priority]}>{c.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[c.status]}>{c.status?.replace('_', ' ')}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-surface-500 max-w-[120px] truncate block">{c.location}</span>
                    </TableCell>
                    <TableCell>
                      {c.slaDeadline ? (
                        <span className={`text-xs font-medium ${slaOk ? 'text-success' : 'text-danger'}`}>
                          {slaOk
                            ? `${Math.ceil((new Date(c.slaDeadline) - new Date()) / 3600000)}h left`
                            : 'Overdue'}
                        </span>
                      ) : <span className="text-xs text-surface-400">—</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 justify-end">
                        {c.status === 'PENDING' && (
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2"
                            disabled={isUpdating}
                            onClick={() => quickUpdate(c._id, 'IN_PROGRESS')}>
                            Start
                          </Button>
                        )}
                        {c.status !== 'RESOLVED' && c.status !== 'ESCALATED' && (
                          <Button size="sm" className="h-7 text-xs px-2 bg-success hover:bg-success-dark"
                            disabled={isUpdating}
                            onClick={() => quickUpdate(c._id, 'RESOLVED')}>
                            {isUpdating ? '…' : 'Resolve'}
                          </Button>
                        )}
                        <Link to={`/complaint/${c._id}`} className="btn-ghost text-xs h-7 px-2 flex items-center rounded-md">
                          View
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
