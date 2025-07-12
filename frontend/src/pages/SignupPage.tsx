// src/pages/SignupPage.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../components/layout/AuthLayout';

// Icon components
const UserIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const ShopIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>);
const EmailIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const PhoneIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>);
const LockIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>);
const PinIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);

export const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', shopName: '', email: '', phone: '', password: '', pincode: '' });
  const [shopImageFile, setShopImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setShopImageFile(e.target.files[0]);
    }
  };

  // --- UPDATED SIGNUP LOGIC ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (Object.values(formData).some(value => !value)) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    let imageUrl = '';

    // --- Step 1: Upload the image if it exists ---
    if (shopImageFile) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', shopImageFile);

        const uploadResponse = await axios.post('http://localhost:3000/api/upload', imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = uploadResponse.data.url;
      } catch (uploadError) {
        setError('Image upload failed. Please try again.');
        setLoading(false);
        return;
      }
    }

    // --- Step 2: Register the shopkeeper with all data ---
    try {
      const finalData = {
        ...formData,
        shopImage: imageUrl, // Add the image URL to the final data
      };

      await axios.post('http://localhost:3000/api/auth/register', finalData);
      
      navigate('/login', { 
        state: { message: 'Account created successfully! Please log in.' }
      });

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.msg || 'An error occurred during registration.');
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
            <h2 className="text-3xl font-bold text-gray-800">Create Your Shop</h2>
            <p className="text-gray-500 mt-2">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-orange-500 hover:text-orange-600">
                    Sign in here
                </Link>
            </p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSignup}>
            <Input id="name" name="name" type="text" label="Full Name" required value={formData.name} onChange={handleInputChange('name')} icon={<UserIcon />} />
            <Input id="shopName" name="shopName" type="text" label="Shop Name" required value={formData.shopName} onChange={handleInputChange('shopName')} icon={<ShopIcon />} />
            <Input id="email" name="email" type="email" label="Email Address" required value={formData.email} onChange={handleInputChange('email')} icon={<EmailIcon />} />
            <Input id="phone" name="phone" type="tel" label="Phone Number" required value={formData.phone} onChange={handleInputChange('phone')} icon={<PhoneIcon />} />
            <Input id="password" name="password" type="password" label="Password" required value={formData.password} onChange={handleInputChange('password')} icon={<LockIcon />} />
            <Input id="pincode" name="pincode" type="text" label="Shop Pincode" required value={formData.pincode} onChange={handleInputChange('pincode')} icon={<PinIcon />} maxLength={6} />
            
            {/* File Input for Shop Image */}
            <div>
              <label htmlFor="shopImage" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Shop Image (Optional)
              </label>
              <input
                id="shopImage"
                name="shopImage"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-orange-50 file:text-orange-700
                  hover:file:bg-orange-100"
              />
              {shopImageFile && <p className="text-xs text-gray-500 mt-1">Selected: {shopImageFile.name}</p>}
            </div>
            
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="pt-2">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </div>

            <p className="text-xs text-gray-500 text-center pt-2">
              By creating an account, you agree to our{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">Terms</a>
              {' & '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">Policy</a>.
            </p>
        </form>
    </AuthLayout>
  );
};
