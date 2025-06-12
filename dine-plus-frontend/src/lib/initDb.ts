import { supabase } from '../lib/supabase';
import { menuCategories, menuItems } from '../data/menuData';

export const initializeDatabase = async () => {
  try {
    // Insert menu categories
    const { error: categoriesError } = await supabase
      .from('menu_categories')
      .insert(menuCategories.map(category => ({
        name: category
      })));

    if (categoriesError) throw categoriesError;

    // Get inserted categories
    const { data: categories, error: fetchError } = await supabase
      .from('menu_categories')
      .select('id, name');

    if (fetchError) throw fetchError;

    // Create a map of category names to IDs
    const categoryMap = Object.fromEntries(
      categories.map(cat => [cat.name, cat.id])
    );

    // Insert menu items with correct category IDs
    const { error: itemsError } = await supabase
      .from('menu_items')
      .insert(menuItems.map(item => ({
        name: item.name,
        description: item.description,
        price: item.price,
        image_url: item.image,
        category_id: categoryMap[item.category],
        is_veg: item.isVeg,
        is_available: true
      })));

    if (itemsError) throw itemsError;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
