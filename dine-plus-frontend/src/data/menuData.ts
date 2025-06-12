import { MenuItem } from '../types';

export const restaurantMenuItems: MenuItem[] = [
  // BEVERAGES - Natural & Refreshing
  {
    id: 'bev_1',
    name: 'Vedica Natural Mineral Water',
    description: 'Pure natural mineral water',
    price: 35,
    image: '/images/water.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bev_2',
    name: 'Pulp / Pepsi / Miranda',
    description: 'Choice of refreshing soft drinks',
    price: 50,
    image: '/images/pulp.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bev_3',
    name: 'Diet Pepsi',
    description: 'Sugar-free cola',
    price: 50,
    image: '/images/diet-pepsi.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bev_4',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime soda',
    price: 225,
    image: '/images/lime-soda.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bev_5',
    name: 'Chaas (Salt/Mix)',
    description: 'Traditional buttermilk with salt or mixed spices',
    price: 225,
    image: '/images/chaas.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bev_6',
    name: 'Lassi',
    description: 'Creamy yogurt drink',
    price: 250,
    image: '/images/lassi-mango.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },

  // BEVERAGES - Tallest Iced Tea
  {
    id: 'tea_1',
    name: 'Lime Iced Tea',
    description: 'Refreshing iced tea with lime (Available with or without sugar)',
    price: 350,
    image: '/images/lime-iced-tea.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'tea_2',
    name: 'Peach Iced Tea',
    description: 'Peach flavored iced tea',
    price: 350,
    image: '/images/peach.webp',
    category: 'Beverages',
    isVeg: true,
    isAvailable: true
  },

  // SHAKES & COLD BEVERAGES
  {
    id: 'shake_1',
    name: 'Vanilla Thickshake',
    description: 'Rich and creamy vanilla shake',
    price: 375,
    image: '/images/vannila.webp',
    category: 'Shakes',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'shake_2',
    name: 'Chocolate Shake',
    description: 'Decadent chocolate shake',
    price: 375,
    image: '/images/chocolate.webp',
    category: 'Shakes',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'shake_3',
    name: 'Lotus Biscoff Shake',
    description: 'Creamy shake with Lotus Biscoff flavor',
    price: 375,
    image: '/images/lotus.webp',
    category: 'Shakes',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'shake_4',
    name: 'Blue Tal-ocean Shake',
    description: 'Unique blue colored refreshing shake',
    price: 375,
    image: '/images/blue.webp',
    category: 'Shakes',
    isVeg: true,
    isAvailable: true
  },

  // COFFEE
  {
    id: 'coffee_1',
    name: 'Single Origin 100% Arabica Plantation "AAA"',
    description: 'Premium single origin Arabica coffee',
    price: 295,
    image: '/images/coffee.webp',
    category: 'Coffee',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'coffee_2',
    name: 'Espresso',
    description: 'Strong concentrated coffee',
    price: 245,
    image: '/images/espresso.webp',
    category: 'Coffee',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'coffee_3',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk',
    price: 315,
    image: '/images/latte.webp',
    category: 'Coffee',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'coffee_4',
    name: 'Cappuccino',
    description: 'Classic espresso with frothed milk',
    price: 315,
    image: '/images/cappuccino.webp',
    category: 'Coffee',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'coffee_5',
    name: 'Cream Centre Cold Coffee',
    description: 'Signature cold coffee',
    price: 325,
    image: '/images/cold-coffee.webp',
    category: 'Coffee',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'coffee_6',
    name: 'Cream Centre Cold Coffee with Vanilla Ice Cream',
    description: 'Cold coffee topped with vanilla ice cream',
    price: 375,
    image: '/images/coffee-milkshake.webp',
    category: 'Coffee',
    isVeg: true,
    isAvailable: true
  },

  // MOCKTAILS
  {
    id: 'mocktail_1',
    name: 'Peach Frozen Margarita',
    description: 'Refreshing peach flavored mocktail',
    price: 325,
    image: '/images/Peach-Frozen-Margarita.webp',
    category: 'Mocktails',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mocktail_2',
    name: 'Strawberry Frozen Margarita',
    description: 'Sweet strawberry mocktail',
    price: 325,
    image: '/images/Strawberry-Frozen-Margarita.webp',
    category: 'Mocktails',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mocktail_3',
    name: 'Wild Berry Mojito',
    description: 'Berry flavored mojito',
    price: 295,
    image: '/images/Wild-Berry-Mojito.webp',
    category: 'Mocktails',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mocktail_4',
    name: 'Mango Pinecolada',
    description: 'Tropical mango pineapple blend',
    price: 350,
    image: '/images/Mango-Pinecolada.webp',
    category: 'Mocktails',
    isVeg: true,
    isAvailable: true
  },

  // SOUPS
  {
    id: 'soup_1',
    name: 'Spring Vegetable Soup',
    description: 'Fresh vegetable soup with seasonal vegetables',
    price: 295,
    image: '/images/Spring-Vegetable-Soup.webp',
    category: 'Soups',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'soup_2',
    name: 'Manchow Soup',
    description: 'Spicy Indo-Chinese soup',
    price: 295,
    image: '/images/Manchow.webp',
    category: 'Soups',
    isVeg: true,
    isAvailable: true
  },

  // STARTERS
  {
    id: 'starter_1',
    name: 'Guacamole with Tortilla Chips',
    description: 'Fresh avocado dip with crispy tortilla chips',
    price: 425,
    image: '/images/tortilla.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'starter_2',
    name: 'Nachos',
    description: 'Crispy nachos with cheese sauce',
    price: 550,
    image: '/images/nachos.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'starter_3',
    name: 'Punjab Samosa',
    description: 'Traditional Punjabi samosa',
    price: 450,
    image: '/images/punjabi-samosa.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'starter_4',
    name: 'Onion Rings',
    description: 'Crispy fried onion rings',
    price: 375,
    image: '/images/onion-rings.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'starter_5',
    name: 'Sizzling Cheesy Mexican Fries',
    description: 'Loaded fries with Mexican cheese',
    price: 475,
    image: '/images/Sizzling-Cheesy-Mexican-Fries.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'starter_6',
    name: 'Truffle Fries',
    description: 'French fries with truffle seasoning',
    price: 395,
    image: '/images/truffle-fries.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'starter_7',
    name: 'French Fries',
    description: 'Classic golden french fries',
    price: 250,
    image: '/images/french-fries.webp',
    category: 'Starters',
    isVeg: true,
    isAvailable: true
  },

  // BAOS
  {
    id: 'bao_1',
    name: 'Paneer Chilli Bao',
    description: 'Steamed bao with spicy paneer filling',
    price: 475,
    image: '/images/paneer-gua-bao.webp',
    category: 'Baos',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bao_2',
    name: 'Mushroom Bao',
    description: 'Steamed bao with mushroom filling',
    price: 475,
    image: '/images/Mushroom-Bao.webp',
    category: 'Baos',
    isVeg: true,
    isAvailable: true
  },

  // CHINESE
  {
    id: 'chinese_1',
    name: 'Schezwan Hakka Noodles',
    description: 'Spicy schezwan flavored hakka noodles',
    price: 395,
    image: '/images/sechwan-noodles.webp',
    category: 'Chinese',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'chinese_2',
    name: 'Hakka Schezwan Chilli Paneer',
    description: 'Indo-Chinese paneer with schezwan sauce',
    price: 475,
    image: '/images/hakka-panner.webp',
    category: 'Chinese',
    isVeg: true,
    isAvailable: true
  },

  // MUMBAI SPECIALITIES
  {
    id: 'mumbai_1',
    name: 'Pav Bhaji (Maharashtrian)',
    description: 'Traditional Mumbai street food',
    price: 395,
    image: '/images/pavbji.webp',
    category: 'Mumbai Specialities',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mumbai_2',
    name: 'Avocado Vada Pav',
    description: 'Modern twist on classic vada pav',
    price: 395,
    image: '/images/vada-pav.webp',
    category: 'Mumbai Specialities',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mumbai_3',
    name: 'Cheese Vada Pav',
    description: 'Vada pav with cheese',
    price: 395,
    image: '/images/cheese-vada-pav.jpg',
    category: 'Mumbai Specialities',
    isVeg: true,
    isAvailable: true
  },

  // CHAATS
  {
    id: 'chaat_1',
    name: 'Sev Batata Puri',
    description: 'Mumbai style chaat with sev and potato',
    price: 250,
    image: '/images/sev-batata-puri.webp',
    category: 'Chaats',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'chaat_2',
    name: 'Aalu Tikki',
    description: 'Crispy potato patties with chutneys',
    price: 275,
    image: '/images/allu-tikki.webp',
    category: 'Chaats',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'chaat_3',
    name: 'Dahi Batata Puri',
    description: 'Crispy puris with yogurt and chutneys',
    price: 275,
    image: '/images/dahi-puri.webp',
    category: 'Chaats',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'chaat_4',
    name: 'Raj Kachori',
    description: 'Large kachori with various fillings',
    price: 325,
    image: '/images/raj-kachori.webp',
    category: 'Chaats',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'chaat_5',
    name: 'Delhi Papdi Chaat',
    description: 'Delhi style papdi chaat',
    price: 275,
    image: '/images/dahi-papdi.webp',
    category: 'Chaats',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'chaat_6',
    name: 'Chaat Platter',
    description: 'Assorted chaat varieties',
    price: 595,
    image: '/images/chaat.webp',
    category: 'Chaats',
    isVeg: true,
    isAvailable: true
  },

  // TANDOOR
  {
    id: 'tandoor_1',
    name: 'Tandoori Soya Chaap',
    description: 'Marinated soya chaap grilled in tandoor',
    price: 475,
    image: '/images/soya-chap.webp',
    category: 'Tandoor',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'tandoor_2',
    name: 'Original Paneer Tikka',
    description: 'Classic paneer tikka with traditional spices',
    price: 550,
    image: '/images/paneer-tikka.webp',
    category: 'Tandoor',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'tandoor_3',
    name: 'Punjabi Paneer Tikka',
    description: 'Punjabi style paneer tikka',
    price: 550,
    image: '/images/punjabi-paneer-tikka.webp',
    category: 'Tandoor',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'tandoor_4',
    name: 'Tandoori Achari Mushroom',
    description: 'Mushrooms marinated in tangy pickle spices',
    price: 550,
    image: '/images/mushrom.webp',
    category: 'Tandoor',
    isVeg: true,
    isAvailable: true
  },

  // RICE BOWLS
  {
    id: 'rice_1',
    name: 'Mexican Burrito Bowl',
    description: 'Rice bowl with Mexican style vegetables and beans',
    price: 525,
    image: '/images/burito.webp',
    category: 'Rice Bowls',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'rice_2',
    name: 'Rajma Chawal Bowl',
    description: 'Traditional rajma with steamed rice',
    price: 495,
    image: '/images/rajma-chawal.webp',
    category: 'Rice Bowls',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'rice_3',
    name: 'Thai Basil Rice',
    description: 'Aromatic Thai basil flavored rice',
    price: 495,
    image: '/images/thai-basil.webp',
    category: 'Rice Bowls',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'rice_4',
    name: 'Healthy Brown Rice Bowl',
    description: 'Nutritious brown rice with vegetables',
    price: 525,
    image: '/images/brownrice.webp',
    category: 'Rice Bowls',
    isVeg: true,
    isAvailable: true
  },

  // INDIAN CURRIES
  {
    id: 'curry_1',
    name: 'Paneer Makhani',
    description: 'Rich tomato based paneer curry',
    price: 575,
    image: '/images/paneer-makhani.webp',
    category: 'Indian Curries',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'curry_2',
    name: 'Paneer Butter Masala',
    description: 'Creamy paneer in rich butter masala',
    price: 575,
    image: '/images/paneer-butter-masala.webp',
    category: 'Indian Curries',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'curry_3',
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow cooked',
    price: 395,
    image: '/images/dal.webp',
    category: 'Indian Curries',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'curry_4',
    name: 'Dhaba Yellow Dal Double Tadka',
    description: 'Traditional yellow dal with double tempering',
    price: 395,
    image: '/images/Dhaba-Yellow-Dal-Double-Tadka.webp',
    category: 'Indian Curries',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'curry_5',
    name: 'Mushroom Mutter',
    description: 'Mushroom and green peas curry',
    price: 475,
    image: '/images/mutter-mushroom.webp',
    category: 'Indian Curries',
    isVeg: true,
    isAvailable: true
  },

  // BIRYANI
  {
    id: 'biryani_1',
    name: 'Paneer Dum Biryani',
    description: 'Aromatic basmati rice with paneer',
    price: 525,
    image: '/images/panner-dum.webp',
    category: 'Biryani',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'biryani_2',
    name: 'Hyderabadi Dum Biryani',
    description: 'Traditional Hyderabadi style vegetable biryani',
    price: 605,
    image: '/images/hyd-dum-bir.webp',
    category: 'Biryani',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'biryani_3',
    name: 'Lucknow Signature Biryani',
    description: 'Lucknowi style aromatic biryani',
    price: 495,
    image: '/images/lucknow-bir.webp',
    category: 'Biryani',
    isVeg: true,
    isAvailable: true
  },

  // BREADS
  {
    id: 'bread_1',
    name: 'Butter Naan',
    description: 'Soft naan bread with butter',
    price: 130,
    image: '/images/butter-naan.webp',
    category: 'Breads',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bread_2',
    name: 'Garlic Naan',
    description: 'Naan bread with garlic and herbs',
    price: 145,
    image: '/images/garlic-naan.webp',
    category: 'Breads',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bread_3',
    name: 'Tandoori Roti',
    description: 'Whole wheat bread from tandoor',
    price: 95,
    image: '/images/tandoori.webp',
    category: 'Breads',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'bread_4',
    name: 'Butter Tandoori Roti',
    description: 'Tandoori roti with butter',
    price: 125,
    image: '/images/butter-tandoori.webp',
    category: 'Breads',
    isVeg: true,
    isAvailable: true
  },

  // MEXICAN CUISINE
  {
    id: 'mexican_1',
    name: 'Mexican Pizza',
    description: 'Pizza with Mexican style toppings',
    price: 525,
    image: '/images/mexcian-pizza.webp',
    category: 'Mexican',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mexican_2',
    name: 'Fajita Vegetables Quesadilla',
    description: 'Grilled tortilla with fajita vegetables',
    price: 475,
    image: '/images/Fajita-Quesadilla.webp',
    category: 'Mexican',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'mexican_3',
    name: 'Enchiladas',
    description: 'Rolled tortillas with filling and sauce',
    price: 525,
    image: '/images/Enchiladas_suizas.webp',
    category: 'Mexican',
    isVeg: true,
    isAvailable: true
  },

  // ITALIAN CUISINE
  {
    id: 'italian_1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
    price: 495,
    image: '/images/margherita-pizza.png',
    category: 'Italian',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'italian_2',
    name: 'Truffle Penne Parmesan Cheese',
    description: 'Penne pasta with truffle and parmesan',
    price: 625,
    image: '/images/pasta.webp',
    category: 'Italian',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'italian_3',
    name: 'Spaghetti Pink Herbed Sauce',
    description: 'Spaghetti in pink sauce with herbs',
    price: 550,
    image: '/images/Pink-Sauce-Pasta.webp',
    category: 'Italian',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'italian_4',
    name: 'Pasta Alfredo',
    description: 'Creamy alfredo pasta',
    price: 550,
    image: '/images/alfredo.webp',
    category: 'Italian',
    isVeg: true,
    isAvailable: true
  },

  // DESSERTS
  {
    id: 'dessert_1',
    name: 'Sizzling Brownie Fundae',
    description: 'Hot brownie with ice cream',
    price: 375,
    image: '/images/desert.webp',
    category: 'Desserts',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'dessert_2',
    name: 'Belgian Truffle Chocolate',
    description: 'Rich Belgian chocolate truffle',
    price: 395,
    image: '/images/truffle-bel.webp',
    category: 'Desserts',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'dessert_3',
    name: 'Lotus Biscoff Cheese Cake',
    description: 'Creamy cheesecake with Lotus Biscoff',
    price: 395,
    image: '/images/lotus-biscoff-cheesecake.webp',
    category: 'Desserts',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'dessert_4',
    name: 'Apricot Gulab Jamun',
    description: 'Traditional gulab jamun with apricot',
    price: 325,
    image: '/images/Apricot-Gulab-Jamun.webp',
    category: 'Desserts',
    isVeg: true,
    isAvailable: true
  },

  // ICE CREAM
  {
    id: 'ice_1',
    name: 'Tahitian Vanilla',
    description: 'Premium vanilla ice cream',
    price: 150,
    image: '/images/vanila.webp',
    category: 'Ice Cream',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'ice_2',
    name: 'Chocolate To Die For',
    description: 'Rich chocolate ice cream',
    price: 150,
    image: '/images/ch.webp',
    category: 'Ice Cream',
    isVeg: true,
    isAvailable: true
  },
  {
    id: 'ice_3',
    name: 'World Class Strawberry',
    description: 'Fresh strawberry ice cream',
    price: 150,
    image: '/images/straw.webp',
    category: 'Ice Cream',
    isVeg: true,
    isAvailable: true
  }
];

export const menuCategories = [
  'All',
  'Beverages',
  'Shakes',
  'Coffee',
  'Mocktails',
  'Soups',
  'Starters',
  'Baos',
  'Chinese',
  'Mumbai Specialities',
  'Chaats',
  'Tandoor',
  'Rice Bowls',
  'Indian Curries',
  'Biryani',
  'Breads',
  'Mexican',
  'Italian',
  'Desserts',
  'Ice Cream'
];