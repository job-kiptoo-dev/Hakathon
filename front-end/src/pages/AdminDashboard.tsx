import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminDashboardHome } from '@/components/admin/AdminDashboardHome';
import { UserManagementPage } from '@/components/admin/UserManagementPage';
import { ContentModerationPage } from '@/components/admin/ContentModerationPage';
import { AnalyticsPage } from '@/components/admin/AnalyticsPage';
import { AdminJobsPage } from '@/components/admin/AdminJobsPage';
import { AdminReportsPage } from '@/components/admin/AdminReportsPage';

export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboardHome />} />
      <Route path="/users" element={<UserManagementPage />} />
      <Route path="/jobs" element={<AdminJobsPage />} />
      <Route path="/moderation" element={<ContentModerationPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/reports" element={<AdminReportsPage />} />
    </Routes>
  );
}
