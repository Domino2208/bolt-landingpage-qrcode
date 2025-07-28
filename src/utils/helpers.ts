import { Guest } from '../types';

export const generateEntryId = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const generateQRCodeUrl = (entryId: string): string => {
  const baseUrl = window.location.origin;
  const checkinUrl = `${baseUrl}?checkin=${entryId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(checkinUrl)}`;
};

export const exportToCSV = (guests: Guest[]): void => {
  const headers = ['Name', 'Email', 'Entry ID', 'Registered At', 'Attending', 'Checked In At'];
  const csvContent = [
    headers.join(','),
    ...guests.map(guest => [
      `"${guest.name}"`,
      `"${guest.email}"`,
      guest.entryId,
      guest.registeredAt,
      guest.attending ? 'Yes' : 'No',
      guest.checkedInAt || 'Not checked in'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `event_guests_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};