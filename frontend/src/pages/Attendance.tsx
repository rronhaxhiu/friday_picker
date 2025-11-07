import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { storage } from '../lib/storage';

export default function Attendance() {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    loadAttendance();
  }, [currentUser, navigate]);

  const loadAttendance = async () => {
    if (!currentUser) return;
    
    try {
      const attendanceData = await api.getAttendance();
      const userAttendance = attendanceData.attendance.find(
        (a: any) => a.id === currentUser.id
      );
      setIsAttending(userAttendance?.is_attending === 1);
    } catch (error) {
      console.error('Failed to load attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceSelect = async (attending: boolean) => {
    if (!currentUser) return;
    
    try {
      await api.updateAttendance(currentUser.id, attending);
      setIsAttending(attending);
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Failed to update attendance:', error);
      alert('Failed to update attendance. Please try again.');
    }
  };

  const handleLogout = () => {
    storage.clearCurrentUser();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Switch User
            </button>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Hey, {currentUser?.name}! 👋
          </h1>
          <p className="text-3xl text-gray-700 mb-2">
            Are you coming this Friday?
          </p>
          <p className="text-lg text-gray-500">
            Let your friends know if you'll be joining
          </p>
        </div>

        {/* Attendance Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleAttendanceSelect(true)}
            className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 hover:scale-105 hover:-translate-y-1 ${
              isAttending === true ? 'ring-4 ring-green-500' : ''
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-6 group-hover:scale-110 transition-transform">
                ✅
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Yes, I'm in!
              </h2>
              <p className="text-gray-600">
                Count me in for Friday
              </p>
            </div>
          </button>

          <button
            onClick={() => handleAttendanceSelect(false)}
            className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-12 hover:scale-105 hover:-translate-y-1 ${
              isAttending === false ? 'ring-4 ring-red-500' : ''
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-6 group-hover:scale-110 transition-transform">
                ❌
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Can't make it
              </h2>
              <p className="text-gray-600">
                I'll catch you next time
              </p>
            </div>
          </button>
        </div>

        {/* Skip to voting (if already answered) */}
        {isAttending !== null && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Continue to Voting →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

