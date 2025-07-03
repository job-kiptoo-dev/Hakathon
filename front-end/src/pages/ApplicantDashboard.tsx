import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ApplicantDashboardHome } from '@/components/applicant/ApplicantDashboardHome';
import { JobSearchPage } from '@/components/applicant/JobSearchPage';
import { JobDetailsPage } from '@/components/applicant/JobDetailsPage';
import { ApplicationsPage } from '@/components/applicant/ApplicationsPage';
import { ProfilePage } from '@/components/applicant/ProfilePage';
import { InterviewPrepPage } from '@/components/applicant/InterviewPrepPage';

export default function ApplicantDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/applicant/dashboard" replace />} />
      <Route path="/dashboard" element={<ApplicantDashboardHome />} />
      <Route path="/jobs" element={<JobSearchPage />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<ProfilePage />} />
      <Route path="/interviews" element={<InterviewPrepPage />} />
    </Routes>
  );
}