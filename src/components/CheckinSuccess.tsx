import React from 'react';
import { CheckCircle, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Guest, ViewType } from '../types';
import { formatDate } from '../utils/helpers';

interface CheckinSuccessProps {
  guest: Guest;
  onViewChange: (view: ViewType) => void;
}

export const CheckinSuccess: React.FC<CheckinSuccessProps> = ({ guest, onViewChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Event!
            </h1>
            <p className="text-lg text-gray-600">
              Check-in successful
            </p>
          </div>

          {/* Guest Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Hello, {guest.name}!
              </h2>
              <p className="text-gray-600">
                You're all set for the event
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Status: Checked In</p>
                  <p className="text-sm text-green-700">Entry ID: {guest.entryId}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Tech Innovation Summit 2024</p>
                  <p className="text-sm text-gray-600">December 15, 2024</p>
                </div>
              </div>

              {guest.checkedInAt && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Check-in Time</p>
                    <p className="text-sm text-gray-600">{formatDate(guest.checkedInAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Information */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">Event Information</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Registration desk closes at 10:00 AM</li>
              <li>• Keynote presentation starts at 10:30 AM</li>
              <li>• Lunch will be served from 12:30 PM - 1:30 PM</li>
              <li>• Networking session begins at 5:00 PM</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => onViewChange('checkin')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Check In Another Guest
            </button>
            
            <button
              onClick={() => onViewChange('landing')}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Registration</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};