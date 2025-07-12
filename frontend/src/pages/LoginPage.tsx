import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../components/layout/AuthLayout';

// Icon components
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // IMPORTANT: Make sure your backend API is running on port 3001
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      localStorage.setItem('shopkeeperToken', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.msg || 'Invalid email or password.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500 mt-2">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-orange-500 hover:text-orange-600">
                    Create one now
                </Link>
            </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
            {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center text-sm text-green-700">
                    {successMessage}
                </div>
            )}
            
            <Input 
                id="email" 
                name="email" 
                type="email" 
                label="Email Address" 
                required 
                value={formData.email} 
                onChange={handleInputChange('email')}
                icon={<EmailIcon />}
            />
            
            <Input 
                id="password" 
                name="password" 
                type="password" 
                label="Password" 
                required 
                value={formData.password} 
                onChange={handleInputChange('password')}
                icon={<LockIcon />}
            />

            <div className="flex items-center justify-end text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">
                    Forgot your password?
                </a>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="pt-2">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>
            </div>
        </form>
    </AuthLayout>
  );
};