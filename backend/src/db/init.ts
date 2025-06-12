import { supabase } from '../lib/supabase';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function initializeDatabase() {
  try {
    // Read the schema file
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    // Execute the schema SQL
    const { error } = await supabase.from('_schema').rpc('apply_schema', {
      schema_sql: schema
    });

    if (error) {
      console.error('Error initializing database:', error);
      throw error;
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error reading or applying schema:', error);
    throw error;
  }
}

// Function to seed initial data if needed
export async function seedDatabase() {
  try {
    // Add any initial data seeding here
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
