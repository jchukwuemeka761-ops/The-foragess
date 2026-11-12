import React, { useState, useMemo } from 'react';
import {
  NAVEDA_PHOTOS,
  NAVEDA_SITE,
  MenuItem,
  SubheadingPhoto,
  NAVEDA_MEAL_TIMES,
  MealTimeTab
} from '../data/navedaData';
import { useNavedaData } from '../context/DataContext';
import { SubheadingBanner } from '../components/SubheadingBanner';
import { ArabianTeaShowcase } from '../components/ArabianTeaShowcase';
import {
  Search,
  Sparkles,
  Flame,
  MessageCircle,
  Clock,
  CheckCircle2,
  Filter,
  Maximize2,
  Sun,
  Utensils,
  Moon,
  Coffee
} from 'lucide-react';

interface RestaurantPageProps {
  atmosphereClass: string;
  onInspectPhoto: (item: any) => void;
}

export const RestaurantPage: React.FC<RestaurantPageProps> = ({
  atmosphereClass,
  onInspectPhoto
}) => {
  const { dishes } = useNavedaData();
  const [selectedMealTime, setSelectedMealTime] = useState<'all' | 'breakfast' | 'lunch' | 'dinner'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpice, setSelectedSpice] = useState<string>('all');

  const categories = [
    { id: 'all', label: `All Categories (${dishes.length})` },
    { id: 'native', label: 'Eastern Native Soups & Delicacies' },
    { id: 'mains', label: 'Pan-African Mains & Jollof' },
    { id: 'starters', label: 'Starters & Native Pepper Soups' },
    { id: 'seafood', label: 'Ocean Seafood Specialties' },
    { id: 'tango', label: 'Tango for Two (Sharing Boards)' }
  ];

  // Helper to determine meal time classification for any dish
  const isDishInMealTime = (dish: MenuItem, meal: 'breakfast' | 'lunch' | 'dinner') => {
    if (dish.mealTime === meal || dish.mealTime === 'all-day') return true;
    const name = dish.name.toLowerCase();
    const id = dish.id.toLowerCase();
    const desc = dish.description.toLowerCase();

    if (meal === 'breakfast') {
      return (
        name.includes('sunrise') ||
        name.includes('pottage') ||
        name.includes('asaro') ||
        name.includes('beans') ||
        name.includes('ugba') ||
        name.includes('egg') ||
        name.includes('plantain') ||
        name.includes('pepper soup') ||
        name.includes('wings') ||
        id.includes('yam') ||
        id.includes('honey') ||
        id.includes('farmhouse')
      );
    }
    if (meal === 'lunch') {
      return (
        name.includes('jollof') ||
        name.includes('fried rice') ||
        name.includes('curry') ||
        name.includes('chicken') ||
        name.includes('prawn') ||
        name.includes('fries') ||
        name.includes('basket') ||
        name.includes('snails') ||
        name.includes('oxtail') ||
        name.includes('stewed') ||
        name.includes('medley') ||
        name.includes('feast') ||
        name.includes('peanut')
      );
    }
    if (meal === 'dinner') {
      return (
        name.includes('soup') ||
        name.includes('nkwobi') ||
        name.includes('oha') ||
        name.includes('egusi') ||
        name.includes('banga') ||
        name.includes('ogbono') ||
        name.includes('okro') ||
        name.includes('bitter leaf') ||
        name.includes('afang') ||
        name.includes('edikang') ||
        name.includes('symphony') ||
        name.includes('efo riro') ||
        name.includes('otong') ||
        name.includes('seafood')
      );
    }
    return true;
  };

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesMealTime =
        selectedMealTime === 'all' || isDishInMealTime(dish, selectedMealTime);
      const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpice = selectedSpice === 'all' || dish.spicyLevel === selectedSpice;

      return matchesMealTime && matchesCategory && matchesSearch && matchesSpice;
    });
  }, [dishes, selectedMealTime, selectedCategory, searchQuery, selectedSpice]);

  const handleOrderWhatsapp = (dish: MenuItem) => {
    const text = encodeURIComponent(
      `Hello Naveda World Bites & Brews, I would like to place an order for:\n\n• *Dish*: ${dish.name}\n• *Price*: ${dish.price}\n• *Portion*: ${dish.portion}\n\nPlease confirm availability and delivery / table prep time.`
    );
    window.open(`https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Subheading Banner: Architectural Complex Dining Atmosphere */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <SubheadingBanner
          photo={NAVEDA_PHOTOS.buildingExterior}
          atmosphereClass={atmosphereClass}
          onInspect={onInspectPhoto}
          ctaText="Order Group Feast on WhatsApp"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                100% Unique Dish Photography
              </span>
              <span className="text-xs text-neutral-400">
                Freshly prepared 24 hours daily
              </span>
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl pt-2">
              Naveda Culinary Collection
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl pt-1">
              Browse all 38 dishes. Every selection is accompanied by its exact, authentic visual representation without any duplicate photos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={NAVEDA_SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Direct WhatsApp Kitchen Line
            </a>
          </div>
        </div>

        {/* Meal Time Selection Bar (Breakfast, Lunch, Dinner, All Menus) */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Service Schedule & Dining Hours
              </span>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                Choose By Meal Time
              </h2>
            </div>
            <a
              href="#arabian-tea"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
            >
              <Coffee className="h-3.5 w-3.5 text-amber-400" />
              Arabian Tea Ceremony ☕
            </a>
          </div>

          {/* Meal Time Cards / Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {NAVEDA_MEAL_TIMES.map((meal) => {
              const isActive = selectedMealTime === meal.id;
              const count = dishes.filter((d) => meal.id === 'all' || isDishInMealTime(d, meal.id as any)).length;
              return (
                <button
                  key={meal.id}
                  type="button"
                  onClick={() => setSelectedMealTime(meal.id)}
                  className={`relative flex flex-col items-start p-4 rounded-2xl text-left border transition-all duration-300 ${
                    isActive
                      ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 via-neutral-900 to-neutral-950 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/40'
                      : 'border-white/10 bg-neutral-900/70 hover:border-white/20 hover:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl ${
                        meal.id === 'breakfast'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : meal.id === 'lunch'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : meal.id === 'dinner'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                      }`}>
                        {meal.id === 'breakfast' && <Sun className="h-4 w-4" />}
                        {meal.id === 'lunch' && <Utensils className="h-4 w-4" />}
                        {meal.id === 'dinner' && <Moon className="h-4 w-4" />}
                        {meal.id === 'all' && <Sparkles className="h-4 w-4" />}
                      </div>
                      <span className={`text-sm font-bold ${isActive ? 'text-amber-300' : 'text-white'}`}>
                        {meal.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {count} items
                    </span>
                  </div>

                  <span className="mt-2 text-[11px] font-medium text-amber-400/90 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {meal.timeRange}
                  </span>
                  <p className="mt-1 text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {meal.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-neutral-900/80 p-5 backdrop-blur-md">
          {/* Active Meal Banner if not all */}
          {selectedMealTime !== 'all' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span className="text-neutral-200">
                  Viewing <strong className="text-amber-300 font-bold capitalize">{selectedMealTime} Menu</strong> ({NAVEDA_MEAL_TIMES.find(m => m.id === selectedMealTime)?.timeRange})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMealTime('all')}
                className="text-amber-400 underline font-bold hover:text-amber-300"
              >
                View All Dishes (38)
              </button>
            </div>
          )}

          {/* Search input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search dishes by name, ingredients (e.g. Catfish, Oha, Snail, Jollof, Prawns)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Spice Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-orange-400" /> Spice:
              </span>
              <select
                value={selectedSpice}
                onChange={(e) => setSelectedSpice(e.target.value)}
                className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">All Spice Levels</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Hot">Hot</option>
                <option value="Extra Hot">Extra Hot 🌶️🌶️</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 px-1">
          <p>
            Showing <strong className="text-white">{filteredDishes.length}</strong> of 38 unique dishes
          </p>
          {(searchQuery || selectedCategory !== 'all' || selectedSpice !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSpice('all');
              }}
              className="text-amber-400 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* 38 Unique Dishes Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Dish Photo with Click-to-Inspect 4K View */}
              <div
                onClick={() => onInspectPhoto(dish)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 cursor-pointer"
                title="Click to view 4K Ultra HD high-definition photo"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 hd-ai-clarity"
                  loading="lazy"
                />
                
                {/* 4K Zoom Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5 rounded-full bg-neutral-900/90 border border-amber-400/60 px-3 py-1.5 text-xs font-bold text-amber-300 shadow-xl">
                    <Maximize2 className="h-3.5 w-3.5" />
                    Inspect 4K View
                  </span>
                </div>

                {dish.badge && (
                  <span className="absolute top-2.5 left-2.5 rounded-lg bg-black/85 px-2.5 py-1 text-[11px] font-bold text-amber-400 backdrop-blur-md border border-amber-500/30">
                    {dish.badge}
                  </span>
                )}
                {dish.spicyLevel && (
                  <span className="absolute top-2.5 right-2.5 rounded-lg bg-red-950/85 px-2 py-0.5 text-[10px] font-bold text-red-300 border border-red-500/30">
                    🌶️ {dish.spicyLevel}
                  </span>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-medium text-neutral-300 backdrop-blur-md">
                    ⏱️ {dish.prepTime}
                  </span>
                  <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                    4K Ultra HD
                  </span>
                </div>
              </div>

              {/* Dish Content */}
              <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90">
                    {dish.categoryTitle}
                  </span>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {dish.description}
                  </p>

                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-300 border border-neutral-800"
                      >
                        {ing}
                      </span>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] text-neutral-500">
                        +{dish.ingredients.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Order Action */}
                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-black text-amber-400">
                      {dish.price}
                    </span>
                    <p className="text-[11px] text-neutral-400">{dish.portion}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrderWhatsapp(dish)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="mt-12 rounded-3xl border border-neutral-800 bg-neutral-900/50 p-12 text-center">
            <p className="text-base font-bold text-white">No dishes matched your search criteria.</p>
            <p className="mt-1 text-xs text-neutral-400">Try searching for other ingredients or reset the filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSpice('all');
              }}
              className="mt-4 rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-neutral-950"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dedicated Space: Authentic Arabian Tea Ceremony & Equipment Showcase */}
        <div id="arabian-tea" className="mt-16">
          <ArabianTeaShowcase
            atmosphereClass={atmosphereClass}
            onInspectPhoto={onInspectPhoto}
          />
        </div>
      </div>
    </div>
  );
};
