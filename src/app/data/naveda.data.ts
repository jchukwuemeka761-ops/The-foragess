export interface SubheadingPhoto {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeIcon: string;
  location: string;
  accent: 'emerald' | 'amber' | 'cyan' | 'purple' | 'orange';
  highlights: readonly string[];
}

export const NAVEDA_PHOTOS = {
  buildingExterior: {
    id: 'building-exterior',
    imageSrc: '/assets/aistudio/naveda_1111_bd081ad6.jpeg',
    title: 'The Naveda Architectural Complex & Landmark',
    subtitle: 'Ultra-modern multi-level architecture featuring iconic orange accents, tinted glass curtain walls, and pristine paved courtyard.',
    badge: 'Umuahia Architectural Landmark',
    badgeIcon: 'domain',
    location: 'Okwuta Road by Ahiaeke Junction, Umuahia',
    accent: 'orange' as const,
    highlights: ['Multi-level modern complex', 'Signature orange & architectural glass styling', '24/7 guarded secure parking']
  },
  liveBandStage: {
    id: 'live-band-stage',
    imageSrc: '/assets/aistudio/naveda11_ae89049b.jpg',
    title: 'Weekend Live Highlife Band & Cultural Stage',
    subtitle: 'Electrifying live performances by seasoned Nigerian musicians in traditional red Igbo caps and matching cultural attire, featuring electric guitars, drums, and soulful brass.',
    badge: 'Live Highlife Band',
    badgeIcon: 'music_note',
    location: 'VIP Stage & Lounge · Naveda Complex',
    accent: 'amber' as const,
    highlights: ['Resident highlife & Afrobeats band', 'Traditional red cap cultural heritage', 'Live every Friday, Saturday & Sunday']
  },
  entranceSignage: {
    id: 'entrance-signage',
    imageSrc: '/assets/aistudio/naveda_222222_cdcd9f7a.jpeg',
    title: 'Grand Entrance, Naveda Mart & Complex Reception',
    subtitle: 'Illuminated architectural signage, designer ceiling light beams, and modern corporate hospitality welcoming guests round the clock.',
    badge: 'Grand Arrival & Mart',
    badgeIcon: 'storefront',
    location: 'Main Reception & Mall · Naveda Complex',
    accent: 'orange' as const,
    highlights: ['Illuminated signature NAVEDA wall', 'Direct access to shopping mall & dining', '24/7 dedicated concierge']
  },
  cleanTurfPitch: {
    id: 'clean-turf-pitch',
    imageSrc: '/assets/aistudio/naveda223_72e0eba7.jpg',
    title: 'The Arena: All-Weather 5-A-Side AstroTurf Pitch',
    subtitle: 'Pristine striped synthetic turf, professional mini goals, high-tensile protective safety netting, and vibrant player murals for day & night matches.',
    badge: '5-A-Side Sports Arena',
    badgeIcon: 'sports_soccer',
    location: 'Outdoor Sports Arena · Naveda Complex',
    accent: 'emerald' as const,
    highlights: ['Pristine all-weather striped synthetic turf', 'Super Eagles wall murals & goals', 'LED arena floodlights for evening games']
  },
  poolVines: {
    id: 'pool-vines',
    imageSrc: '/assets/aistudio/naveda2222_ebc5846d.jpg',
    title: 'The Champions Billiards & Snooker Lounge',
    subtitle: 'Rack up under lush botanical hanging greenery, warm ambient brass lamps, and bar seating with chilled draught beer towers.',
    badge: 'Indoor Billiards Club',
    badgeIcon: 'sports_bar',
    location: 'Upper Lounge · Naveda Complex',
    accent: 'emerald' as const,
    highlights: ['Pro-standard 8-ball & 9-ball tables', 'Lush hanging vines & warm pendant lamps', 'Full bar & cocktail table service']
  },
  poolTerrace: {
    id: 'pool-terrace',
    imageSrc: '/assets/aistudio/naveda_22_aaf946fe.jpg',
    title: 'Terrace Pool Table & Alfresco Garden View',
    subtitle: 'Enjoy billiards overlooking open-air tropical palms, industrial acoustic ceilings, custom pendant lighting, and refreshing natural breezes.',
    badge: 'Open-Air Pool Terrace',
    badgeIcon: 'deck',
    location: 'Garden Terrace · Naveda Complex',
    accent: 'cyan' as const,
    highlights: ['Natural airflow and palm tree vistas', 'Custom brass lighting fixtures', 'Ideal for sunset drinks & evening chill']
  }
} as const;

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'tango' | 'mains' | 'native' | 'grills' | 'seafood' | 'cocktails' | 'brews';
  categoryTitle: string;
  description: string;
  price: string;
  image: string;
  portion: string;
  prepTime: string;
  spicyLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  badge?: string;
  ingredients: string[];
}

