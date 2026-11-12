import React, { useState } from 'react';
import { useNavedaData } from '../context/DataContext';
import { MenuItem, DrinkItem, NAVEDA_SITE, MEAL_SERVICE_PRESETS, isDishForMeal } from '../data/navedaData';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RefreshCw,
  Download,
  Upload,
  UtensilsCrossed,
  Wine,
  Calendar,
  Sparkles,
  ArrowLeft,
  Search,
  Image as ImageIcon,
  Flame,
  CheckCircle2,
  AlertCircle,
  Key,
  Eye,
  EyeOff,
  ShieldAlert,
  Sun,
  Utensils,
  Moon,
  Coffee
} from 'lucide-react';

interface AdminPageProps {
  onBackToSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  const {
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
  } = useNavedaData();

  // Login Gate state
  const [pinInput, setPinInput] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'dishes' | 'drinks' | 'rates' | 'security' | 'backup'>('dishes');

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMealFilter, setSelectedMealFilter] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'all-day'>('all');

  // Inline price editing states
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Add / Edit Dish Modal
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [dishForm, setDishForm] = useState({
    name: '',
    category: 'native' as MenuItem['category'],
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    mealTime: 'all-day' as 'breakfast' | 'lunch' | 'dinner' | 'all-day',
    description: '',
    price: '₦15,000',
    portion: 'Native Clay Bowl with Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Medium' as MenuItem['spicyLevel'],
    badge: '',
    image: '/images/dishes/pss.jpg',
    ingredients: ''
  });

  // Add / Edit Drink Modal
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);
  const [editingDrink, setEditingDrink] = useState<DrinkItem | null>(null);
  const [drinkForm, setDrinkForm] = useState({
    name: '',
    category: 'Beer' as DrinkItem['category'],
    price: '₦12,000',
    badge: 'Popular',
    description: 'Chilled refreshing beverage served cold with ice.'
  });

  // Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Password Management States
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecuritySuccess(null);

    if (!newPassInput || newPassInput.trim().length < 4) {
      setSecurityError('New password must be at least 4 characters long.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setSecurityError('New passwords do not match. Please verify and re-type.');
      return;
    }

    const res = changeAdminPassword(currentPassInput, newPassInput);
    if (res.success) {
      setSecuritySuccess(res.message);
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      showToast(res.message);
    } else {
      setSecurityError(res.message);
    }
  };

  const handleResetPassword = () => {
    const res = resetAdminPassword();
    setSecuritySuccess(res.message);
    setSecurityError(null);
    setIsResetModalOpen(false);
    showToast(res.message);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setLoginError(false);
      setPinInput('');
      showToast('Welcome Administrator! You can now manage dishes, prices & drinks live.');
    } else {
      setLoginError(true);
    }
  };

  // Image Upload helper
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setDishForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dish modal actions
  const openAddDishModal = (targetMeal?: 'breakfast' | 'lunch' | 'dinner' | 'all-day') => {
    setEditingDish(null);
    const meal = targetMeal || (selectedMealFilter !== 'all' ? selectedMealFilter : 'all-day');
    const preset = MEAL_SERVICE_PRESETS[meal];

    let sampleImg = '/images/dishes/pss.jpg';
    if (meal === 'breakfast') sampleImg = '/images/dishes/pss.jpg';
    else if (meal === 'lunch') sampleImg = '/images/dishes/jfr.jpg';
    else if (meal === 'dinner') sampleImg = '/images/dishes/eos.jpg';
    else sampleImg = '/images/tea/arabian_tea_equipment.jpg';

    setDishForm({
      name: '',
      category: preset.defaultCategory,
      categoryTitle: preset.defaultCategoryTitle,
      mealTime: meal,
      description: '',
      price: meal === 'breakfast' ? '₦9,500' : meal === 'lunch' ? '₦14,000' : '₦15,000',
      portion: preset.defaultPortion,
      prepTime: preset.defaultPrepTime,
      spicyLevel: preset.defaultSpicy,
      badge: preset.defaultBadge,
      image: sampleImg,
      ingredients: ''
    });
    setIsDishModalOpen(true);
  };

  const openEditDishModal = (dish: MenuItem) => {
    setEditingDish(dish);
    let effectiveMeal: 'breakfast' | 'lunch' | 'dinner' | 'all-day' = dish.mealTime || 'all-day';
    if (!dish.mealTime) {
      if (isDishForMeal(dish, 'breakfast')) effectiveMeal = 'breakfast';
      else if (isDishForMeal(dish, 'dinner')) effectiveMeal = 'dinner';
      else if (isDishForMeal(dish, 'lunch')) effectiveMeal = 'lunch';
    }

    setDishForm({
      name: dish.name,
      category: dish.category,
      categoryTitle: dish.categoryTitle,
      mealTime: effectiveMeal,
      description: dish.description,
      price: dish.price,
      portion: dish.portion,
      prepTime: dish.prepTime,
      spicyLevel: dish.spicyLevel || 'Medium',
      badge: dish.badge || '',
      image: dish.image,
      ingredients: dish.ingredients.join(', ')
    });
    setIsDishModalOpen(true);
  };

  const saveDishForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPrice = dishForm.price.startsWith('₦') ? dishForm.price : `₦${dishForm.price}`;
    const ingredientsArray = dishForm.ingredients.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingDish) {
      updateDish(editingDish.id, {
        name: dishForm.name,
        category: dishForm.category,
        categoryTitle: dishForm.categoryTitle,
        mealTime: dishForm.mealTime,
        description: dishForm.description,
        price: formattedPrice,
        portion: dishForm.portion,
        prepTime: dishForm.prepTime,
        spicyLevel: dishForm.spicyLevel,
        badge: dishForm.badge || undefined,
        image: dishForm.image,
        ingredients: ingredientsArray
      });
      showToast(`Updated "${dishForm.name}" in ${dishForm.mealTime.toUpperCase()} menu.`);
    } else {
      const newDish: MenuItem = {
        id: `dish-${Date.now()}`,
        name: dishForm.name,
        category: dishForm.category,
        categoryTitle: dishForm.categoryTitle,
        mealTime: dishForm.mealTime,
        description: dishForm.description,
        price: formattedPrice,
        portion: dishForm.portion,
        prepTime: dishForm.prepTime,
        spicyLevel: dishForm.spicyLevel,
        badge: dishForm.badge || undefined,
        image: dishForm.image,
        ingredients: ingredientsArray
      };
      addDish(newDish);
      showToast(`Added new dish to ${dishForm.mealTime.toUpperCase()} Menu successfully!`);
    }
    setIsDishModalOpen(false);
  };

  const handleQuickChangeMealTime = (dishId: string, newMeal: 'breakfast' | 'lunch' | 'dinner' | 'all-day') => {
    updateDish(dishId, { mealTime: newMeal });
    showToast(`Dish reclassified to ${newMeal.toUpperCase()} menu.`);
  };

  // Drink modal actions
  const openAddDrinkModal = () => {
    setEditingDrink(null);
    setDrinkForm({
      name: '',
      category: 'Beer',
      price: '₦12,000',
      badge: 'Popular Choice',
      description: 'Ice-chilled beverage served fresh at the bar or lounge.'
    });
    setIsDrinkModalOpen(true);
  };

  const openEditDrinkModal = (drink: DrinkItem) => {
    setEditingDrink(drink);
    setDrinkForm({
      name: drink.name,
      category: drink.category,
      price: drink.price,
      badge: drink.badge || '',
      description: drink.description
    });
    setIsDrinkModalOpen(true);
  };

  const saveDrinkForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPrice = drinkForm.price.startsWith('₦') ? drinkForm.price : `₦${drinkForm.price}`;

    if (editingDrink) {
      updateDrink(editingDrink.id, {
        name: drinkForm.name,
        category: drinkForm.category,
        price: formattedPrice,
        badge: drinkForm.badge || undefined,
        description: drinkForm.description
      });
      showToast(`Updated "${drinkForm.name}" price.`);
    } else {
      const newDrink: DrinkItem = {
        id: `drink-${Date.now()}`,
        name: drinkForm.name,
        category: drinkForm.category,
        price: formattedPrice,
        badge: drinkForm.badge || undefined,
        description: drinkForm.description
      };
      addDrink(newDrink);
      showToast(`Added new drink "${drinkForm.name}" at ${formattedPrice}.`);
    }
    setIsDrinkModalOpen(false);
  };

  // Quick Inline price save
  const handleStartEditPrice = (id: string, currentPrice: string) => {
    setEditingPriceId(id);
    setTempPrice(currentPrice.replace('₦', '').trim());
  };

  const handleSaveInlinePrice = (id: string, isDrink: boolean = false) => {
    const formatted = `₦${tempPrice.replace(/[^0,0-9,.]/g, '').trim()}`;
    if (isDrink) {
      updateDrink(id, { price: formatted });
      showToast(`Drink price updated to ${formatted}`);
    } else {
      updateDish(id, { price: formatted });
      showToast(`Dish price updated to ${formatted}`);
    }
    setEditingPriceId(null);
  };

  // Meal counts for Admin Tabs
  const breakfastCount = dishes.filter((d) => isDishForMeal(d, 'breakfast')).length;
  const lunchCount = dishes.filter((d) => isDishForMeal(d, 'lunch')).length;
  const dinnerCount = dishes.filter((d) => isDishForMeal(d, 'dinner')).length;
  const allDayCount = dishes.filter((d) => d.mealTime === 'all-day').length;

  // Filtered dishes for admin table
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesMeal =
      selectedMealFilter === 'all'
        ? true
        : selectedMealFilter === 'all-day'
        ? dish.mealTime === 'all-day'
        : isDishForMeal(dish, selectedMealFilter);
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesMeal && matchesSearch;
  });

  // ==========================================
  // VIEW: LOGIN GATE
  // ==========================================
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-amber-500/30 bg-neutral-900/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg">
              <Lock className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                Staff & Manager Access
              </span>
              <h1 className="font-display text-2xl font-black text-white pt-1">
                Naveda Management Back End
              </h1>
              <p className="text-xs text-neutral-400">
                Enter your administrative PIN to change dish prices, drink rates, and manage menus.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block text-left mb-1">
                  Administrator Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 pr-11 text-center text-lg font-mono text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-neutral-400 hover:text-white transition-colors"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center justify-center gap-1 font-semibold">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Incorrect password. Please verify and try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Unlock className="h-4 w-4" />
                Unlock Admin Back End
              </button>

              <button
                type="button"
                onClick={onBackToSite}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Customer Website
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: LOGGED-IN DASHBOARD
  // ==========================================
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-neutral-900/95 px-5 py-3 text-sm font-bold text-emerald-300 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl border border-amber-500/30 bg-neutral-900/90 p-6 backdrop-blur-xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              Live Back End Active
            </span>
            <span className="text-xs text-neutral-400">
              All edits automatically sync with client menu & AI assistant
            </span>
          </div>
          <h1 className="font-display text-2xl font-black text-white sm:text-3xl">
            Naveda World Management Portal
          </h1>
          <p className="text-xs text-neutral-300">
            Change dish prices in Naira, manage drinks catalogue, update AstroTurf rates, and add new specials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBackToSite}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-neutral-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            View Customer Site
          </button>
          <button
            type="button"
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 rounded-xl bg-red-950/60 border border-red-500/40 px-4 py-2.5 text-xs font-bold text-red-300 hover:bg-red-900 transition-colors"
          >
            <Lock className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('dishes')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'dishes'
              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          <UtensilsCrossed className="h-4 w-4" />
          Dishes & Food Menu ({dishes.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drinks')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'drinks'
              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          <Wine className="h-4 w-4" />
          Drinks & VIP Bottles ({drinks.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rates')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'rates'
              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          <Calendar className="h-4 w-4" />
          AstroTurf Rates & Packages
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'security'
              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          <Key className="h-4 w-4" />
          Password & Security
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'backup'
              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
              : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          <Download className="h-4 w-4" />
          Backup & Factory Reset
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: DISHES & MENU MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'dishes' && (
        <div className="space-y-6">
          {/* Direct Meal-Time Creator Hub */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-neutral-900/90 via-neutral-900/70 to-neutral-950 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400 border border-amber-500/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  Direct Meal-Time Access
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white pt-1">
                  Add Dishes to Breakfast, Lunch & Dinner
                </h2>
                <p className="text-xs text-neutral-400">
                  Direct dedicated workflows with distinct culinary portion presets, timing windows, and automatic live syncing to the customer menus.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openAddDishModal('all-day')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors shrink-0"
              >
                <Plus className="h-3.5 w-3.5 text-amber-400" />
                Add All-Day / Custom Dish
              </button>
            </div>

            {/* 3 Dedicated Direct Action Cards / Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* 1. Add Breakfast Dish */}
              <button
                type="button"
                onClick={() => openAddDishModal('breakfast')}
                className="group relative flex flex-col items-start p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-400/60 transition-all text-left shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-neutral-950 shadow-md">
                    <Sun className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    6:00 AM – 11:30 AM
                  </span>
                </div>
                <span className="font-display font-bold text-sm text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-amber-400" />
                  + Add Breakfast Dish
                </span>
                <p className="text-[11px] text-neutral-400 pt-1 line-clamp-2">
                  Morning eggs, ripe plantains, honey beans, sunrise catfish pepper soup & warm wake-up broths.
                </p>
              </button>

              {/* 2. Add Lunch Dish */}
              <button
                type="button"
                onClick={() => openAddDishModal('lunch')}
                className="group relative flex flex-col items-start p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/60 transition-all text-left shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-neutral-950 shadow-md">
                    <Utensils className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                    11:30 AM – 4:30 PM
                  </span>
                </div>
                <span className="font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-emerald-400" />
                  + Add Lunch Dish
                </span>
                <p className="text-[11px] text-neutral-400 pt-1 line-clamp-2">
                  Smoky firewood jollof, executive fried rice & jumbo prawns, savory chicken & midday plates.
                </p>
              </button>

              {/* 3. Add Dinner Dish */}
              <button
                type="button"
                onClick={() => openAddDishModal('dinner')}
                className="group relative flex flex-col items-start p-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60 transition-all text-left shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md">
                    <Moon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">
                    4:30 PM – Dawn (24/7)
                  </span>
                </div>
                <span className="font-display font-bold text-sm text-white group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-purple-400" />
                  + Add Dinner Dish
                </span>
                <p className="text-[11px] text-neutral-400 pt-1 line-clamp-2">
                  Eastern native clay-pot soups (Oha, Egusi, Banga), swallows, spicy nkwobi & evening grills.
                </p>
              </button>
            </div>
          </div>

          {/* Meal-Time Navigation Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
            <button
              type="button"
              onClick={() => setSelectedMealFilter('all')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedMealFilter === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <span>🍽️ All Dishes</span>
              <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-mono">
                {dishes.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMealFilter('breakfast')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedMealFilter === 'breakfast'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-amber-400'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              <span>Breakfast Menu</span>
              <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-mono">
                {breakfastCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMealFilter('lunch')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedMealFilter === 'lunch'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-emerald-400'
              }`}
            >
              <Utensils className="h-3.5 w-3.5" />
              <span>Lunch Menu</span>
              <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-mono">
                {lunchCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMealFilter('dinner')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedMealFilter === 'dinner'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-purple-400'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>Dinner Menu</span>
              <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-mono">
                {dinnerCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMealFilter('all-day')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedMealFilter === 'all-day'
                  ? 'bg-neutral-700 text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>All-Day Specials</span>
              <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-mono">
                {allDayCount}
              </span>
            </button>
          </div>

          {/* Action & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search dishes to edit price, photo, or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-10 pr-4 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">All Culinary Categories</option>
                <option value="native">Eastern Native Soups</option>
                <option value="mains">Pan-African Mains & Jollof</option>
                <option value="starters">Starters & Pepper Soups</option>
                <option value="seafood">Ocean Seafood</option>
                <option value="tango">Tango Sharing Boards</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openAddDishModal(selectedMealFilter !== 'all' ? selectedMealFilter : undefined)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                {selectedMealFilter === 'breakfast'
                  ? 'Add Breakfast Dish'
                  : selectedMealFilter === 'lunch'
                  ? 'Add Lunch Dish'
                  : selectedMealFilter === 'dinner'
                  ? 'Add Dinner Dish'
                  : 'Add New Dish with Picture'}
              </button>
            </div>
          </div>

          {/* Dishes Table / Cards */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-4">Photo</th>
                    <th className="py-4 px-4">Dish Name & Category</th>
                    <th className="py-4 px-4">Meal Service</th>
                    <th className="py-4 px-4">Price (Naira ₦)</th>
                    <th className="py-4 px-4">Portion / Details</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredDishes.map((dish) => {
                    const isEditingPrice = editingPriceId === dish.id;
                    const effectiveMeal: 'breakfast' | 'lunch' | 'dinner' | 'all-day' =
                      dish.mealTime ||
                      (isDishForMeal(dish, 'breakfast')
                        ? 'breakfast'
                        : isDishForMeal(dish, 'dinner')
                        ? 'dinner'
                        : isDishForMeal(dish, 'lunch')
                        ? 'lunch'
                        : 'all-day');

                    return (
                      <tr key={dish.id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3 px-4 w-16">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="h-12 w-12 rounded-xl object-cover border border-neutral-700"
                          />
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <p className="font-display font-bold text-white text-sm">
                            {dish.name}
                          </p>
                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-amber-400 font-semibold">
                              {dish.categoryTitle}
                            </span>
                            {dish.spicyLevel && (
                              <span className="text-[10px] text-red-300">
                                🌶️ {dish.spicyLevel}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1 w-fit rounded-lg px-2 py-0.5 text-[10px] font-bold border ${
                                effectiveMeal === 'breakfast'
                                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                  : effectiveMeal === 'lunch'
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                  : effectiveMeal === 'dinner'
                                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                              }`}
                            >
                              {effectiveMeal === 'breakfast' && <Sun className="h-3 w-3 text-amber-400" />}
                              {effectiveMeal === 'lunch' && <Utensils className="h-3 w-3 text-emerald-400" />}
                              {effectiveMeal === 'dinner' && <Moon className="h-3 w-3 text-purple-400" />}
                              {effectiveMeal === 'all-day' && <Sparkles className="h-3 w-3 text-amber-400" />}
                              <span>
                                {effectiveMeal === 'breakfast'
                                  ? 'Breakfast'
                                  : effectiveMeal === 'lunch'
                                  ? 'Lunch'
                                  : effectiveMeal === 'dinner'
                                  ? 'Dinner'
                                  : 'All-Day'}
                              </span>
                            </span>

                            {/* Quick 1-click reclassifier */}
                            <select
                              value={effectiveMeal}
                              onChange={(e) => handleQuickChangeMealTime(dish.id, e.target.value as any)}
                              className="text-[10px] rounded bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 text-neutral-400 hover:text-white focus:border-amber-500 focus:outline-none"
                              title="Quick change meal classification"
                            >
                              <option value="breakfast">🌅 Breakfast (6:00 AM – 11:30 AM)</option>
                              <option value="lunch">☀️ Lunch (11:30 AM – 4:30 PM)</option>
                              <option value="dinner">🌙 Dinner (4:30 PM – Dawn)</option>
                              <option value="all-day">✨ All-Day Dining (24/7)</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {isEditingPrice ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400 font-bold">₦</span>
                              <input
                                type="text"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                className="w-24 rounded-lg border border-amber-500 bg-neutral-950 px-2 py-1 text-xs font-bold text-white focus:outline-none"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveInlinePrice(dish.id, false)}
                                className="p-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                                title="Save price"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingPriceId(null)}
                                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                                title="Cancel"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span className="font-display font-black text-amber-400 text-base">
                                {dish.price}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleStartEditPrice(dish.id, dish.price)}
                                className="opacity-60 group-hover:opacity-100 p-1 rounded hover:bg-neutral-800 text-neutral-300"
                                title="Quick change price in Naira"
                              >
                                <Edit2 className="h-3 w-3 text-amber-400" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-neutral-300 max-w-xs">
                          <p className="font-medium">{dish.portion}</p>
                          <p className="text-[10px] text-neutral-400 truncate">
                            {dish.ingredients.join(', ')}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditDishModal(dish)}
                              className="rounded-lg bg-neutral-800 p-2 text-xs text-neutral-300 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                              title="Full edit dish & picture"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove "${dish.name}" from the menu?`)) {
                                  deleteDish(dish.id);
                                  showToast(`Removed "${dish.name}"`);
                                }
                              }}
                              className="rounded-lg bg-neutral-800 p-2 text-xs text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                              title="Remove dish"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: DRINKS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'drinks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Beverages, Beers & VIP Bottle Management
              </h3>
              <p className="text-xs text-neutral-400">
                Change drink prices or add more drinks to the bar and nightlife selection.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddDrinkModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add More Drinks
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {drinks.map((drink) => {
              const isEditingPrice = editingPriceId === drink.id;
              return (
                <div
                  key={drink.id}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        {drink.category}
                      </span>
                      {drink.badge && (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                          {drink.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-base font-bold text-white">
                      {drink.name}
                    </h4>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {drink.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      {isEditingPrice ? (
                        <div className="flex items-center gap-1">
                          <span className="text-amber-400 font-bold text-xs">₦</span>
                          <input
                            type="text"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            className="w-24 rounded border border-amber-500 bg-neutral-950 px-2 py-1 text-xs font-bold text-white focus:outline-none"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveInlinePrice(drink.id, true)}
                            className="p-1 rounded bg-emerald-600 text-white"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingPriceId(null)}
                            className="p-1 rounded bg-neutral-800 text-neutral-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 group">
                          <span className="font-display text-lg font-black text-amber-400">
                            {drink.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStartEditPrice(drink.id, drink.price)}
                            className="opacity-60 group-hover:opacity-100 p-1 text-neutral-400 hover:text-amber-400"
                            title="Edit price in Naira"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditDrinkModal(drink)}
                        className="rounded-lg bg-neutral-800 p-2 text-xs text-neutral-300 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete ${drink.name}?`)) {
                            deleteDrink(drink.id);
                            showToast(`Deleted ${drink.name}`);
                          }
                        }}
                        className="rounded-lg bg-neutral-800 p-2 text-xs text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ASTROTURF RATES */}
      {/* ========================================================= */}
      {activeTab === 'rates' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <h3 className="font-display text-base font-bold text-white">
              The Arena: 5-A-Side AstroTurf Pitch Pricing
            </h3>
            <p className="text-xs text-neutral-400">
              Update hourly rates charged for day & night floodlit matches.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pitchPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="rounded bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                    {pkg.badge}
                  </span>
                  <h4 className="font-display text-lg font-bold text-white">{pkg.title}</h4>
                  <p className="text-xs text-neutral-400 font-medium">{pkg.time}</p>

                  <div className="pt-2">
                    <label className="text-[11px] text-neutral-400 font-semibold block">Rate in Naira (₦):</label>
                    <input
                      type="text"
                      value={pkg.rate}
                      onChange={(e) => updatePitchPackage(pkg.id, { rate: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-base font-display font-black text-emerald-400 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-800 text-xs text-neutral-300">
                  {pkg.perks.map((p, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: BACKUP & RESTORE */}
      {/* ========================================================= */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Data Management & Rollback
              </h3>
              <p className="text-xs text-neutral-400">
                Export current custom prices and dishes to JSON, or restore the original factory menu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  const data = exportData();
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `naveda-menu-backup-${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                  showToast('Exported full menu backup file.');
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-800 border border-white/10 p-4 text-xs font-bold text-white hover:bg-neutral-700 transition-colors"
              >
                <Download className="h-4 w-4 text-amber-400" />
                Export Menu & Prices (JSON)
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all dishes and prices to factory defaults? All manual changes will be reverted.')) {
                    resetToDefaults();
                    showToast('All menu prices and dishes have been reset to factory defaults.');
                  }
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-red-950/40 border border-red-500/30 p-4 text-xs font-bold text-red-300 hover:bg-red-900/60 transition-colors"
              >
                <RefreshCw className="h-4 w-4 text-red-400" />
                Restore Factory Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: PASSWORD & SECURITY SETTINGS */}
      {/* ========================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Change Administrator Password */}
            <div className="rounded-3xl border border-amber-500/30 bg-neutral-900/80 p-6 sm:p-8 space-y-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Key className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Change Administrator Password
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Update the credentials used to unlock this administrative management portal.
                  </p>
                </div>
              </div>

              {securityError && (
                <div className="rounded-2xl border border-red-500/40 bg-red-950/40 p-4 flex items-center gap-2.5 text-xs text-red-300 font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{securityError}</span>
                </div>
              )}

              {securitySuccess && (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 flex items-center gap-2.5 text-xs text-emerald-300 font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{securitySuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      required
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2.5 pr-11 text-xs text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                      title={showCurrentPass ? 'Hide password' : 'Show password'}
                    >
                      {showCurrentPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      placeholder="Enter new password (min. 4 characters)"
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2.5 pr-11 text-xs text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                      title={showNewPass ? 'Hide password' : 'Show password'}
                    >
                      {showNewPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2.5 pr-11 text-xs text-white placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                      title={showConfirmPass ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Check className="h-4 w-4" />
                    Save New Password
                  </button>
                </div>
              </form>
            </div>

            {/* Card 2: Reset Password to System Default */}
            <div className="flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-800 text-neutral-300 border border-white/10">
                    <RefreshCw className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Reset Password to System Default
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Restore default factory credentials anytime.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    <span>How Password Reset Operates</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Resetting will clear any custom password saved in this browser's persistent storage and revert the administrator credentials back to the standard system default.
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    All your dishes, customized prices in Naira, drinks, and pitch package configurations will remain completely safe and untouched.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 px-5 py-3 text-xs font-bold text-red-300 hover:bg-red-900/60 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 text-red-400" />
                  Reset Password to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RESET PASSWORD CONFIRMATION */}
      {/* ========================================================= */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-red-500/40 bg-neutral-900 p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
                <ShieldAlert className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Reset Password to Default?
                </h3>
                <p className="text-xs text-neutral-400">
                  Revert credentials back to factory system default.
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to reset the admin password? Any custom password previously configured will be cleared and the default system password will be restored.
            </p>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="rounded-xl bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-600/30"
              >
                Yes, Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT DISH */}
      {/* ========================================================= */}
      {isDishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-neutral-900 p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setIsDishModalOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-neutral-800 p-2 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                {editingDish ? 'Edit Dish Details & Price' : 'Add New Dish to Menu'}
              </span>
              <h2 className="font-display text-2xl font-bold text-white pt-1">
                {editingDish ? `Edit: ${editingDish.name}` : 'New Culinary Dish Creation'}
              </h2>
            </div>

            <form onSubmit={saveDishForm} className="space-y-4 pt-2">
              {/* Meal-Time & Service Destination Selector */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    Target Meal Service Destination
                  </label>
                  <span className="text-[10px] text-neutral-400">
                    Directly classifies dish into customer menus
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Breakfast */}
                  <button
                    type="button"
                    onClick={() => {
                      const p = MEAL_SERVICE_PRESETS.breakfast;
                      setDishForm((prev) => ({
                        ...prev,
                        mealTime: 'breakfast',
                        category: prev.category === 'native' ? p.defaultCategory : prev.category,
                        categoryTitle: prev.category === 'native' ? p.defaultCategoryTitle : prev.categoryTitle,
                        badge: prev.badge || p.defaultBadge,
                        portion: prev.portion === 'Native Clay Bowl with Swallow' ? p.defaultPortion : prev.portion,
                        spicyLevel: prev.spicyLevel || p.defaultSpicy
                      }));
                    }}
                    className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all ${
                      dishForm.mealTime === 'breakfast'
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <Sun className="h-4 w-4 mb-1 text-amber-400" />
                    <span className="text-xs">Breakfast</span>
                    <span className="text-[9px] opacity-75">6:00 AM – 11:30 AM</span>
                  </button>

                  {/* Lunch */}
                  <button
                    type="button"
                    onClick={() => {
                      const p = MEAL_SERVICE_PRESETS.lunch;
                      setDishForm((prev) => ({
                        ...prev,
                        mealTime: 'lunch',
                        category: prev.category === 'native' ? p.defaultCategory : prev.category,
                        categoryTitle: prev.category === 'native' ? p.defaultCategoryTitle : prev.categoryTitle,
                        badge: prev.badge || p.defaultBadge,
                        portion: prev.portion === 'Native Clay Bowl with Swallow' ? p.defaultPortion : prev.portion,
                        spicyLevel: prev.spicyLevel || p.defaultSpicy
                      }));
                    }}
                    className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all ${
                      dishForm.mealTime === 'lunch'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <Utensils className="h-4 w-4 mb-1 text-emerald-400" />
                    <span className="text-xs">Lunch</span>
                    <span className="text-[9px] opacity-75">11:30 AM – 4:30 PM</span>
                  </button>

                  {/* Dinner */}
                  <button
                    type="button"
                    onClick={() => {
                      const p = MEAL_SERVICE_PRESETS.dinner;
                      setDishForm((prev) => ({
                        ...prev,
                        mealTime: 'dinner',
                        category: p.defaultCategory,
                        categoryTitle: p.defaultCategoryTitle,
                        badge: prev.badge || p.defaultBadge,
                        portion: prev.portion || p.defaultPortion,
                        spicyLevel: prev.spicyLevel || p.defaultSpicy
                      }));
                    }}
                    className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all ${
                      dishForm.mealTime === 'dinner'
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300 ring-2 ring-purple-500/30 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <Moon className="h-4 w-4 mb-1 text-purple-400" />
                    <span className="text-xs">Dinner & Late-Night</span>
                    <span className="text-[9px] opacity-75">4:30 PM – Dawn</span>
                  </button>

                  {/* All-Day */}
                  <button
                    type="button"
                    onClick={() => {
                      setDishForm((prev) => ({
                        ...prev,
                        mealTime: 'all-day'
                      }));
                    }}
                    className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all ${
                      dishForm.mealTime === 'all-day'
                        ? 'border-neutral-500 bg-neutral-800 text-white ring-2 ring-white/20 font-bold'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <Sparkles className="h-4 w-4 mb-1 text-amber-400" />
                    <span className="text-xs">All-Day Dining</span>
                    <span className="text-[9px] opacity-75">24 Hours Round</span>
                  </button>
                </div>

                {/* Quick-Fill Preset Suggestions */}
                {MEAL_SERVICE_PRESETS[dishForm.mealTime]?.quickIdeas && (
                  <div className="pt-2 border-t border-neutral-900 space-y-1.5">
                    <span className="text-[10px] text-neutral-400 block font-medium">
                      💡 Click any culinary idea below to auto-populate fields for {dishForm.mealTime.toUpperCase()}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {MEAL_SERVICE_PRESETS[dishForm.mealTime].quickIdeas.map((idea, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const p = MEAL_SERVICE_PRESETS[dishForm.mealTime];
                            setDishForm((prev) => ({
                              ...prev,
                              name: idea.name,
                              description: idea.desc,
                              price: idea.price,
                              portion: idea.portion,
                              ingredients: idea.ingredients,
                              category: p.defaultCategory,
                              categoryTitle: p.defaultCategoryTitle,
                              spicyLevel: p.defaultSpicy,
                              badge: p.defaultBadge
                            }));
                          }}
                          className="rounded-lg border border-neutral-800 bg-neutral-900/90 hover:bg-neutral-800 px-2.5 py-1 text-[11px] text-neutral-300 hover:text-amber-300 transition-colors flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3 text-amber-400" />
                          <span>{idea.name}</span>
                          <span className="text-amber-400/80 font-mono text-[10px]">({idea.price})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={dishForm.name}
                    onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                    placeholder="e.g. Royal Peppered Goat Meat"
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Price in Naira (₦)</label>
                  <input
                    type="text"
                    required
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
                    placeholder="e.g. ₦16,000"
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Category</label>
                  <select
                    value={dishForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as MenuItem['category'];
                      const titles: Record<MenuItem['category'], string> = {
                        native: 'Eastern Nigerian Native Delicacies',
                        mains: 'Pan-African Entrées',
                        starters: 'Starters & Native Pepper Soups',
                        seafood: 'Ocean Seafood Specialties',
                        tango: 'Tango for Two (Sharing Platters)',
                        grills: 'Barbecue & Grills',
                        cocktails: 'Signature Cocktails',
                        brews: 'Chilled Brews'
                      };
                      setDishForm({ ...dishForm, category: cat, categoryTitle: titles[cat] });
                    }}
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="native">Eastern Nigerian Native Delicacies</option>
                    <option value="mains">Pan-African Entrées</option>
                    <option value="starters">Starters & Native Pepper Soups</option>
                    <option value="seafood">Ocean Seafood Specialties</option>
                    <option value="tango">Tango for Two (Sharing Platters)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Spice Level</label>
                  <select
                    value={dishForm.spicyLevel}
                    onChange={(e) => setDishForm({ ...dishForm, spicyLevel: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Hot">Hot</option>
                    <option value="Extra Hot">Extra Hot 🌶️🌶️</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Portion Serving</label>
                  <input
                    type="text"
                    value={dishForm.portion}
                    onChange={(e) => setDishForm({ ...dishForm, portion: e.target.value })}
                    placeholder="e.g. Native Soup Pot with Swallow"
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Badge (Optional)</label>
                  <input
                    type="text"
                    value={dishForm.badge}
                    onChange={(e) => setDishForm({ ...dishForm, badge: e.target.value })}
                    placeholder="e.g. Bestseller, Chef Special"
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Picture Upload / Preview */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4 text-amber-400" />
                  Dish Picture (Upload from Device or paste image URL)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={dishForm.image}
                    alt="Dish Preview"
                    className="h-20 w-24 rounded-xl object-cover border border-amber-500/40 shrink-0"
                  />

                  <div className="space-y-2 flex-1 w-full">
                    <div>
                      <span className="text-[10px] text-neutral-400 block mb-1">Upload Photo from Computer/Phone:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="text-xs text-neutral-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-neutral-800 file:text-amber-400 hover:file:bg-neutral-700"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-neutral-400 block mb-0.5">Or Image URL path:</span>
                      <input
                        type="text"
                        value={dishForm.image}
                        onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Description</label>
                <textarea
                  rows={2}
                  required
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  placeholder="Describe the mouth-watering flavors, spices, and preparation..."
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Ingredients (comma separated)</label>
                <input
                  type="text"
                  value={dishForm.ingredients}
                  onChange={(e) => setDishForm({ ...dishForm, ingredients: e.target.value })}
                  placeholder="e.g. Catfish, Uziza, Uda seeds, Pounded Yam"
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDishModalOpen(false)}
                  className="rounded-xl bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500"
                >
                  Save Dish & Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT DRINK */}
      {/* ========================================================= */}
      {isDrinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-neutral-900 p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setIsDrinkModalOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-neutral-800 p-2 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                {editingDrink ? 'Edit Drink' : 'Add More Drinks'}
              </span>
              <h2 className="font-display text-2xl font-bold text-white pt-1">
                {editingDrink ? `Edit: ${editingDrink.name}` : 'New Beverage / Bottle Addition'}
              </h2>
            </div>

            <form onSubmit={saveDrinkForm} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-neutral-300">Drink Name</label>
                <input
                  type="text"
                  required
                  value={drinkForm.name}
                  onChange={(e) => setDrinkForm({ ...drinkForm, name: e.target.value })}
                  placeholder="e.g. Star Radler (Bucket of 6) or Dom Pérignon"
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Category</label>
                  <select
                    value={drinkForm.category}
                    onChange={(e) => setDrinkForm({ ...drinkForm, category: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Beer">Beer & Draught</option>
                    <option value="Champagne">Champagne</option>
                    <option value="Cognac">Cognac</option>
                    <option value="Tequila">Tequila</option>
                    <option value="Whiskey">Whiskey / Scotch</option>
                    <option value="Cocktails">Cocktails & Chapman</option>
                    <option value="Wine">Wine</option>
                    <option value="Non-Alcoholic">Non-Alcoholic & Energy</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Price in Naira (₦)</label>
                  <input
                    type="text"
                    required
                    value={drinkForm.price}
                    onChange={(e) => setDrinkForm({ ...drinkForm, price: e.target.value })}
                    placeholder="e.g. ₦12,000"
                    className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Badge (Optional)</label>
                <input
                  type="text"
                  value={drinkForm.badge}
                  onChange={(e) => setDrinkForm({ ...drinkForm, badge: e.target.value })}
                  placeholder="e.g. Ice Cold, VIP Favorite"
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300">Description</label>
                <textarea
                  rows={2}
                  value={drinkForm.description}
                  onChange={(e) => setDrinkForm({ ...drinkForm, description: e.target.value })}
                  placeholder="Flavors, serving temperature, or bottle size..."
                  className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDrinkModalOpen(false)}
                  className="rounded-xl bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400"
                >
                  Save Drink & Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
