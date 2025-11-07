import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, User } from '../lib/api';
import { storage } from '../lib/storage';

export default function UserSelect() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const userData = await api.getUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectUser = (user: User) => {
    storage.setCurrentUser(user.id, user.name);
    navigate('/attendance');
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
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Friday Picker 🎉
          </h1>
          <p className="text-2xl text-gray-600">Who are you?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => selectUser(user)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 hover:scale-105 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 group-hover:scale-110 transition-transform">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/results')}
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            View Results 📊
          </button>
        </div>
      </div>
    </div>
  );
}

