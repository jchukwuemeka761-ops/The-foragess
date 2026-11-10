import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  DrinkItem,
  NAVEDA_MENU_ITEMS,
  INITIAL_DRINKS,
  NAVEDA_PITCH_PACKAGES
} from '../data/navedaData';

interface PitchPackageItem {
  id: string;
  title: string;
  time: string;
  rate: string;
  badge: string;
  perks: string[];
}

interface DataContextType {
  dishes: MenuItem[];
  drinks: DrinkItem[];
  pitchPackages: PitchPackageItem[];
  isAdmin: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => { success: boolean; message: string };
  resetAdminPassword: () => { success: boolean; message: string };
  updateDish: (id: string, updated: Partial<MenuItem>) => void;
  addDish: (newDish: MenuItem) => void;
  deleteDish: (id: string) => void;
  updateDrink: (id: string, updated: Partial<DrinkItem>) => void;
  addDrink: (newDrink: DrinkItem) => void;
  deleteDrink: (id: string) => void;
  updatePitchPackage: (id: string, updated: Partial<PitchPackageItem>) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
}

const STORAGE_KEYS = {
  DISHES: 'naveda_admin_dishes_v1',
  DRINKS: 'naveda_admin_drinks_v1',
  PITCH: 'naveda_admin_pitch_v1',
  ADMIN_AUTH: 'naveda_admin_session_v1',
  ADMIN_PASSWORD: 'naveda_admin_password_v1'
};

const DEFAULT_ADMIN_PIN = 'naveda2026';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dishes, setDishes] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DISHES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading stored dishes', e);
    }
    return NAVEDA_MENU_ITEMS;
  });

  const [drinks, setDrinks] = useState<DrinkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRINKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading stored drinks', e);
    }
    return INITIAL_DRINKS;
  });

  const [pitchPackages, setPitchPackages] = useState<PitchPackageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PITCH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading stored pitch packages', e);
    }
    return NAVEDA_PITCH_PACKAGES as PitchPackageItem[];
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
      if (saved) return saved;
    } catch {}
    return DEFAULT_ADMIN_PIN;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes));
    } catch (e) {
      console.error('Error saving dishes to localStorage', e);
    }
  }, [dishes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRINKS, JSON.stringify(drinks));
    } catch (e) {
      console.error('Error saving drinks to localStorage', e);
    }
  }, [drinks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PITCH, JSON.stringify(pitchPackages));
    } catch (e) {
      console.error('Error saving pitch packages to localStorage', e);
    }
  }, [pitchPackages]);

  const loginAdmin = (pin: string): boolean => {
    const trimmed = pin.trim();
    if (trimmed === adminPassword) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {}
  };

  const changeAdminPassword = (currentPass: string, newPass: string): { success: boolean; message: string } => {
    if (currentPass.trim() !== adminPassword) {
      return { success: false, message: 'Current password is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'New password must be at least 4 characters long.' };
    }
    const cleanNewPass = newPass.trim();
    setAdminPassword(cleanNewPass);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, cleanNewPass);
    } catch (e) {
      console.error('Error saving new admin password', e);
    }
    return { success: true, message: 'Admin password updated successfully!' };
  };

  const resetAdminPassword = (): { success: boolean; message: string } => {
    setAdminPassword(DEFAULT_ADMIN_PIN);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_PASSWORD);
    } catch (e) {
      console.error('Error resetting admin password', e);
    }
    return { success: true, message: 'Admin password has been reset to default successfully.' };
  };

  const updateDish = (id: string, updated: Partial<MenuItem>) => {
    setDishes((prev) =>
      prev.map((dish) => (dish.id === id ? { ...dish, ...updated } : dish))
    );
  };

  const addDish = (newDish: MenuItem) => {
    setDishes((prev) => [newDish, ...prev]);
  };

  const deleteDish = (id: string) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  const updateDrink = (id: string, updated: Partial<DrinkItem>) => {
    setDrinks((prev) =>
      prev.map((drink) => (drink.id === id ? { ...drink, ...updated } : drink))
    );
  };

  const addDrink = (newDrink: DrinkItem) => {
    setDrinks((prev) => [newDrink, ...prev]);
  };

  const deleteDrink = (id: string) => {
    setDrinks((prev) => prev.filter((drink) => drink.id !== id));
  };

  const updatePitchPackage = (id: string, updated: Partial<PitchPackageItem>) => {
    setPitchPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updated } : pkg))
    );
  };

  const resetToDefaults = () => {
    setDishes(NAVEDA_MENU_ITEMS);
    setDrinks(INITIAL_DRINKS);
    setPitchPackages(NAVEDA_PITCH_PACKAGES as PitchPackageItem[]);
    try {
      localStorage.removeItem(STORAGE_KEYS.DISHES);
      localStorage.removeItem(STORAGE_KEYS.DRINKS);
      localStorage.removeItem(STORAGE_KEYS.PITCH);
    } catch {}
  };

  const exportData = (): string => {
    return JSON.stringify(
      {
        dishes,
        drinks,
        pitchPackages,
        exportDate: new Date().toISOString()
      },
      null,
      2
    );
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed.dishes)) setDishes(parsed.dishes);
      if (Array.isArray(parsed.drinks)) setDrinks(parsed.drinks);
      if (Array.isArray(parsed.pitchPackages)) setPitchPackages(parsed.pitchPackages);
      return true;
    } catch (e) {
      console.error('Failed to parse import data', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        dishes,
        drinks,
        pitchPackages,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        resetAdminPassword,
        updateDish,
        addDish,
        deleteDish,
        updateDrink,
        addDrink,
        deleteDrink,
        updatePitchPackage,
        resetToDefaults,
        exportData,
        importData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useNavedaData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useNavedaData must be used within a DataProvider');
  }
  return context;
};
