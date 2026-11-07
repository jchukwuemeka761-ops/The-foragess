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
  category: 'starters' | 'tango' | 'mains' | 'native' | 'grills' | 'cocktails' | 'brews';
  categoryTitle: string;
  description: string;
  price: string;
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

export const NAVEDA_MENU_ITEMS: MenuItem[] = [
  {
    id: 'spicy-african-snails',
    name: 'Sautéed Giant African Snails (Congo Meat)',
    category: 'starters',
    categoryTitle: 'Starters & Native Pepper Soups',
    description: 'Tender giant African land snails slow-braised in a spicy habanero, bell pepper, and sweet onion reduction.',
    price: '₦11,000',
    portion: 'Starter Bowl',
    prepTime: '15 mins',
    spicyLevel: 'Extra Hot',
    badge: 'Native Signature',
    ingredients: ['Giant Land Snails', 'Habanero Chili', 'Bell Peppers', 'Caramelized Onions', 'Native Herbs']
  },
  {
    id: 'catfish-pepper-soup',
    name: 'Fresh Catfish Point & Kill Pepper Soup',
    category: 'starters',
    categoryTitle: 'Starters & Native Pepper Soups',
    description: 'Steaming hot aromatic broth brewed with uziza, uda, and calabash nutmeg with fresh river catfish cutlets.',
    price: '₦9,500',
    portion: 'Large Soup Bowl',
    prepTime: '20 mins',
    spicyLevel: 'Hot',
    badge: 'Customer Favorite',
    ingredients: ['Fresh Catfish', 'Uziza Leaves', 'Uda Pods', 'Ehuru Nutmeg', 'Aromatic Broth']
  },
  {
    id: 'spicy-goat-asun',
    name: 'Smoked Peppered Goat Meat (Asun Fiesta)',
    category: 'starters',
    categoryTitle: 'Starters & Native Pepper Soups',
    description: 'Tender cuts of wood-smoked goat meat tossed with fiery habaneros, spring onions, and bell peppers.',
    price: '₦8,000',
    portion: 'Sharing Platter',
    prepTime: '15 mins',
    spicyLevel: 'Extra Hot',
    badge: 'Bestseller',
    ingredients: ['Wood-Smoked Goat Meat', 'Scotch Bonnet', 'Spring Onions', 'Chili Flakes']
  },
  {
    id: 'tango-crispy-prawns',
    name: 'Crispy Jumbo Tiger Prawns Platter',
    category: 'tango',
    categoryTitle: 'Tango for Two (Sharing Platters)',
    description: 'Golden panko-crusted jumbo ocean prawns served with house herb tartar sauce and spicy sweet chili dip.',
    price: '₦18,500',
    portion: 'Sharing (2-3 Guests)',
    prepTime: '20 mins',
    spicyLevel: 'Mild',
    badge: 'Seafood Special',
    ingredients: ['Tiger Prawns', 'Panko Crumb', 'Tartar Dip', 'Sweet Chili Glaze']
  },
  {
    id: 'tango-mixed-grill',
    name: 'Naveda Grand Mixed Grill Board',
    category: 'tango',
    categoryTitle: 'Tango for Two (Sharing Platters)',
    description: 'Sumptuous mountain of spicy grilled chicken wings, beef suya skewers, lamb chops, fried plantains, and yam chips.',
    price: '₦26,000',
    portion: 'Generous Board (3-4 Guests)',
    prepTime: '25 mins',
    spicyLevel: 'Medium',
    badge: 'Ultimate Feast',
    ingredients: ['Chicken Wings', 'Beef Suya', 'Lamb Chops', 'Dodo Plantains', 'Crispy Yam Chips']
  },
  {
    id: 'authentic-nkwobi',
    name: 'Igbo Traditional Spicy Nkwobi',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Succulent cow foot simmered in rich spicy palm oil paste (ehuru, potash, utazi leaves) served piping in traditional wooden mortar.',
    price: '₦7,500',
    portion: 'Carved Mortar Bowl',
    prepTime: '15 mins',
    spicyLevel: 'Hot',
    badge: 'Igbo Heritage Classic',
    ingredients: ['Tender Cow Foot', 'Utazi Leaves', 'Ehuru', 'Native Potash Emulsion', 'Red Onions']
  },
  {
    id: 'ofe-nsala-pounded-yam',
    name: 'Ofe Nsala (White Soup) with Pounded Yam',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'The legendary royal Igbo white soup thickened with fresh yam paste, scented with utazi and uziza, loaded with fresh catfish or goat meat.',
    price: '₦12,500',
    portion: 'Full Entrée with Choice Swallow',
    prepTime: '25 mins',
    spicyLevel: 'Medium',
    badge: 'Chef Specialty',
    ingredients: ['Catfish or Goat Meat', 'Yam Paste Thickener', 'Utazi', 'Uziza Seed', 'Fluffy Pounded Yam']
  },
  {
    id: 'rich-egusi-soup',
    name: 'Special Fried Egusi Soup & Assorted Meats',
    category: 'native',
    categoryTitle: 'Eastern Nigerian Native Delicacies',
    description: 'Melon seed soup pan-fried with palm oil, bitterleaf or spinach, dried stockfish, cow tripe, beef, and jumbo prawns.',
    price: '₦11,000',
    portion: 'Full Entrée with Choice Swallow',
    prepTime: '20 mins',
    spicyLevel: 'Medium',
    ingredients: ['Ground Melon Seeds', 'Stockfish Head', 'Shaki & Beef', 'Ugwu Greens', 'Palm Oil']
  },
  {
    id: 'smoky-jollof-chicken',
    name: 'Firewood Smoky Nigerian Jollof Rice',
    category: 'mains',
    categoryTitle: 'Out of Africa Mains',
    description: 'Authentic party-style smoky long grain rice cooked in rich tomato-habanero broth with crispy spiced half chicken and fried sweet dodo.',
    price: '₦9,000',
    portion: 'Entrée Platter',
    prepTime: '15 mins',
    spicyLevel: 'Medium',
    badge: 'Iconic African',
    ingredients: ['Long Grain Basmati', 'Plum Tomatoes', 'Habanero Chili', 'Quarter Spiced Chicken', 'Dodo']
  },
  {
    id: 'grilled-croaker-fish',
    name: 'Whole Spicy Grilled Catfish & Roast Yam',
    category: 'grills',
    categoryTitle: 'Charcoal Grills & Barbecue',
    description: 'Freshly caught river catfish glazed with fiery suya pepper paste, slow-grilled over charcoal embers, garnished with red onions and utazi.',
    price: '₦14,000',
    portion: 'Whole Fish Platter',
    prepTime: '30 mins',
    spicyLevel: 'Hot',
    badge: 'Fresh Off Grill',
    ingredients: ['Live Catfish', 'Suya Spices', 'Charcoal Smoke', 'Roasted Yam Chips', 'Pepper Sauce']
  },
  {
    id: 'naveda-signature-chapman',
    name: 'Naveda Royal Nigerian Chapman',
    category: 'cocktails',
    categoryTitle: 'Crafted Cocktails & Refreshers',
    description: 'Fanta, Sprite, Angostura aromatic bitters, freshly pressed lime, pomegranate grenadine, cucumber slices, and lemon wheel.',
    price: '₦4,500',
    portion: 'Tall Chilled Glass',
    prepTime: '5 mins',
    spicyLevel: 'Mild',
    badge: 'National Favorite',
    ingredients: ['Angostura Bitters', 'Grenadine', 'Citrus Sodas', 'Cucumber Wheel', 'Mint Sprig']
  },
  {
    id: 'hennessy-passion-cocktail',
    name: 'Umuahia Twilight Cognac Sour',
    category: 'cocktails',
    categoryTitle: 'Crafted Cocktails & Refreshers',
    description: 'Hennessy V.S, fresh passionfruit pulp, fresh lime juice, touch of Nigerian honey, and aromatic orange zest.',
    price: '₦9,500',
    portion: 'Coupe Glass',
    prepTime: '5 mins',
    spicyLevel: 'Mild',
    badge: 'VIP Signature',
    ingredients: ['Hennessy Cognac', 'Passion Fruit', 'Fresh Lime', 'Organic Honey', 'Orange Peel']
  },
  {
    id: 'beer-tower-heineken',
    name: 'Chilled 3-Liter Heineken Dispenser Tower',
    category: 'brews',
    categoryTitle: 'Chilled Brews & Draught Towers',
    description: 'Sub-zero frosted 3-liter beer dispensing tower kept ice cold with center cooling rod for matchday groups.',
    price: '₦22,000',
    portion: '3-Liter Dispenser Tower',
    prepTime: 'Immediate',
    badge: 'Matchday Essential',
    ingredients: ['Heineken Premium Lager', 'Sub-Zero Cooling Core']
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
