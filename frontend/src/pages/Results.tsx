import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, Option, Attendance } from '../lib/api';

export default function Results() {
  const navigate = useNavigate();
  const [options, setOptions] = useState<Option[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [optionsData, attendanceData] = await Promise.all([
        api.getOptions(),
        api.getAttendance(),
      ]);
      setOptions(Array.isArray(optionsData?.options) ? optionsData.options : []);
      setAttendance(Array.isArray(attendanceData?.attendance) ? attendanceData.attendance : []);
    } catch (error) {
      console.error('Failed to load data:', error);
      setOptions([]);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  const attendingCount = attendance.filter((a) => a.is_attending === 1).length;

  const getOptionsBySection = (section: string) => {
    return options
      .filter(opt => opt.section === section)
      .sort((a, b) => b.vote_count - a.vote_count); // Sort by votes descending
  };

  const getSectionWinner = (section: string) => {
    const sectionOptions = getOptionsBySection(section);
    if (sectionOptions.length === 0) return null;
    
    // Get the option with the most votes
    const winner = sectionOptions.reduce((prev, current) => 
      (current.vote_count > prev.vote_count) ? current : prev
    );
    
    // Only return if it has at least 1 vote
    return winner.vote_count > 0 ? winner : null;
  };

  const barsWinner = getSectionWinner('Bars');
  const foodWinner = getSectionWinner('Food');
  const activityWinner = getSectionWinner('Activity');
  const miscWinner = getSectionWinner('Miscellaneous');

  const winners = [barsWinner, foodWinner, activityWinner, miscWinner].filter(w => w !== null);
  const hasWinners = winners.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            This Friday's Plan 🎉
          </h1>
          <p className="text-xl text-gray-600">
            {attendingCount} {attendingCount === 1 ? 'person' : 'people'} coming
          </p>
        </div>

        {/* Winner Card */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 text-white">
          {hasWinners ? (
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 opacity-90">This Friday's Plan</h2>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed break-words">
                {winners.map((winner, index) => (
                  <span key={winner.id} className="inline-block">
                    <span className="break-words">{winner.name}</span>
                    {index < winners.length - 1 && (
                      <span className="mx-2 md:mx-3 text-white/80">+</span>
                    )}
                  </span>
                ))}
                <span className="ml-2 md:ml-3">!</span>
              </div>
              <div className="mt-6 grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4">
                {barsWinner && (
                  <div className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
                    <div className="text-xs md:text-sm opacity-80">🍺 Bars</div>
                    <div className="text-sm md:text-base font-semibold">{barsWinner.vote_count} {barsWinner.vote_count === 1 ? 'vote' : 'votes'}</div>
                  </div>
                )}
                {foodWinner && (
                  <div className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
                    <div className="text-xs md:text-sm opacity-80">🍕 Food</div>
                    <div className="text-sm md:text-base font-semibold">{foodWinner.vote_count} {foodWinner.vote_count === 1 ? 'vote' : 'votes'}</div>
                  </div>
                )}
                {activityWinner && (
                  <div className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
                    <div className="text-xs md:text-sm opacity-80">🎮 Activity</div>
                    <div className="text-sm md:text-base font-semibold">{activityWinner.vote_count} {activityWinner.vote_count === 1 ? 'vote' : 'votes'}</div>
                  </div>
                )}
                {miscWinner && (
                  <div className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
                    <div className="text-xs md:text-sm opacity-80">🎲 Misc</div>
                    <div className="text-sm md:text-base font-semibold">{miscWinner.vote_count} {miscWinner.vote_count === 1 ? 'vote' : 'votes'}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Waiting for votes...</h2>
              <p className="text-lg md:text-xl opacity-90">
                Be the first to vote and help decide what to do!
              </p>
            </div>
          )}
        </div>

         {/* Attendance List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Who's Coming? 👥
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {attendance.map((user) => (
              <div
                key={user.id}
                className={`p-3 rounded-xl text-center font-medium ${
                  user.is_attending === 1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {user.is_attending === 1 ? '✅' : '❌'} {user.name}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard by Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Leaderboard 📊
          </h2>

          {options.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No options yet. Someone needs to suggest activities!
            </p>
          ) : (
            <div className="space-y-8">
              {/* Bars Section */}
              {getOptionsBySection('Bars').length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-amber-600 mb-3 flex items-center gap-2">
                    🍺 Bars
                  </h3>
                  <div className="space-y-3">
                    {getOptionsBySection('Bars').map((option, index) => {
                      const percentage = option.total_attending > 0 
                        ? Math.round((option.vote_count / option.total_attending) * 100)
                        : 0;
                      
                      return (
                        <div
                          key={option.id}
                          className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl"
                        >
                          <div className="text-2xl font-bold text-amber-400 w-8">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {option.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  by {option.added_by_name}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-amber-600">
                                  {option.vote_count} {option.vote_count === 1 ? 'vote' : 'votes'}
                                </div>
                                {option.total_attending > 0 && (
                                  <div className="text-sm text-gray-600">
                                    {percentage}% approval
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-amber-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Food Section */}
              {getOptionsBySection('Food').length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-pink-600 mb-3 flex items-center gap-2">
                    🍕 Food
                  </h3>
                  <div className="space-y-3">
                    {getOptionsBySection('Food').map((option, index) => {
                      const percentage = option.total_attending > 0 
                        ? Math.round((option.vote_count / option.total_attending) * 100)
                        : 0;
                      
                      return (
                        <div
                          key={option.id}
                          className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl"
                        >
                          <div className="text-2xl font-bold text-pink-400 w-8">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {option.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  by {option.added_by_name}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-pink-600">
                                  {option.vote_count} {option.vote_count === 1 ? 'vote' : 'votes'}
                                </div>
                                {option.total_attending > 0 && (
                                  <div className="text-sm text-gray-600">
                                    {percentage}% approval
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-pink-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Activity Section */}
              {getOptionsBySection('Activity').length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                    🎮 Activity
                  </h3>
                  <div className="space-y-3">
                    {getOptionsBySection('Activity').map((option, index) => {
                      const percentage = option.total_attending > 0 
                        ? Math.round((option.vote_count / option.total_attending) * 100)
                        : 0;
                      
                      return (
                        <div
                          key={option.id}
                          className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl"
                        >
                          <div className="text-2xl font-bold text-blue-400 w-8">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {option.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  by {option.added_by_name}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-blue-600">
                                  {option.vote_count} {option.vote_count === 1 ? 'vote' : 'votes'}
                                </div>
                                {option.total_attending > 0 && (
                                  <div className="text-sm text-gray-600">
                                    {percentage}% approval
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Miscellaneous Section */}
              {getOptionsBySection('Miscellaneous').length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
                    🎲 Miscellaneous
                  </h3>
                  <div className="space-y-3">
                    {getOptionsBySection('Miscellaneous').map((option, index) => {
                      const percentage = option.total_attending > 0 
                        ? Math.round((option.vote_count / option.total_attending) * 100)
                        : 0;
                      
                      return (
                        <div
                          key={option.id}
                          className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl"
                        >
                          <div className="text-2xl font-bold text-purple-400 w-8">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {option.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  by {option.added_by_name}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-purple-600">
                                  {option.vote_count} {option.vote_count === 1 ? 'vote' : 'votes'}
                                </div>
                                {option.total_attending > 0 && (
                                  <div className="text-sm text-gray-600">
                                    {percentage}% approval
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-purple-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all"
          >
            Vote Now 🗳️
          </button>
        </div>
      </div>
    </div>
  );
}