export const NAVEDA_SITE = {
  name: 'Naveda World Bites And Brews',
  shortName: 'Naveda World',
  tagline: 'Fine Dining, Crafted Cocktails, Weekend Live Band, Highlife Musicals, Recreation & Sports',
  city: 'Umuahia',
  state: 'Abia State',
  country: 'Nigeria',
  address: 'Okwuta road by Ahiaeke junction, Umuahia 440103, Abia State',
  landmark: 'Ahiaeke Junction along Okwuta Road',
  plusCode: 'GG9H+4R8',
  phoneDisplay: '+234 903 977 7679',
  phoneRaw: '+2349039777679',
  whatsappRaw: '2349039777679',
  whatsappUrl: 'https://wa.me/2349039777679?text=Hello%20Naveda%20World%2C%20I%20would%20like%20to%20make%20an%20inquiry%20or%20reservation.',
  googleMapsUrl: 'https://www.google.com/maps/place/Naveda+World+Bites+And+Brews/@5.5178125,7.5295625,17z/data=!3m1!4b1!4m6!3m5!1s0x1042db97b51d5c8f:0x4396ef5b2660ab1f!8m2!3d5.5178125!4d7.5295625!16s%2Fg%2F11ymhzp50k',
  hours: 'Open 24 Hours · Every Single Day',
  logoSrc: '/assets/aistudio/naveda_logo.png'
};

export const NAVEDA_PITCH_PACKAGES = [
  {
    id: 'day-pitch',
    title: 'Daylight 5-A-Side Match Slot',
    time: '6:00 AM – 6:00 PM',
    rate: '₦15,000 / hour',
    badge: 'Popular',
    perks: ['Pristine striped synthetic turf access', 'High-tensile perimeter safety net', 'Match football & corner flags included', 'Shower & changing facilities']
  },
  {
    id: 'night-floodlit',
    title: 'Night Floodlit Championship Slot',
    time: '6:00 PM – Midnight & Late Night',
    rate: '₦22,000 / hour',
    badge: 'Vibrant Night Sports',
    perks: ['Full LED arena floodlighting', 'Stadium sound commentary option', 'Pitch-side cold towels & hydration station', 'Guaranteed spectator seating']
  },
  {
    id: 'tournament-league',
    title: 'Weekend Tournament & Corporate Cup',
    time: 'Half Day / Full Day Blocks',
    rate: 'Custom Pricing on WhatsApp',
    badge: 'Corporate / League',
    perks: ['Referee & linesmen coordination', 'Scoreboard & PA system', 'Tailored barbecue & beer packages', 'Trophy & medal presentation area']
  }
];

export const NAVEDA_BILLIARDS_DETAILS = [
  {
    title: 'Tournament Slate Tables',
    description: 'Precision-leveled felt tables with professional Belgian Aramith balls and balanced cues for competitive 8-ball and 9-ball play.',
    icon: 'sports_bar'
  },
  {
    title: 'Tropical Lounge & Bar Seating',
    description: 'Surrounded by botanical climbing greenery, warm industrial pendant lights, and high-top bar tables with direct waiter service.',
    icon: 'local_cafe'
  },
  {
    title: 'Chilled Brews & Finger Bites',
    description: 'Enjoy spicy chicken wings, peppered gizzard, cold Heineken, Star Radler, and signature Chapman while waiting for your next turn.',
    icon: 'sports_esports'
  }
];

