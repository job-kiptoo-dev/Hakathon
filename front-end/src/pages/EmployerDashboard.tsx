import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EmployerDashboardHome } from '@/components/employer/EmployerDashboardHome';
import { JobListingsPage } from '@/components/employer/JobListingsPage';
import { CandidatesPage } from '@/components/employer/CandidatesPage';
import { InterviewsPage } from '@/components/employer/InterviewsPage';
import { CompanyPage } from '@/components/employer/CompanyPage';

export default function EmployerDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employer/dashboard" replace />} />
      <Route path="/dashboard" element={<EmployerDashboardHome />} />
      <Route path="/jobs" element={<JobListingsPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/interviews" element={<InterviewsPage />} />
      <Route path="/company" element={<CompanyPage />} />
    </Routes>
  );
}
