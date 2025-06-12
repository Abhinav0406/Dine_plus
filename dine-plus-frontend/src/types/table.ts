export interface Table {
  id: string;
  number: string;
  restaurantId: string;
  status: 'available' | 'occupied' | 'reserved';
}

export interface TableInfo extends Table {
  seatingCapacity: number;
  isOccupied?: boolean;
}
