import React, { useState, useEffect } from 'react';
import { QrCode, KeyRound, ArrowLeft, Search } from 'lucide-react';
import { ViewType } from '../types';
import { storage } from '../utils/storage';

interface CheckinPageProps {
  onViewChange: (view: ViewType, data?: any) => void;
  initialEntryId?: string;
}

export const CheckinPage: React.FC<CheckinPageProps> = ({ onViewChange, initialEntryId }) => {
  const [entryId, setEntryId] = useState(initialEntryId || '');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialEntryId) {
      handleCheckin(initialEntryId);
    }
  }, [initialEntryId]);

  const handleCheckin = async (id: string) => {
    if (!id.trim()) {
      setError('Please enter your Entry ID');
      return;
    }

    setIsChecking(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const guest = storage.findGuestByEntryId(id.trim().toUpperCase());
    
    if (!guest) {
      setIsChecking(false);
      onViewChange('checkin-error', { entryId: id });
      return;
    }

    // Update attendance status
    const success = storage.updateGuest(guest.entryId, {
      attending: true,
      checkedInAt: new Date().toISOString()
    });

    setIsChecking(false);
    
    if (success) {
      onViewChange('checkin-success', guest);
    } else {
      onViewChange('checkin-error', { entryId: id });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheckin(entryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Event Check-in
            </h1>
            <p className="text-gray-600">
              Enter your Entry ID to check in to the event
            </p>
          </div>

          {/* Check-in Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="entryId" className="block text-sm font-medium text-gray-700 mb-2">
                  Entry ID
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="entryId"
                    value={entryId}
                    onChange={(e) => {
                      setEntryId(e.target.value.toUpperCase());
                      setError('');
                    }}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors font-mono text-center text-lg tracking-wider ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your Entry ID"
                    maxLength={9}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isChecking || !entryId.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isChecking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Checking in...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Check In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 text-center mb-4">
                Don't have your Entry ID?
              </p>
              <div className="space-y-2 text-xs text-gray-500">
                <p>• Check your confirmation email</p>
                <p>• Look for the 9-character code (e.g., ABC123XYZ)</p>
                <p>• Contact event staff for assistance</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onViewChange('landing')}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Registration</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};