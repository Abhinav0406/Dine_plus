import { TableInfo } from '../types';

export const restaurantTables: TableInfo[] = [
  {
    id: 'table_1',
    number: '1',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_2',
    number: '2',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_3',
    number: '3',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_4',
    number: '4',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_5',
    number: '5',
    restaurantId: 'rest_1',
    seatingCapacity: 4,
    status: 'available'
  },
  {
    id: 'table_7',
    number: '7',
    restaurantId: 'rest_1',
    seatingCapacity: 2,
    status: 'available'
  },
  {
    id: 'table_8',
    number: '8',
    restaurantId: 'rest_1',
    seatingCapacity: 2,
    status: 'available'
  },
  {
    id: 'table_10',
    number: '10',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_11',
    number: '11',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_12',
    number: '12',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_15',
    number: '15',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_16',
    number: '16',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_17',
    number: '17',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_18',
    number: '18',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_19',
    number: '19',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_20',
    number: '20',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_21',
    number: '21',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_22',
    number: '22',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_23',
    number: '23',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  },
  {
    id: 'table_24',
    number: '24',
    restaurantId: 'rest_1',
    seatingCapacity: 6,
    status: 'available'
  }
];

// Helper functions
export const getTableById = (tableId: string): TableInfo | undefined => {
  return restaurantTables.find(table => table.id === tableId || table.number === tableId);
};

export const getAvailableTables = (): TableInfo[] => {
  return restaurantTables.filter(table => table.status === 'available');
};

export const getTablesByCapacity = (minCapacity: number): TableInfo[] => {
  return restaurantTables.filter(table => table.seatingCapacity >= minCapacity);
}; 