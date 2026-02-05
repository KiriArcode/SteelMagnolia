/**
 * LocalStorage wrapper for GymBro
 */
const Storage = {
  KEYS: {
    WORKOUTS: 'gym_workouts',
    STATS: 'gym_stats',
    PROFILE: 'gym_profile',
    SESSION: 'gym_session',
    TEMPLATES: 'gym_templates',
    INACTIVE: 'gym_inactive',
    CYCLE: 'gym_cycle',
    MEASUREMENTS: 'gym_measurements',
    ACHIEVEMENTS: 'gym_achievements',
    STRETCH_SESSIONS: 'gym_stretch_sessions',
    NUTRITION: 'gym_nutrition',
    CHALLENGES: 'gym_challenges',
  },
  
  // ===== WORKOUTS =====
  getWorkouts() {
    try {
      const data = localStorage.getItem(this.KEYS.WORKOUTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading workouts:', e);
      return [];
    }
  },
  
  saveWorkout(workout) {
    try {
      const workouts = this.getWorkouts();
      workouts.unshift(workout); // Add to beginning
      
      // Keep only last 100 workouts
      if (workouts.length > 100) {
        workouts.pop();
      }
      
      localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error('Error saving workout:', e);
      return false;
    }
  },
  
  deleteWorkout(id) {
    try {
      const workouts = this.getWorkouts().filter(w => w.id !== id);
      localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error('Error deleting workout:', e);
      return false;
    }
  },
  
  updateWorkout(workout) {
    try {
      const workouts = this.getWorkouts();
      const idx = workouts.findIndex(w => w.id === workout.id);
      if (idx === -1) return false;
      workouts[idx] = workout;
      localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error('Error updating workout:', e);
      return false;
    }
  },
  
  // ===== STATS =====
  getStats() {
    try {
      const data = localStorage.getItem(this.KEYS.STATS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading stats:', e);
      return null;
    }
  },
  
  saveStats(stats) {
    try {
      localStorage.setItem(this.KEYS.STATS, JSON.stringify(stats));
      return true;
    } catch (e) {
      console.error('Error saving stats:', e);
      return false;
    }
  },
  
  // ===== PROFILE =====
  getProfile() {
    try {
      const data = localStorage.getItem(this.KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading profile:', e);
      return null;
    }
  },
  
  saveProfile(profile) {
    try {
      localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.error('Error saving profile:', e);
      return false;
    }
  },
  
  // ===== EXPORT/IMPORT =====
  exportData() {
    return {
      workouts: this.getWorkouts(),
      stats: this.getStats(),
      profile: this.getProfile(),
      exportedAt: new Date().toISOString(),
    };
  },
  
  importData(data) {
    try {
      if (data.workouts) {
        localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(data.workouts));
      }
      if (data.stats) {
        localStorage.setItem(this.KEYS.STATS, JSON.stringify(data.stats));
      }
      if (data.profile) {
        localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(data.profile));
      }
      return true;
    } catch (e) {
      console.error('Error importing data:', e);
      return false;
    }
  },
  
  // ===== SESSION (для восстановления после перезагрузки) =====
  getSession() {
    try {
      const data = localStorage.getItem(this.KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading session:', e);
      return null;
    }
  },
  
  saveSession(session) {
    try {
      if (!session) return false;
      session.savedAt = new Date().toISOString();
      localStorage.setItem(this.KEYS.SESSION, JSON.stringify(session));
      return true;
    } catch (e) {
      console.error('Error saving session:', e);
      return false;
    }
  },
  
  clearSession() {
    try {
      localStorage.removeItem(this.KEYS.SESSION);
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // ===== TEMPLATES (шаблоны тренировок) =====
  _normalizeAlts(alts) {
    if (!Array.isArray(alts)) return [];
    return alts.map(a =>
      typeof a === 'string' ? { name: a, forWhat: '', videoUrl: '' } : { name: a.name || '', forWhat: a.forWhat || '', videoUrl: a.videoUrl || '' }
    );
  },
  _normalizeExercise(ex) {
    if (!ex) return ex;
    const e = { ...ex };
    e.videoUrl = e.videoUrl || '';
    e.alts = this._normalizeAlts(e.alts);
    return e;
  },
  _normalizeTemplates(templates) {
    const out = {};
    for (const [k, v] of Object.entries(templates || {})) {
      if (v && v.exercises) {
        out[k] = { ...v, exercises: (v.exercises || []).map(ex => this._normalizeExercise(ex)) };
      } else {
        out[k] = v;
      }
    }
    return out;
  },
  getTemplates() {
    try {
      const data = localStorage.getItem(this.KEYS.TEMPLATES);
      const custom = data ? JSON.parse(data) : null;
      const base = typeof WORKOUT_TEMPLATES !== 'undefined' ? WORKOUT_TEMPLATES : {};
      const merged = custom && Object.keys(custom).length > 0 ? { ...base, ...custom } : base;
      return this._normalizeTemplates(merged);
    } catch (e) {
      console.error('Error reading templates:', e);
      return this._normalizeTemplates(typeof WORKOUT_TEMPLATES !== 'undefined' ? WORKOUT_TEMPLATES : {});
    }
  },
  
  saveTemplates(templates) {
    try {
      localStorage.setItem(this.KEYS.TEMPLATES, JSON.stringify(templates));
      return true;
    } catch (e) {
      console.error('Error saving templates:', e);
      return false;
    }
  },
  
  // ===== INACTIVE EXERCISES (нет в моем зале) =====
  getInactive() {
    try {
      const data = localStorage.getItem(this.KEYS.INACTIVE);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading inactive:', e);
      return {};
    }
  },
  
  saveInactive(data) {
    try {
      localStorage.setItem(this.KEYS.INACTIVE, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving inactive:', e);
      return false;
    }
  },
  
  toggleInactive(workoutKey, exerciseId) {
    const data = this.getInactive();
    const arr = data[workoutKey] || [];
    const idx = arr.indexOf(exerciseId);
    if (idx === -1) {
      arr.push(exerciseId);
    } else {
      arr.splice(idx, 1);
    }
    data[workoutKey] = arr;
    return this.saveInactive(data);
  },
  
  // ===== CYCLE =====
  getCycle() {
    try {
      const data = localStorage.getItem(this.KEYS.CYCLE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading cycle:', e);
      return null;
    }
  },
  
  saveCycle(cycle) {
    try {
      localStorage.setItem(this.KEYS.CYCLE, JSON.stringify(cycle));
      return true;
    } catch (e) {
      console.error('Error saving cycle:', e);
      return false;
    }
  },
  
  // ===== MEASUREMENTS =====
  getMeasurements() {
    try {
      const data = localStorage.getItem(this.KEYS.MEASUREMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading measurements:', e);
      return [];
    }
  },
  
  saveMeasurement(measurement) {
    try {
      const measurements = this.getMeasurements();
      measurements.unshift(measurement);
      // Keep only last 50 measurements
      if (measurements.length > 50) {
        measurements.pop();
      }
      localStorage.setItem(this.KEYS.MEASUREMENTS, JSON.stringify(measurements));
      return true;
    } catch (e) {
      console.error('Error saving measurement:', e);
      return false;
    }
  },
  
  // ===== ACHIEVEMENTS =====
  getAchievements() {
    try {
      const data = localStorage.getItem(this.KEYS.ACHIEVEMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading achievements:', e);
      return [];
    }
  },
  
  saveAchievements(achievements) {
    try {
      localStorage.setItem(this.KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
      return true;
    } catch (e) {
      console.error('Error saving achievements:', e);
      return false;
    }
  },
  
  unlockAchievement(id) {
    try {
      const achievements = this.getAchievements();
      const achievement = achievements.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.dateUnlocked = new Date().toISOString();
        this.saveAchievements(achievements);
        return achievement;
      }
      return null;
    } catch (e) {
      console.error('Error unlocking achievement:', e);
      return null;
    }
  },
  
  // ===== STRETCH SESSIONS =====
  getStretchSessions() {
    try {
      const data = localStorage.getItem(this.KEYS.STRETCH_SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading stretch sessions:', e);
      return [];
    }
  },
  
  saveStretchSession(session) {
    try {
      const sessions = this.getStretchSessions();
      sessions.unshift(session);
      if (sessions.length > 100) {
        sessions.pop();
      }
      localStorage.setItem(this.KEYS.STRETCH_SESSIONS, JSON.stringify(sessions));
      return true;
    } catch (e) {
      console.error('Error saving stretch session:', e);
      return false;
    }
  },
  
  // ===== NUTRITION =====
  getNutrition() {
    try {
      const data = localStorage.getItem(this.KEYS.NUTRITION);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading nutrition:', e);
      return [];
    }
  },
  
  saveNutritionEntry(entry) {
    try {
      const entries = this.getNutrition();
      const existingIdx = entries.findIndex(e => e.date === entry.date);
      if (existingIdx !== -1) {
        entries[existingIdx] = entry;
      } else {
        entries.unshift(entry);
      }
      if (entries.length > 365) {
        entries.pop();
      }
      localStorage.setItem(this.KEYS.NUTRITION, JSON.stringify(entries));
      return true;
    } catch (e) {
      console.error('Error saving nutrition entry:', e);
      return false;
    }
  },
  
  // ===== CHALLENGES =====
  getChallenges() {
    try {
      const data = localStorage.getItem(this.KEYS.CHALLENGES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading challenges:', e);
      return [];
    }
  },
  
  saveChallenges(challenges) {
    try {
      localStorage.setItem(this.KEYS.CHALLENGES, JSON.stringify(challenges));
      return true;
    } catch (e) {
      console.error('Error saving challenges:', e);
      return false;
    }
  },
  
  // ===== CLEAR =====
  clearAll() {
    localStorage.removeItem(this.KEYS.WORKOUTS);
    localStorage.removeItem(this.KEYS.STATS);
    localStorage.removeItem(this.KEYS.PROFILE);
    localStorage.removeItem(this.KEYS.SESSION);
    localStorage.removeItem(this.KEYS.TEMPLATES);
    localStorage.removeItem(this.KEYS.INACTIVE);
    localStorage.removeItem(this.KEYS.CYCLE);
    localStorage.removeItem(this.KEYS.MEASUREMENTS);
    localStorage.removeItem(this.KEYS.ACHIEVEMENTS);
    localStorage.removeItem(this.KEYS.STRETCH_SESSIONS);
    localStorage.removeItem(this.KEYS.NUTRITION);
    localStorage.removeItem(this.KEYS.CHALLENGES);
  }
};