// FILTERED DISHES: Exactly 1 unique dish to 1 unique spectacular photo (Zero duplicates!)
export const NAVEDA_MENU_ITEMS: MenuItem[] = [
  {
    id: 'pepper-soup-rolls',
    name: 'Naveda Signature Royal Pepper Soup',
    category: 'starters',
    categoryTitle: 'Starters & Native Pepper Soups',
    description: 'Steaming hot aromatic broth brewed with uziza, uda, and calabash nutmeg, served with warm crusty bread rolls. Choice of fresh catfish, tender goat meat, or oxtail.',
    price: '₦12,100',
    image: '/images/dishes/pss.jpg',
    portion: 'Large Soup Bowl',
    prepTime: '15 mins',
    spicyLevel: 'Hot',
    badge: 'Signature Broth',
    ingredients: ['Fresh Catfish or Goat Meat', 'Uziza Pods', 'Ehuru Nutmeg', 'Native Chili', 'Warm Bread Rolls']
  },
  {
    id: 'hot-chicken-wings',
    name: 'Glazed Hot Chicken Wings',
    category: 'starters',
    categoryTitle: 'Starters & Native Pepper Soups',
    description: 'Crispy fired wings drenched in our house chili-tomato glaze with caramelized onions and green pepper garnish.',
    price: '₦11,000',
    image: '/images/dishes/hcw.jpg',
    portion: 'Platter of 8 Wings',
    prepTime: '15 mins',
    spicyLevel: 'Extra Hot',
    badge: 'Finger Food Hit',
    ingredients: ['Prime Chicken Wings', 'Scotch Bonnet Glaze', 'Plum Tomatoes', 'Sweet Bell Peppers']
  },
  {
    id: 'oil-bean-salad-ugba',
    name: 'Authentic Eastern Oil Bean Salad (Ugba)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Shredded oil bean seed (ugba) delicately tossed in rich native potash emulsion with stockfish slivers, utazi leaves, and garden egg slices.',
    price: '₦11,000',
    image: '/images/dishes/obs.jpg',
    portion: 'Native Clay Bowl',
    prepTime: '10 mins',
    spicyLevel: 'Medium',
    badge: 'Igbo Heritage',
    ingredients: ['Fermented Oil Bean Seeds', 'Stockfish Fillets', 'Native Potash Emulsion', 'Utazi Greens', 'Garden Egg']
  },
  {
    id: 'traditional-nkwobi',
    name: 'Traditional Spicy Nkwobi in Mortar',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Succulent cuts of cow foot simmered in spicy palm oil paste, spiced with ehuru, potash emulsion, and topped with fresh utazi leaves in a wooden mortar.',
    price: '₦13,200',
    image: '/images/dishes/nkw.jpg',
    portion: 'Carved Wooden Mortar',
    prepTime: '15 mins',
    spicyLevel: 'Hot',
    badge: 'Bestseller',
    ingredients: ['Tender Cow Foot', 'Utazi Leaves', 'Ehuru Nutmeg', 'Native Potash Emulsion', 'Purple Onions']
  },
  {
    id: 'spicy-stewed-snails',
    name: 'Sautéed Spicy Giant African Snails',
    category: 'starters',
    categoryTitle: 'Starters & Native Pepper Soups',
    description: 'Crunchy, tender giant African land snails slow-braised in a savory habanero, bell pepper, and sweet onion sauté.',
    price: '₦11,000',
    image: '/images/dishes/sss.jpg',
    portion: 'Appetizer Bowl',
    prepTime: '15 mins',
    spicyLevel: 'Extra Hot',
    badge: 'Exotic Native',
    ingredients: ['Giant Land Snails', 'Habanero Chili', 'Bell Peppers', 'Caramelized Onions']
  },
  {
    id: 'spicy-stewed-prawns',
    name: 'Spicy Stewed Jumbo Ocean Prawns',
    category: 'seafood',
    categoryTitle: 'Ocean Seafood Specialties',
    description: 'Fresh Atlantic jumbo prawns simmered in a rich tomato, garlic, sweet onion, and green bell pepper reduction.',
    price: '₦13,200',
    image: '/images/dishes/sspn.jpg',
    portion: 'Entrée Bowl',
    prepTime: '15 mins',
    spicyLevel: 'Medium',
    badge: 'Fresh Catch',
    ingredients: ['Jumbo Ocean Prawns', 'Tomato-Chili Reduction', 'Green Bell Peppers', 'Garlic Herbs']
  },
  {
    id: 'crispy-jumbo-prawns',
    name: 'Crispy Golden Panko Prawns',
    category: 'tango',
    categoryTitle: 'Tango for Two (Sharing Platters)',
    description: 'Crisp golden panko-crusted jumbo prawns served with homemade herb tartar sauce and spicy sweet chili dip.',
    price: '₦20,000',
    image: '/images/dishes/cps.jpg',
    portion: 'Sharing Platter (2-3 Guests)',
    prepTime: '20 mins',
    spicyLevel: 'Mild',
    badge: 'Seafood Sharing',
    ingredients: ['Jumbo Tiger Prawns', 'Panko Breadcrumbs', 'Tartar Herb Dip', 'Spicy Sweet Chili']
  },
  {
    id: 'grand-seafood-basket',
    name: 'Grand Seafood Basket & French Fries',
    category: 'tango',
    categoryTitle: 'Tango for Two (Sharing Platters)',
    description: 'Jumbo prawns, crispy golden fish fingers, tender calamari rings, and french fries served with house sauces.',
    price: '₦29,500',
    image: '/images/dishes/sbs.jpg',
    portion: 'Feast Board (3-4 Guests)',
    prepTime: '25 mins',
    spicyLevel: 'Mild',
    badge: 'Ultimate Sharing',
    ingredients: ['Tiger Prawns', 'Calamari Rings', 'Fish Fingers', 'Crispy Fries', 'House Dips']
  },
  {
    id: 'chefs-combo-platter',
    name: 'Chef’s Special Sunrise Combo Platter',
    category: 'tango',
    categoryTitle: 'Tango for Two (Sharing Platters)',
    description: 'Sweet golden fried plantains (dodo) paired with fluffy country herb omelette or rich native vegetable sauce and protein skewers.',
    price: '₦18,000',
    image: '/images/dishes/ccp.jpg',
    portion: 'Generous Sharing Platter',
    prepTime: '20 mins',
    spicyLevel: 'Mild',
    badge: 'Breakfast & Brunch',
    ingredients: ['Ripe Dodo Plantain', 'Country Herb Eggs', 'Efo Riro Sauce', 'Beef Sausages']
  },
  {
    id: 'seafood-symphony-pot',
    name: 'Fisherman’s Royal Seafood Symphony',
    category: 'seafood',
    categoryTitle: 'Ocean Seafood Specialties',
    description: 'A luxurious stew of jumbo prawns, fresh river fish cutlets, whole blue sea crabs, and tender calamari in aromatic spicy herb broth.',
    price: '₦19,250',
    image: '/images/dishes/sms.jpg',
    portion: 'Deep Seafood Bowl',
    prepTime: '25 mins',
    spicyLevel: 'Hot',
    badge: 'Chef Masterpiece',
    ingredients: ['Atlantic Tiger Prawns', 'Whole River Fish', 'Sea Crabs', 'Calamari', 'Spicy Broth']
  },
  {
    id: 'spicy-stewed-oxtail',
    name: 'Braised Spicy Stewed Oxtail',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Tender braised oxtail simmered slowly with scotch bonnets, ripe tomatoes, sweet onions, served with savory herb rice or crispy french fries.',
    price: '₦18,000',
    image: '/images/dishes/sso.jpg',
    portion: 'Entrée Plate',
    prepTime: '20 mins',
    spicyLevel: 'Hot',
    badge: 'Melt-in-Mouth',
    ingredients: ['Prime Oxtail Cuts', 'Habanero Chili', 'Bell Peppers', 'Choice of Rice or Fries']
  },
  {
    id: 'spicy-stewed-fish',
    name: 'Whole Spicy Stewed Fresh Fish',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Fresh whole river fish braised in a rich, spicy tomato, onion, and bell pepper sauce with your choice of savory rice or fries.',
    price: '₦16,500',
    image: '/images/dishes/ssf.jpg',
    portion: 'Whole Fish Plate',
    prepTime: '25 mins',
    spicyLevel: 'Hot',
    badge: 'Catfish Favorite',
    ingredients: ['Whole Catfish or Croaker', 'Spicy Tomato Sauce', 'Sliced Bell Peppers', 'Savory Herb Rice']
  },
  {
    id: 'spicy-stewed-chicken',
    name: 'Spicy Country Stewed Chicken',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Golden-fried farm chicken quarters simmered in a savory tomato and onion sauce with your choice of french fries or white rice.',
    price: '₦16,000',
    image: '/images/dishes/ssc.jpg',
    portion: 'Entrée Plate',
    prepTime: '15 mins',
    spicyLevel: 'Medium',
    ingredients: ['Farm Chicken Quarters', 'Plum Tomato Sauce', 'Spring Onions', 'Fragrant Rice']
  },
  {
    id: 'yam-pottage-asaro',
    name: 'Traditional Yam Pottage (Asaro)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Soft yam tubers simmered in pure palm oil, smoked crayfish, aromatic local spices, and tender beef cuts.',
    price: '₦14,000',
    image: '/images/dishes/porr.jpg',
    portion: 'Native Stew Bowl',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    badge: 'Comfort Food',
    ingredients: ['Puna Yam Cubes', 'Pure Palm Oil', 'Ground Crayfish', 'Tender Beef', 'Native Peppers']
  },
  {
    id: 'chicken-french-fries',
    name: 'Crispy Spiced Chicken & French Fries',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Crisp seasoned quarter chicken served with golden crunchy french fries and house barbecue dip.',
    price: '₦15,000',
    image: '/images/dishes/fri.jpg',
    portion: 'Platter',
    prepTime: '15 mins',
    spicyLevel: 'Mild',
    ingredients: ['Spiced Quarter Chicken', 'French Fries', 'Barbecue Dip', 'Fresh Slaw']
  },
  {
    id: 'seafood-okro-soup',
    name: 'Royal Fresh Seafood Okro Soup',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Finely diced crunchy fresh okro cooked with whole river fish, tiger prawns, shrimps, and crabs in fragrant palm oil.',
    price: '₦18,500',
    image: '/images/dishes/sos.jpg',
    portion: 'Native Soup Pot with Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    badge: 'Popular Native',
    ingredients: ['Fresh Diced Okro', 'River Catfish', 'Tiger Prawns', 'Shrimps', 'Pounded Yam']
  },
  {
    id: 'royal-seafood-pot',
    name: 'Grand Fisherman’s Native Seafood Pot',
    category: 'seafood',
    categoryTitle: 'Ocean Seafood Specialties',
    description: 'A lavish medley of ocean prawns, sea snails, and crab simmered with wild native herbs and served with your choice of swallow.',
    price: '₦18,500',
    image: '/images/dishes/ssss.jpg',
    portion: 'Entrée Pot with Swallow',
    prepTime: '25 mins',
    spicyLevel: 'Hot',
    badge: 'Grand Pot',
    ingredients: ['Crabs & Jumbo Prawns', 'Sea Snails', 'Pumpkin Greens', 'Uziza Spices']
  },
  {
    id: 'jollof-rice-fiesta',
    name: 'Naveda Firewood Jollof Rice Fiesta',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Smoky party jollof rice cooked in rich habanero tomato stock, tossed with diced seasoned chicken, sweet shrimps, and unshelled prawns.',
    price: '₦18,000',
    image: '/images/dishes/jrf.jpg',
    portion: 'Fiesta Entrée',
    prepTime: '15 mins',
    spicyLevel: 'Medium',
    badge: 'Iconic Jollof',
    ingredients: ['Long Grain Rice', 'Habanero Pepper Puree', 'Smoked Chicken', 'Ocean Prawns', 'Dodo']
  },
  {
    id: 'fried-rice-fiesta',
    name: 'Wok-Tossed Fried Rice Fiesta',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Wok-seared seasoned rice loaded with sweet green peas, sweetcorn, tender diced chicken breast, and ocean prawns.',
    price: '₦18,000',
    image: '/images/dishes/frf.jpg',
    portion: 'Fiesta Entrée',
    prepTime: '15 mins',
    spicyLevel: 'Mild',
    ingredients: ['Basmati Rice', 'Green Sweet Peas', 'Diced Chicken', 'Tiger Prawns', 'Sweet Corn']
  },
  {
    id: 'yam-pottage-special',
    name: 'Special Yam Pottage with Snails & Beef',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'A decadent bowl of mashed yam porridge prepared with slow-braised giant snails, tender beef, and dried crayfish.',
    price: '₦15,500',
    image: '/images/dishes/yps.jpg',
    portion: 'Deep Bowl',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    badge: 'Special Pottage',
    ingredients: ['Yam Tubers', 'Giant Land Snails', 'Tender Beef', 'Crayfish', 'Palm Oil']
  },
  {
    id: 'edikang-ikong-soup',
    name: 'Authentic Edikang Ikong Soup',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Nutrient-rich Calabar vegetable delicacy prepared with fresh pumpkin leaves (ugwu), waterleaf, stockfish head, dried fish, and tender beef.',
    price: '₦18,000',
    image: '/images/dishes/bitter.jpg',
    portion: 'Native Soup Pot with Swallow',
    prepTime: '25 mins',
    spicyLevel: 'Medium',
    badge: 'Calabar Classic',
    ingredients: ['Pumpkin Leaves (Ugwu)', 'Waterleaf', 'Stockfish Head', 'Crayfish', 'Choice Swallow']
  },
  {
    id: 'ofe-nsala-white-soup',
    name: 'Royal Ofe Nsala (Igbo White Soup)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Traditional Igbo white soup thickened with fresh pounded yam paste, scented with aromatic uziza seeds and fresh catfish.',
    price: '₦18,000',
    image: '/images/dishes/aes.jpg',
    portion: 'Clay Pot with Pounded Yam',
    prepTime: '25 mins',
    spicyLevel: 'Medium',
    badge: 'Royal Igbo Soup',
    ingredients: ['Fresh River Catfish', 'Yam Paste Thickener', 'Uziza Seed', 'Utazi Herb', 'Fluffy Pounded Yam']
  },
  {
    id: 'afang-soup-delicacy',
    name: 'Efik-Ibibio Royal Afang Soup',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Wild okazi leaves ground fine and simmered with tender waterleaf, periwinkles in shells, kpomo, and assorted smoked meats.',
    price: '₦18,000',
    image: '/images/dishes/eis.jpg',
    portion: 'Native Pot with Swallow',
    prepTime: '25 mins',
    spicyLevel: 'Hot',
    badge: 'Heritage Soup',
    ingredients: ['Wild Okazi Leaves', 'Waterleaf', 'Periwinkles', 'Smoked Kpomo', 'Stockfish']
  },
  {
    id: 'efo-riro-elegusi',
    name: 'Yoruba-Style Efo Riro Elegusi',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Rich spinach greens stewed with fermented locust beans (iru), dried fish, shaki cow tripe, and coarse pepper sauce.',
    price: '₦18,000',
    image: '/images/dishes/efor.jpg',
    portion: 'Native Bowl with Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Hot',
    badge: 'Locust Bean Stew',
    ingredients: ['Fresh Spinach Greens', 'Locust Beans (Iru)', 'Shaki Cow Tripe', 'Smoked Fish', 'Pounded Yam']
  },
  {
    id: 'ogbono-draw-soup',
    name: 'Slow-Simmered Ogbono Draw Soup',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Ground wild African bush mango seeds simmered into a rich aromatic draw soup with bitterleaf, stockfish, and assorted meats.',
    price: '₦18,000',
    image: '/images/dishes/ogbo.jpg',
    portion: 'Native Pot with Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    ingredients: ['Wild Ogbono Seeds', 'Washed Bitterleaf', 'Smoked Fish', 'Assorted Beef', 'Garri or Semo']
  },
  {
    id: 'fried-egusi-soup',
    name: 'Special Pan-Fried Egusi Soup',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Ground melon seeds pan-fried in pure palm oil with pumpkin greens, dried stockfish head, tender cow tripe, and jumbo crayfish.',
    price: '₦18,000',
    image: '/images/dishes/egus.jpg',
    portion: 'Native Pot with Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    badge: 'All-Time Favorite',
    ingredients: ['Ground Melon Seeds', 'Ugwu Pumpkin Greens', 'Stockfish', 'Shaki & Beef', 'Pounded Yam']
  },
  {
    id: 'banga-soup-ofe-akwu',
    name: 'Traditional Banga Soup (Ofe Akwu)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Extract of fresh palm fruit kernels infused with native beletete and oburunbebe sticks, simmered with fresh catfish and meats.',
    price: '₦18,000',
    image: '/images/dishes/banga.jpg',
    portion: 'Native Pot with Swallow or Rice',
    prepTime: '30 mins',
    spicyLevel: 'Medium',
    badge: 'Delta Heritage',
    ingredients: ['Fresh Palm Nut Extract', 'Catfish Fillet', 'Beletete Leaves', 'Oburunbebe Spice Stick', 'Starch or Semo']
  },
  {
    id: 'ofe-onugbu-bitterleaf',
    name: 'Igbo Traditional Bitter Leaf Soup (Ofe Onugbu)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Washed wild bitter leaves thickened with slow-boiled cocoyam paste, scented with ogiri Igbo and smoked catfish.',
    price: '₦18,000',
    image: '/images/dishes/afang.jpg',
    portion: 'Native Pot with Swallow',
    prepTime: '25 mins',
    spicyLevel: 'Hot',
    badge: 'Igbo Classic',
    ingredients: ['Washed Bitter Leaves', 'Cocoyam Paste', 'Ogiri Igbo Seasoning', 'Dried Fish', 'Pounded Yam']
  },
  {
    id: 'otong-native-soup',
    name: 'Otong Vegetable Okro Pot',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'A classic Cross River delicacy featuring tender diced okro, pumpkin leaves, and shredded dry fish cooked with native spices.',
    price: '₦18,000',
    image: '/images/dishes/otong.jpg',
    portion: 'Native Pot with Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    ingredients: ['Fresh Diced Okro', 'Pumpkin Leaves', 'Dry Fish Slivers', 'Native Crayfish', 'Choice Swallow']
  },
  {
    id: 'ofe-oha-soup',
    name: 'Royal Eastern Oha Soup (Ofe Oha)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Delicate young oha leaves torn by hand, thickened with achi seed flour and cocoyam, enriched with smoked fish and cow tripe.',
    price: '₦18,000',
    image: '/images/dishes/oha.jpg',
    portion: 'Clay Pot with Pounded Yam',
    prepTime: '25 mins',
    spicyLevel: 'Medium',
    badge: 'Igbo Feast Soup',
    ingredients: ['Fresh Oha Leaves', 'Achi Flour Thickener', 'Ogiri Seasoning', 'Assorted Meats', 'Pounded Yam']
  },
  {
    id: 'obedindin-meat-medley',
    name: 'Obedindin Peppered Meat Medley',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Assorted slow-braised meats tossed in rich caramelized palm oil pepper reduction with fried ripe plantains or white rice.',
    price: '₦14,000',
    image: '/images/dishes/obe.jpg',
    portion: 'Platter',
    prepTime: '20 mins',
    spicyLevel: 'Extra Hot',
    badge: 'Spicy Specialty',
    ingredients: ['Assorted Beef & Kpomo', 'Palm Oil Reduction', 'Habanero Chili', 'Fried Plantains']
  },
  {
    id: 'slow-cooked-beans',
    name: 'Slow-Cooked Honey Beans (Ewa Aganyin Style)',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Melted tender honey beans accompanied by blackened caramelized chili-palm oil sauce, served with fried sweet dodo.',
    price: '₦18,000',
    image: '/images/dishes/slowcooked.jpg',
    portion: 'Entrée Bowl',
    prepTime: '20 mins',
    spicyLevel: 'Hot',
    badge: 'Rich Comfort',
    ingredients: ['Oloyin Honey Beans', 'Caramelized Onion Chili Oil', 'Ripe Sweet Plantain']
  },
  {
    id: 'farmhouse-pottage',
    name: 'Chef’s Special Farmhouse Pottage',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'A comforting stew combining slow-simmered beans, yam cubes, and ripe sweet plantains infused with palm oil and crayfish.',
    price: '₦18,000',
    image: '/images/dishes/chefsf.jpg',
    portion: 'Generous Bowl',
    prepTime: '25 mins',
    spicyLevel: 'Medium',
    badge: 'Healthy Native',
    ingredients: ['Beans & Yam Cubes', 'Sweet Plantain Dices', 'Pure Palm Oil', 'Ground Crayfish']
  },
  {
    id: 'peanut-chicken-curry',
    name: 'Savory Groundnut Peanut Chicken',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Tender chicken breast pieces braised in rich roasted peanut and okra reduction, served with fluffy white rice or pounded yam.',
    price: '₦16,000',
    image: '/images/dishes/peachi.jpg',
    portion: 'Entrée Plate',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    badge: 'Pan-African',
    ingredients: ['Chicken Breast Cuts', 'Roasted Peanut Paste', 'Tender Okro', 'Fragrant White Rice']
  },
  {
    id: 'eastern-goat-curry',
    name: 'Eastern Spiced Goat Meat Curry',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Tender goat meat slow-simmered with Eastern-style curry spices, ginger, and potatoes, served over fluffy white rice.',
    price: '₦15,500',
    image: '/images/dishes/goatcurry.jpg',
    portion: 'Entrée Plate',
    prepTime: '20 mins',
    spicyLevel: 'Hot',
    ingredients: ['Goat Meat', 'Curry Spices & Thyme', 'Diced Potatoes', 'Fluffy White Rice']
  },
  {
    id: 'chilli-chicken-rice',
    name: 'Chilli Chicken with Savory Herb Rice',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Crisp chicken breast fillets tossed in spicy sweet chili tomato glaze, accompanied by chef’s savory herb rice or french fries.',
    price: '₦16,000',
    image: '/images/dishes/chilchi.jpg',
    portion: 'Entrée Plate',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    ingredients: ['Chicken Breast Fillets', 'Sweet Chili Glaze', 'Savory Herb Rice', 'Sweet Peppers']
  },
  {
    id: 'savoury-crispy-prawns',
    name: 'Savoury Feast with Jumbo Crispy Prawns',
    category: 'mains',
    categoryTitle: 'Pan-African Entrées',
    description: 'Chef’s savory vegetable rice cooked with green peppers and sweet onions, topped with golden crispy fried tiger prawns.',
    price: '₦18,700',
    image: '/images/dishes/savoury.jpg',
    portion: 'Entrée Plate',
    prepTime: '20 mins',
    spicyLevel: 'Mild',
    ingredients: ['Tiger Prawns', 'Savory Veg Rice', 'Sweet Bell Peppers', 'House Slaw']
  },
  {
    id: 'tropical-island-prawns',
    name: 'Tropical Island Prawns in Sweet Pepper Glaze',
    category: 'seafood',
    categoryTitle: 'Ocean Seafood Specialties',
    description: 'Jumbo prawns seared with tropical sweet pepper, tomato, and onion glaze, served alongside fried sweet plantain dodo.',
    price: '₦18,000',
    image: '/images/dishes/tropical.jpg',
    portion: 'Entrée Plate',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    badge: 'Tropical Special',
    ingredients: ['Jumbo Tiger Prawns', 'Sweet Pepper Glaze', 'Ripe Plantain Dodo', 'Fresh Lime']
  }
];

