import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Hash, Save, CheckCircle2, Edit3, ShieldCheck } from 'lucide-react';

export default function UserProfile({ userProfile, onSaveProfile }) {
  const [formData, setFormData] = useState(userProfile || {
    name: 'Ilakkiyan',
    email: 'ilakkiyan@gmail.com',
    age: '24',
    dob: '2002-05-15',
    gender: 'Male',
    isSaved: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(!userProfile?.isSaved);

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...formData, isSaved: true };
    onSaveProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-6"
    >
      {/* Profile Card Header */}
      <div className="glass-card-saas p-6 sm:p-8 rounded-3xl border-2 border-sky-300 shadow-xl flex flex-col gap-4 relative overflow-hidden bg-white">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-600 text-white font-black shadow-lg">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                Applicant User Profile
              </h2>
              <p className="text-xs text-slate-800 font-extrabold">
                Manage your personal details for loan eligibility verification
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-black transition shadow-sm cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {/* Save Success Alert */}
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-black text-sm flex items-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Profile details saved successfully!</span>
          </motion.div>
        )}

        {/* Form or Saved View */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-950">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-5 h-5 absolute left-3.5 text-sky-600" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-black focus:outline-none focus:border-sky-500 shadow-inner"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-950">
                Gmail / Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 absolute left-3.5 text-sky-600" />
                <input
                  type="email"
                  required
                  placeholder="user@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-black focus:outline-none focus:border-sky-500 shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Age */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-950">
                  Age
                </label>
                <div className="relative flex items-center">
                  <Hash className="w-5 h-5 absolute left-3.5 text-sky-600" />
                  <input
                    type="number"
                    required
                    min="18"
                    max="100"
                    placeholder="24"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-black focus:outline-none focus:border-sky-500 shadow-inner"
                  />
                </div>
              </div>

              {/* Date of Birth (DOB) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-950">
                  Date of Birth (DOB)
                </label>
                <div className="relative flex items-center">
                  <Calendar className="w-5 h-5 absolute left-3.5 text-sky-600" />
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-black focus:outline-none focus:border-sky-500 shadow-inner"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-950">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-black focus:outline-none focus:border-sky-500 shadow-inner cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-4 rounded-2xl btn-saas-gradient text-white font-black text-lg shadow-xl flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>SAVE PROFILE</span>
            </motion.button>

          </form>
        ) : (
          /* Saved Verified Applicant Card View */
          <div className="flex flex-col gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-300 flex flex-col gap-4 shadow-sm">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <span className="text-xs font-black uppercase text-sky-800 tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  VERIFIED APPLICANT ID CARD
                </span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Active User
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-700 font-bold block">Full Name</span>
                  <span className="font-black text-slate-950 text-base">{formData.name}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-700 font-bold block">Gmail Address</span>
                  <span className="font-black text-sky-800">{formData.email}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-700 font-bold block">Age & Gender</span>
                  <span className="font-black text-slate-900">{formData.age} yrs • {formData.gender}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-700 font-bold block">Date of Birth (DOB)</span>
                  <span className="font-mono font-black text-purple-900">{formData.dob}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
