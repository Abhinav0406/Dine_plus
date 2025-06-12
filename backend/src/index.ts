import { initializeDatabase, seedDatabase } from './db/init';

async function main() {
  try {
    // Initialize the database
    await initializeDatabase();
    
    // Seed initial data if needed
    await seedDatabase();
    
    console.log('Backend initialization completed successfully');
  } catch (error) {
    console.error('Error during backend initialization:', error);
    process.exit(1);
  }
}

main();
