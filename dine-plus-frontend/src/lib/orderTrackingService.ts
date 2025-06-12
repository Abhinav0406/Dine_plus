export interface OrderEvent {
  type: 'ORDER_PLACED' | 'STATUS_UPDATED' | 'PAYMENT_COMPLETED';
  orderId: string;
  timestamp: string;
  data: any;
}

export class OrderTrackingService {
  private static instance: OrderTrackingService;
  private eventListeners: Map<string, Function[]> = new Map();

  static getInstance(): OrderTrackingService {
    if (!OrderTrackingService.instance) {
      OrderTrackingService.instance = new OrderTrackingService();
    }
    return OrderTrackingService.instance;
  }

  // Emit order events
  emitOrderEvent(event: OrderEvent) {
    const listeners = this.eventListeners.get(event.type) || [];
    listeners.forEach(listener => listener(event));

    // Log for analytics
    this.logAnalyticsEvent(event);
  }

  // Subscribe to order events
  subscribe(eventType: string, callback: Function) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(callback);
  }

  // Unsubscribe from order events
  unsubscribe(eventType: string, callback: Function) {
    const listeners = this.eventListeners.get(eventType) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  // Log analytics events
  private logAnalyticsEvent(event: OrderEvent) {
    const analyticsLog = JSON.parse(localStorage.getItem('analyticsLog') || '[]');
    analyticsLog.push({
      ...event,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 1000 events to prevent storage bloat
    if (analyticsLog.length > 1000) {
      analyticsLog.splice(0, analyticsLog.length - 1000);
    }
    
    localStorage.setItem('analyticsLog', JSON.stringify(analyticsLog));
  }

  // Get analytics data
  getAnalyticsData(fromDate?: Date, toDate?: Date) {
    const analyticsLog = JSON.parse(localStorage.getItem('analyticsLog') || '[]');
    
    if (!fromDate && !toDate) {
      return analyticsLog;
    }

    return analyticsLog.filter((event: any) => {
      const eventDate = new Date(event.timestamp);
      if (fromDate && eventDate < fromDate) return false;
      if (toDate && eventDate > toDate) return false;
      return true;
    });
  }

  // Kitchen-specific methods
  notifyKitchen(orderId: string, orderData: any, tableNumber: string) {
    // Dispatch custom event for kitchen
    const kitchenEvent = new CustomEvent('newOrder', {
      detail: { order: orderData, tableNumber, orderId }
    });
    window.dispatchEvent(kitchenEvent);

    // Emit tracking event
    this.emitOrderEvent({
      type: 'ORDER_PLACED',
      orderId,
      timestamp: new Date().toISOString(),
      data: { tableNumber, orderData }
    });
  }

  // Payment-specific methods
  recordPayment(orderId: string, paymentMethod: string, amount: number, tableNumber: string) {
    this.emitOrderEvent({
      type: 'PAYMENT_COMPLETED',
      orderId,
      timestamp: new Date().toISOString(),
      data: { paymentMethod, amount, tableNumber }
    });
  }

  // Status update methods
  updateOrderStatus(orderId: string, oldStatus: string, newStatus: string, tableNumber: string) {
    this.emitOrderEvent({
      type: 'STATUS_UPDATED',
      orderId,
      timestamp: new Date().toISOString(),
      data: { oldStatus, newStatus, tableNumber }
    });
  }
}

export const orderTrackingService = OrderTrackingService.getInstance(); 