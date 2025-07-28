import React from 'react';
import { CheckCircle, Mail, QrCode, Calendar, ArrowLeft } from 'lucide-react';
import { Guest, ViewType } from '../types';
import { generateQRCodeUrl } from '../utils/helpers';

interface ConfirmationPageProps {
  guest: Guest;
  onViewChange: (view: ViewType) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ guest, onViewChange }) => {
  const qrCodeUrl = generateQRCodeUrl(guest.entryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for registering, {guest.name}. Your spot is confirmed!
            </p>
          </div>

          {/* Registration Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Event Details
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Tech Innovation Summit 2024</p>
                  <p className="text-sm text-gray-600">December 15, 2024 • 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Confirmation Email</p>
                  <p className="text-sm text-gray-600">Sent to {guest.email}</p>
                </div>
              </div>
            </div>

            {/* Entry ID Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Entry ID
              </h3>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-sm text-blue-800 mb-2">Present this ID at the event entrance:</p>
                <p className="text-3xl font-mono font-bold text-blue-900 tracking-wider">
                  {guest.entryId}
                </p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Quick Check-in QR Code
              </h3>
              <div className="text-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Check-in QR Code" 
                  className="mx-auto mb-4 border rounded-lg"
                />
                <p className="text-sm text-gray-600">
                  Scan this QR code at the event for quick check-in
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Save your Entry ID or take a screenshot of this page
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Check your email for additional event information
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Arrive 15 minutes early for smooth check-in
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onViewChange('landing')}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Registration</span>
            </button>
            
            <button
              onClick={() => onViewChange('checkin')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Test Check-in Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};