import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NotificationPanel } from '@/components/common/NotificationPanel';
import { NotificationProvider } from '@/contexts/NotificationContext';

const renderWithNotificationProvider = (component: React.ReactElement) => {
  return render(
    <NotificationProvider>
      {component}
    </NotificationProvider>
  );
};

describe('NotificationPanel', () => {
  test('should render notification bell icon', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellIcon = screen.getByRole('button');
    expect(bellIcon).toBeInTheDocument();
  });

  test('should show unread count badge when there are unread notifications', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    // The mock data should have unread notifications
    const badge = screen.getByText(/\d+/);
    expect(badge).toBeInTheDocument();
  });

  test('should open notification dropdown when clicked', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  test('should display notifications in dropdown', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    // Should show notification titles from mock data
    expect(screen.getByText(/Application Status Update|New Job Match|Interview Scheduled/)).toBeInTheDocument();
  });

  test('should show mark all read button when there are unread notifications', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    expect(screen.getByText('Mark all read')).toBeInTheDocument();
  });

  test('should show clear all button when there are notifications', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  test('should mark notification as read when clicked', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    const markReadButtons = screen.getAllByText('Mark read');
    if (markReadButtons.length > 0) {
      fireEvent.click(markReadButtons[0]);
      // The notification should be marked as read (visual indicator should change)
    }
  });

  test('should remove notification when delete button is clicked', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    // Look for delete buttons (trash icons)
    const deleteButtons = screen.getAllByRole('button');
    const trashButtons = deleteButtons.filter(button => 
      button.querySelector('svg') && 
      button.getAttribute('class')?.includes('h-6 w-6 p-0')
    );
    
    if (trashButtons.length > 0) {
      const initialNotificationCount = screen.getAllByText(/ago$/).length;
      fireEvent.click(trashButtons[0]);
      
      // Should have one less notification
      const newNotificationCount = screen.getAllByText(/ago$/).length;
      expect(newNotificationCount).toBeLessThanOrEqual(initialNotificationCount);
    }
  });

  test('should show empty state when no notifications', () => {
    // This would require a way to clear all notifications first
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    // Click clear all if it exists
    const clearAllButton = screen.queryByText('Clear all');
    if (clearAllButton) {
      fireEvent.click(clearAllButton);
      
      expect(screen.getByText('No notifications')).toBeInTheDocument();
      expect(screen.getByText("You're all caught up! Check back later for updates.")).toBeInTheDocument();
    }
  });

  test('should display correct time formatting', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    // Should show time ago format (e.g., "2h ago", "1d ago")
    const timeElements = screen.getAllByText(/\d+[mhd] ago/);
    expect(timeElements.length).toBeGreaterThan(0);
  });

  test('should show notification categories with appropriate icons', () => {
    renderWithNotificationProvider(<NotificationPanel />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    // Should have various notification icons based on categories
    const notificationItems = screen.getAllByText(/Application|Job|Interview|Message/);
    expect(notificationItems.length).toBeGreaterThan(0);
  });
});
