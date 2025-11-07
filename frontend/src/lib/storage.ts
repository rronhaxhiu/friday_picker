const CURRENT_USER_KEY = 'friday_picker_current_user';

export const storage = {
  getCurrentUser: (): { id: string; name: string } | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setCurrentUser: (id: string, name: string) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id, name }));
  },

  clearCurrentUser: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};

