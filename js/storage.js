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
  
  // ===== CLEAR =====
  clearAll() {
    localStorage.removeItem(this.KEYS.WORKOUTS);
    localStorage.removeItem(this.KEYS.STATS);
    localStorage.removeItem(this.KEYS.PROFILE);
    localStorage.removeItem(this.KEYS.SESSION);
    localStorage.removeItem(this.KEYS.TEMPLATES);
    localStorage.removeItem(this.KEYS.INACTIVE);
  }
};
