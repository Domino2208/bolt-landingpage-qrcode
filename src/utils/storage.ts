import { Guest } from '../types';

const STORAGE_KEY = 'event_guests';
const ADMIN_SESSION_KEY = 'admin_session';

export const storage = {
  // Guest management
  getGuests(): Guest[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveGuest(guest: Guest): void {
    const guests = this.getGuests();
    guests.push(guest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  },

  updateGuest(entryId: string, updates: Partial<Guest>): boolean {
    const guests = this.getGuests();
    const index = guests.findIndex(g => g.entryId === entryId);
    if (index !== -1) {
      guests[index] = { ...guests[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
      return true;
    }
    return false;
  },

  findGuestByEntryId(entryId: string): Guest | null {
    const guests = this.getGuests();
    return guests.find(g => g.entryId === entryId) || null;
  },

  deleteGuest(entryId: string): boolean {
    const guests = this.getGuests();
    const filtered = guests.filter(g => g.entryId !== entryId);
    if (filtered.length !== guests.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  // Admin session management
  setAdminSession(isLoggedIn: boolean): void {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(isLoggedIn));
  },

  getAdminSession(): boolean {
    const data = localStorage.getItem(ADMIN_SESSION_KEY);
    return data ? JSON.parse(data) : false;
  },

  clearAdminSession(): void {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
};