export interface Guest {
  id: string;
  name: string;
  email: string;
  entryId: string;
  attending: boolean;
  registeredAt: string;
  checkedInAt?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export type ViewType = 'landing' | 'confirmation' | 'checkin' | 'admin-login' | 'admin-dashboard' | 'checkin-success' | 'checkin-error';