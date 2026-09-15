import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Shield } from 'lucide-react';

const DEPARTMENTS = [
  { value: 'ELECTRICAL', label: 'Electrical' },
  { value: 'PLUMBING',   label: 'Plumbing' },
  { value: 'HVAC',       label: 'HVAC' },
  { value: 'IT_SUPPORT', label: 'IT Support' },
  { value: 'SECURITY',   label: 'Security' },
  { value: 'GENERAL',    label: 'General' },
];

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student', studentId: '', department: 'GENERAL',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const handleChange = (e) => set(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const u = await register({
        name: form.name, email: form.email, password: form.password,
        role: form.role,
        studentId:  form.role === 'student' ? form.studentId  : undefined,
        department: form.role === 'staff'   ? form.department : undefined,
      });
      toast.success('Account created!');
      navigate(u.role === 'student' ? '/dashboard' : u.role === 'staff' ? '/staff' : '/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'bg-surface-800 border-surface-700 text-white placeholder:text-surface-600 focus-visible:ring-primary-500';

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-dark" />
            </div>
            <span className="font-display font-bold text-white text-lg">ResolveX</span>
          </Link>
        </div>

        <Card className="bg-surface-900 border-surface-800 shadow-modal">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg">Create account</CardTitle>
            <CardDescription className="text-surface-500">Join your campus on ResolveX</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Full name</label>
                <Input name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Email address</label>
                <Input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@campus.edu" className={inputCls} />
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Role</label>
                <Select value={form.role} onValueChange={(v) => set('role', v)}>
                  <SelectTrigger className={inputCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.role === 'student' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-surface-400">Student ID <span className="text-surface-600">(optional)</span></label>
                  <Input name="studentId" value={form.studentId} onChange={handleChange} placeholder="STU001" className={inputCls} />
                </div>
              )}
              {form.role === 'staff' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-surface-400">Department</label>
                  <Select value={form.department} onValueChange={(v) => set('department', v)}>
                    <SelectTrigger className={inputCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Password</label>
                <Input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="••••••••" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Confirm password</label>
                <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••" className={inputCls} />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-brand-green text-brand-dark hover:bg-brand-green/90 font-semibold">
                {loading ? 'Creating account…' : 'Create account →'}
              </Button>
            </form>
            <p className="mt-5 text-center text-xs text-surface-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
