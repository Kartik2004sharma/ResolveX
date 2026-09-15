import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success('Welcome back!');
      navigate(u.role === 'student' ? '/dashboard' : u.role === 'staff' ? '/staff' : '/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
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
            <CardTitle className="text-white text-lg">Welcome back</CardTitle>
            <CardDescription className="text-surface-500">Sign in to your campus account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Email address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@campus.edu"
                  required
                  className="bg-surface-800 border-surface-700 text-white placeholder:text-surface-600 focus-visible:ring-primary-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-surface-800 border-surface-700 text-white placeholder:text-surface-600 focus-visible:ring-primary-500"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-1 bg-brand-green text-brand-dark hover:bg-brand-green/90 font-semibold">
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
            <p className="mt-5 text-center text-xs text-surface-500">
              No account?{' '}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">Create one</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