export const NAVEDA_VIP_BOTTLES = [
  {
    name: 'Moët & Chandon Nectar Impérial Rosé',
    category: 'Champagne',
    price: '₦145,000',
    badge: 'Club Favorite',
    description: 'Demi-sec rosé champagne combining richness, voluptuous strawberry accents, and celebratory prestige.'
  },
  {
    name: 'Hennessy X.O Extra Old Cognac',
    category: 'Cognac',
    price: '₦320,000',
    badge: 'VIP Ultra Prestige',
    description: 'Deep amber with rich candied fruits, spicy wild cocoa, and velvety aged French oak notes.'
  },
  {
    name: 'Don Julio 1942 Añejo Tequila',
    category: 'Tequila',
    price: '₦380,000',
    badge: 'Nightlife Royalty',
    description: 'Handcrafted in small batches, aged for 2.5 years with warm oak, vanilla, and roasted agave complexity.'
  },
  {
    name: 'Johnnie Walker Blue Label',
    category: 'Blended Scotch',
    price: '₦290,000',
    badge: 'Rare Blend',
    description: 'Only 1 in 10,000 casks makes the blend; velvety honey, hazelnut, rose petals, and wisps of smoke.'
  }
];

export const NAVEDA_MART_HIGHLIGHTS = [
  {
    name: '7-Piece Tri-Ply Stainless Steel Cookware Set',
    category: 'Cookware & Kitchen',
    price: '₦88,500',
    badge: 'MasterChef Pro',
    description: 'Heavy-gauge induction bottom, tempered glass covers, and cool-touch handles for African cooking heat.'
  },
  {
    name: 'Authentic Carved Hardwood Iroko Mortar & Pestle',
    category: 'Native Kitchen Heritage',
    price: '₦18,500',
    badge: 'Native Essential',
    description: 'Hand-carved solid Iroko timber ideal for pounding sweet yam, crushing habaneros, and grinding utazi herbs.'
  },
  {
    name: 'Granite Stone 5-Layer Non-Stick Wok & Pan Set',
    category: 'Healthy Cooking',
    price: '₦45,000',
    badge: 'Zero Stick',
    description: 'Scratch-resistant mineral granite coating for frying sweet dodo plantain and fish without burning or excess oil.'
  },
  {
    name: 'Professional 6-Piece High-Carbon Chef Knife Set',
    category: 'Kitchen Cutlery',
    price: '₦32,500',
    badge: 'Chef Choice',
    description: 'Includes meat cleaver, slicing knife, paring knife, honing steel, and pine counter block.'
  }
];
