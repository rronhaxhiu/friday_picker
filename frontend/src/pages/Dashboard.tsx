import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, Option } from '../lib/api';
import { storage } from '../lib/storage';

const SECTIONS = ['Bars', 'Food', 'Activity', 'Miscellaneous'];

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();
  
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionSection, setNewOptionSection] = useState('Activity');
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [attendingCount, setAttendingCount] = useState(0);

  // Refs for section scrolling
  const barsRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const miscRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    loadData();
    loadWeather();
  }, []); // Run only once on mount

  const loadData = async () => {
    if (!currentUser) return;
    
    try {
      // Load attendance
      const attendanceData = await api.getAttendance();
      const attendanceArray = Array.isArray(attendanceData?.attendance) ? attendanceData.attendance : [];
      const userAttendance = attendanceArray.find(
        (a: any) => a.id === currentUser.id
      );
      setIsAttending(userAttendance?.is_attending === 1);
      
      // Count attending users
      const attending = attendanceArray.filter((a: any) => a.is_attending === 1).length;
      setAttendingCount(attending);

      // Load options
      const optionsData = await api.getOptions();
      setOptions(Array.isArray(optionsData?.options) ? optionsData.options : []);

      // Load user votes
      const votesData = await api.getUserVotes(currentUser.id);
      const votesArray = Array.isArray(votesData?.votes) ? votesData.votes : [];
      setSelectedOptions(new Set(votesArray));
    } catch (error) {
      console.error('Failed to load data:', error);
      setOptions([]);
      setAttendingCount(0);
      setSelectedOptions(new Set());
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async () => {
    try {
      // Using OpenWeatherMap API - Free tier, no API key needed for basic forecast
      // Using wttr.in which provides free weather data
      const response = await fetch('https://wttr.in/Prishtina,Kosovo?format=j1');
      const data = await response.json();
      
      // Get Friday's forecast (find the next Friday)
      const today = new Date();
      const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7; // 0 = today if Friday, otherwise days until next Friday
      const forecastIndex = Math.min(daysUntilFriday, 2); // wttr.in provides 3 days forecast (0, 1, 2)
      
      const fridayForecast = data.weather[forecastIndex];
      setWeather({
        temp: Math.round((parseInt(fridayForecast.avgtempC))),
        feelsLike: Math.round((parseInt(fridayForecast.hourly[4].FeelsLikeC))), // Around noon
        condition: fridayForecast.hourly[4].weatherDesc[0].value,
        icon: getWeatherEmoji(fridayForecast.hourly[4].weatherCode)
      });
    } catch (error) {
      console.error('Failed to load weather:', error);
      setWeather({
        temp: '?',
        feelsLike: '?',
        condition: 'Unable to load weather',
        icon: '🌡️'
      });
    } finally {
      setWeatherLoading(false);
    }
  };

  const getWeatherEmoji = (code: string) => {
    const weatherCode = parseInt(code);
    if (weatherCode === 113) return '☀️'; // Sunny
    if ([116, 119, 122].includes(weatherCode)) return '⛅'; // Partly cloudy
    if ([143, 248, 260].includes(weatherCode)) return '🌫️'; // Fog/Mist
    if ([176, 263, 266, 293, 296].includes(weatherCode)) return '🌦️'; // Light rain
    if ([179, 182, 185, 281, 284, 311, 314, 317, 350, 362, 365, 374].includes(weatherCode)) return '🌨️'; // Snow/Sleet
    if ([200, 386, 389, 392, 395].includes(weatherCode)) return '⛈️'; // Thunder
    if ([299, 302, 305, 308, 356, 359].includes(weatherCode)) return '🌧️'; // Heavy rain
    if ([326, 329, 332, 335, 338, 368, 371, 377].includes(weatherCode)) return '❄️'; // Heavy snow
    return '☁️'; // Cloudy as default
  };


  const handleOptionToggle = async (optionId: string) => {
    if (!currentUser || !isAttending) return; // Block voting if not attending

    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);

    // Auto-save votes immediately
    try {
      await api.submitVotes(currentUser.id, Array.from(newSelected));
      // Reload options to get updated vote counts
      const optionsData = await api.getOptions();
      setOptions(optionsData.options);
    } catch (error) {
      console.error('Failed to submit votes:', error);
      // Revert on error
      setSelectedOptions(selectedOptions);
    }
  };

  const handleAddOption = async () => {
    if (!currentUser || !newOptionName.trim()) return;
    
    try {
      await api.addOption(newOptionName.trim(), currentUser.id, newOptionSection);
      setNewOptionName('');
      // Reload options to show the new one with correct vote counts
      const optionsData = await api.getOptions();
      setOptions(optionsData.options);
    } catch (error) {
      console.error('Failed to add option:', error);
    }
  };

  const handleLogout = () => {
    storage.clearCurrentUser();
    navigate('/');
  };

  const scrollToSection = (section: string) => {
    const refs = {
      'Bars': barsRef,
      'Food': foodRef,
      'Activity': activityRef,
      'Miscellaneous': miscRef,
    };
    const ref = refs[section as keyof typeof refs];
    if (ref?.current) {
      // Calculate offset for sticky navigator (height + margin + extra padding)
      const navHeight = 135; // Increased for better spacing
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getOptionsBySection = (section: string) => {
    return options.filter(opt => opt.section === section);
  };

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
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800">
              Hey, {currentUser?.name}! 👋
            </h1>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Switch User
            </button>
          </div>

          {/* Attendance Status Badge */}
          <div className="flex items-center gap-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isAttending 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <span className="text-xl">{isAttending ? '✅' : '❌'}</span>
              <span className="font-semibold">
                {isAttending ? "You're coming this Friday" : "You're not coming this Friday"}
              </span>
            </div>
            <button
              onClick={() => navigate('/attendance')}
              className="text-primary-600 hover:text-primary-700 text-sm underline"
            >
              Change
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            {attendingCount} {attendingCount === 1 ? 'person' : 'people'} coming this Friday
          </div>
        </div>

        
        {/* Weather Widget */}
        <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
          {weatherLoading ? (
            <div className="text-center py-4">
              <div className="text-white/80">Loading weather...</div>
            </div>
          ) : weather ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{weather.icon}</div>
                <div className="text-right">
                <div className="text-sm capitalize">Prishtina, Friday</div>
                <div className="text-xl font-semibold capitalize">{weather.condition}</div>
              </div>
                <div>
                  <div className="text-5xl font-bold">{weather.temp}°C</div>
                  <div className="text-lg text-white/90">Feels like {weather.feelsLike}°C</div>
                </div>
              </div>
              
            </div>
          ) : (
            <div className="text-center text-white/80">Weather data unavailable</div>
          )}
        </div>

        {/* Section Navigator */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10">
          <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-3 justify-center">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="px-4 md:px-6 py-2 rounded-lg font-semibold transition-all bg-primary-100 text-primary-700 hover:bg-primary-200 text-sm md:text-base"
              >
                {section === 'Bars' && '🍺'} 
                {section === 'Food' && '🍕'} 
                {section === 'Activity' && '🎮'} 
                {section === 'Miscellaneous' && '🎲'} 
                {' '}{section}
              </button>
            ))}
          </div>
        </div>

        {/* Not Attending Warning */}
        {!isAttending && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-8 text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              You're not attending this Friday
            </h3>
            <p className="text-yellow-700">
              Mark yourself as attending above to vote on options
            </p>
          </div>
        )}

        {/* Bars Section */}
        <div ref={barsRef} className={`mb-8 relative ${!isAttending ? 'pointer-events-none' : ''}`}>
          {!isAttending && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl z-10" />
          )}
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🍺 Bars
          </h2>
          <div className="space-y-3">
            {getOptionsBySection('Bars').length === 0 ? (
              <p className="text-gray-500 text-center py-8 bg-white rounded-xl">
                No bar options yet. Add one below!
              </p>
            ) : (
              getOptionsBySection('Bars').map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionToggle(option.id)}
                  className={`p-6 rounded-xl transition-all ${
                    isAttending ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    selectedOptions.has(option.id)
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg scale-[1.02]'
                      : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className={`text-xl font-semibold mb-1 ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-gray-800'
                      }`}>
                        {option.name}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-500'
                      }`}>
                        Suggested by {option.added_by_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-amber-600'
                      }`}>
                        {option.vote_count}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {option.vote_count === 1 ? 'vote' : 'votes'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Food Section */}
        <div ref={foodRef} className={`mb-8 relative ${!isAttending ? 'pointer-events-none' : ''}`}>
          {!isAttending && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl z-10" />
          )}
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🍕 Food
          </h2>
          <div className="space-y-3">
            {getOptionsBySection('Food').length === 0 ? (
              <p className="text-gray-500 text-center py-8 bg-white rounded-xl">
                No food options yet. Add one below!
              </p>
            ) : (
              getOptionsBySection('Food').map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionToggle(option.id)}
                  className={`p-6 rounded-xl transition-all ${
                    isAttending ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    selectedOptions.has(option.id)
                      ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg scale-[1.02]'
                      : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className={`text-xl font-semibold mb-1 ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-gray-800'
                      }`}>
                        {option.name}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-500'
                      }`}>
                        Suggested by {option.added_by_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-pink-600'
                      }`}>
                        {option.vote_count}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {option.vote_count === 1 ? 'vote' : 'votes'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Section */}
        <div ref={activityRef} className={`mb-8 relative ${!isAttending ? 'pointer-events-none' : ''}`}>
          {!isAttending && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl z-10" />
          )}
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎮 Activity
          </h2>
          <div className="space-y-3">
            {getOptionsBySection('Activity').length === 0 ? (
              <p className="text-gray-500 text-center py-8 bg-white rounded-xl">
                No activity options yet. Add one below!
              </p>
            ) : (
              getOptionsBySection('Activity').map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionToggle(option.id)}
                  className={`p-6 rounded-xl transition-all ${
                    isAttending ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    selectedOptions.has(option.id)
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg scale-[1.02]'
                      : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className={`text-xl font-semibold mb-1 ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-gray-800'
                      }`}>
                        {option.name}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-500'
                      }`}>
                        Suggested by {option.added_by_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-blue-600'
                      }`}>
                        {option.vote_count}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {option.vote_count === 1 ? 'vote' : 'votes'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Miscellaneous Section */}
        <div ref={miscRef} className={`mb-8 relative ${!isAttending ? 'pointer-events-none' : ''}`}>
          {!isAttending && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl z-10" />
          )}
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎲 Miscellaneous
          </h2>
          <div className="space-y-3">
            {getOptionsBySection('Miscellaneous').length === 0 ? (
              <p className="text-gray-500 text-center py-8 bg-white rounded-xl">
                No miscellaneous options yet. Add one below!
              </p>
            ) : (
              getOptionsBySection('Miscellaneous').map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionToggle(option.id)}
                  className={`p-6 rounded-xl transition-all ${
                    isAttending ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    selectedOptions.has(option.id)
                      ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg scale-[1.02]'
                      : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className={`text-xl font-semibold mb-1 ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-gray-800'
                      }`}>
                        {option.name}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-500'
                      }`}>
                        Suggested by {option.added_by_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        selectedOptions.has(option.id) ? 'text-white' : 'text-purple-600'
                      }`}>
                        {option.vote_count}
                      </div>
                      <div className={`text-sm ${
                        selectedOptions.has(option.id) ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {option.vote_count === 1 ? 'vote' : 'votes'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add New Option */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            💡 Suggest Something New
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                value={newOptionSection}
                onChange={(e) => setNewOptionSection(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {SECTIONS.map((section) => (
                  <option key={section} value={section}>
                    {section === 'Bars' && '🍺'} 
                    {section === 'Food' && '🍕'} 
                    {section === 'Activity' && '🎮'} 
                    {section === 'Miscellaneous' && '🎲'} 
                    {' '}{section}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name your idea
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newOptionName}
                  onChange={(e) => setNewOptionName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                  placeholder="e.g., 21sh, xhehnem, etc."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddOption}
                  disabled={!newOptionName.trim()}
                  className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Results Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/results')}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>View Results & Leaderboard</span>
              <span className="text-2xl group-hover:animate-bounce">📊</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
