import React from 'react';
import { XCircle, AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { ViewType } from '../types';

interface CheckinErrorProps {
  entryId: string;
  onViewChange: (view: ViewType) => void;
}

export const CheckinError: React.FC<CheckinErrorProps> = ({ entryId, onViewChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Error Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Entry Not Found
            </h1>
            <p className="text-lg text-gray-600">
              We couldn't find a registration with this Entry ID
            </p>
          </div>

          {/* Error Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">
                Entry ID attempted:
              </p>
              <p className="text-2xl font-mono font-bold text-red-600 bg-red-50 py-3 px-4 rounded-lg">
                {entryId}
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-900 mb-1">
                    Possible Issues
                  </h3>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Entry ID may be incorrect or mistyped</li>
                    <li>• Registration may not be complete</li>
                    <li>• Entry ID may have expired</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <h4 className="font-medium text-gray-900">What to do next:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Double-check your Entry ID from the confirmation email
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Make sure you're entering all 9 characters correctly
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Contact event staff if you need assistance
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => onViewChange('checkin')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            
            <button
              onClick={() => onViewChange('landing')}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Register for Event</span>
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Need help? Contact event support:
            </p>
            <p className="text-sm font-medium text-gray-700">
              support@techinnovationsummit.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};