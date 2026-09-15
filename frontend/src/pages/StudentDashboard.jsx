import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Skeleton } from '../components/ui/skeleton';
import toast from 'react-hot-toast';
import { PlusCircle, FileText, MapPin, Calendar } from 'lucide-react';

const STATUS_TABS = [
  { value: '',            label: 'All' },
  { value: 'PENDING',     label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED',    label: 'Resolved' },
  { value: 'ESCALATED',   label: 'Escalated' },
];

const STATUS_VARIANT = {
  PENDING: 'pending', IN_PROGRESS: 'progress', RESOLVED: 'resolved', ESCALATED: 'escalated',
};
const PRIORITY_VARIANT = {
  LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical',
};

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState('');

  useEffect(() => { fetchComplaints(); }, [filter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = filter ? { status: filter } : {};
      const res = await api.get('/complaints', { params });
      setComplaints(res.data.complaints);
    } catch {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  // Summary counts
  const counts = complaints.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-surface-900">My Complaints</h2>
          <p className="text-xs text-surface-400 mt-0.5">{complaints.length} total</p>
        </div>
        <Link to="/complaint/new" className="btn-primary text-xs px-3 py-1.5 gap-1">
          <PlusCircle className="w-3.5 h-3.5" /> New
        </Link>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending',     key: 'PENDING',     color: 'text-warning' },
          { label: 'In Progress', key: 'IN_PROGRESS', color: 'text-info' },
          { label: 'Resolved',    key: 'RESOLVED',    color: 'text-success' },
          { label: 'Escalated',   key: 'ESCALATED',   color: 'text-danger' },
        ].map((s) => (
          <Card key={s.key} className="p-4">
            <CardContent className="p-0">
              <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 tabular-nums ${s.color}`}>{counts[s.key] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs filter */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          {STATUS_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </div>
          ) : complaints.length === 0 ? (
            <Card className="empty-state">
              <CardContent className="p-0 flex flex-col items-center py-16">
                <div className="empty-state-icon"><FileText className="w-5 h-5" /></div>
                <p className="text-sm font-medium text-surface-700">No complaints yet</p>
                <p className="text-xs text-surface-400 mt-1 mb-4">Submit your first complaint to get started</p>
                <Link to="/complaint/new" className="btn-primary text-xs px-4 py-2">Submit a complaint</Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {complaints.map((c) => (
                <Link key={c._id} to={`/complaint/${c._id}`} className="card-hover block p-4 group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xs font-mono text-surface-400">#{c.complaintId}</span>
                        <span className="text-2xs text-surface-300">·</span>
                        <span className="text-2xs text-surface-400">{c.category?.replace('_', ' ')}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-surface-900 group-hover:text-primary-700 transition-colors truncate">{c.title}</h3>
                      <p className="text-xs text-surface-500 mt-1 line-clamp-1">{c.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={STATUS_VARIANT[c.status]}>{c.status?.replace('_', ' ')}</Badge>
                      <Badge variant={PRIORITY_VARIANT[c.priority]}>{c.priority}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                    <span className="text-2xs text-surface-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{c.location}
                    </span>
                    <div className="flex items-center gap-3 text-2xs text-surface-400">
                      {c.assignedTo && <span>→ {c.assignedTo.name}</span>}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
