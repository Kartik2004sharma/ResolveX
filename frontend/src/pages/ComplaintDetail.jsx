import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, Clock, UserCircle2, Image as ImageIcon } from 'lucide-react';

const STATUS_VARIANT   = { PENDING: 'pending', IN_PROGRESS: 'progress', RESOLVED: 'resolved', ESCALATED: 'escalated' };
const PRIORITY_VARIANT = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical' };
const TL_COLORS        = { PENDING: 'bg-warning', IN_PROGRESS: 'bg-info', RESOLVED: 'bg-success', ESCALATED: 'bg-danger' };

export default function ComplaintDetail() {
  const { id }   = useParams();
  const { user } = useAuth();
  const [complaint, setComplaint]   = useState(null);
  const [loading, setLoading]       = useState(true);
  const [status, setStatus]         = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [note, setNote]             = useState('');
  const [staff, setStaff]           = useState([]);
  const [updating, setUpdating]     = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'staff';

  useEffect(() => {
    fetchComplaint();
    if (isAdmin) fetchStaff();
  }, [id, isAdmin]);

  const fetchComplaint = async () => {
    try {
      const res = await api.get(`/complaints/${id}`);
      setComplaint(res.data.complaint);
      setStatus(res.data.complaint.status);
      setAssignedTo(res.data.complaint.assignedTo?._id || '');
    } catch { toast.error('Failed to load complaint'); }
    finally { setLoading(false); }
  };

  const fetchStaff = async () => {
    try {
      const res = await api.get('/users/staff').catch(() => api.get('/users'));
      setStaff(res.data?.staff || res.data?.users || []);
    } catch { setStaff([]); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.patch(`/complaints/${id}`, {
        status:     status || undefined,
        assignedTo: assignedTo || undefined,
        note:       note || undefined,
      });
      toast.success('Updated successfully');
      setNote('');
      fetchComplaint();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !complaint) {
    return (
      <div className="max-w-3xl space-y-3">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-4">
      {/* Back */}
      <Link
        to={user?.role === 'student' ? '/dashboard' : user?.role === 'staff' ? '/staff' : '/admin'}
        className="inline-flex items-center gap-1.5 text-xs text-surface-500 hover:text-surface-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </Link>

      {/* Header card */}
      <Card>
        <CardContent className="p-5 space-y-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="text-2xs font-mono text-surface-400">#{complaint.complaintId}</span>
              <h2 className="text-base font-semibold text-surface-900 mt-1">{complaint.title}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant={STATUS_VARIANT[complaint.status]}>{complaint.status?.replace('_', ' ')}</Badge>
                <Badge variant={PRIORITY_VARIANT[complaint.priority]}>{complaint.priority}</Badge>
                <Badge variant="outline">{complaint.category?.replace('_', ' ')}</Badge>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xs text-surface-400">
                {new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              {complaint.slaDeadline && (
                <p className="text-2xs text-surface-400 mt-0.5 flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" />
                  SLA: {new Date(complaint.slaDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm text-surface-700 leading-relaxed">{complaint.description}</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm text-surface-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-surface-400" /> {complaint.location}
                </p>
              </div>
              {complaint.submittedBy && (
                <div>
                  <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Submitted by</p>
                  <p className="text-sm text-surface-700 flex items-center gap-1">
                    <UserCircle2 className="w-3.5 h-3.5 text-surface-400" />
                    {complaint.submittedBy.name}
                    <span className="text-surface-400 text-xs">· {complaint.submittedBy.email}</span>
                  </p>
                </div>
              )}
              {complaint.assignedTo && (
                <div>
                  <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Assigned to</p>
                  <p className="text-sm text-surface-700">
                    {complaint.assignedTo.name}
                    <span className="text-surface-400 ml-1">· {complaint.assignedTo.department}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Attachment */}
          {complaint.image && (
            <>
              <Separator />
              <div>
                <p className="text-2xs font-semibold text-surface-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Attachment
                </p>
                <img src={complaint.image} alt="Complaint" className="max-w-sm rounded-lg border border-surface-200 shadow-sm" />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Admin / Staff controls */}
      {isAdmin && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Update complaint</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div className="flex flex-wrap gap-3 items-end">
                {/* Status */}
                <div className="space-y-1">
                  <label className="text-2xs text-surface-500">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['PENDING','IN_PROGRESS','RESOLVED','ESCALATED'].map((s) => (
                        <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Assign */}
                <div className="space-y-1">
                  <label className="text-2xs text-surface-500">Assign to</label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger className="w-44 h-8 text-xs">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {staff.map((s) => (
                        <SelectItem key={s._id} value={s._id}>{s.name} · {s.department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Resolution note */}
              <div className="space-y-1">
                <label className="text-2xs text-surface-500">Note <span className="text-surface-400 font-normal">(shown in timeline)</span></label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="text-xs resize-none"
                  placeholder="Add a resolution note or internal comment…"
                />
              </div>

              <Button type="submit" disabled={updating} size="sm">
                {updating ? 'Saving…' : 'Save changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Activity timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-surface-200" />
            <div className="space-y-4">
              {complaint.timeline?.map((t, i) => (
                <div key={i} className="flex gap-3 relative">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 z-10 ${TL_COLORS[t.status] || 'bg-surface-300'}`} />
                  <div className="pb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-surface-800">{t.status?.replace('_', ' ')}</span>
                      <span className="text-2xs text-surface-400">{t.updatedBy?.name || 'System'}</span>
                    </div>
                    {t.note && <p className="text-xs text-surface-500 mt-0.5">{t.note}</p>}
                    <p className="text-2xs text-surface-400 mt-0.5">
                      {t.timestamp
                        ? new Date(t.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
