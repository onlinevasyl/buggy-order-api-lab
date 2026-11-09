// In-memory data store (simulates a database)
let orders = [];
const { v4: uuidv4 } = require('uuid');

class Order {
    constructor(customerName, items, shippingAddress) {
        this.id = uuidv4();
        this.customerName = customerName;
        this.items = items;
        this.shippingAddress = shippingAddress;
        this.createdAt = new Date();
        this.status = 'pending';
        this.totalPrice = Order.calculateTotal(items);
    }

    static calculateTotal(items = []) {
        return items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
    }

    static validateOrderData(orderData) {
        if (!orderData || typeof orderData !== 'object') return false;
        if (!orderData.customerName || typeof orderData.customerName !== 'string' || !orderData.customerName.trim()) return false;
        if (!Array.isArray(orderData.items) || orderData.items.length === 0) return false;
        if (!orderData.shippingAddress || typeof orderData.shippingAddress !== 'object') return false;

        return orderData.items.every(item => {
            if (!item || typeof item !== 'object') return false;
            if (!item.name || typeof item.name !== 'string' || !item.name.trim()) return false;
            if (Number(item.price) <= 0 || Number(item.quantity) <= 0) return false;
            return true;
        });
    }

    static findAll() {
        return orders;
    }

    static findById(id) {
        return orders.find(order => order.id === id) || null;
    }

    static create(orderData) {
        if (!this.validateOrderData(orderData)) {
            throw new Error('Invalid order data');
        }

        const newOrder = new Order(
            orderData.customerName,
            orderData.items,
            orderData.shippingAddress
        );
        orders.push(newOrder);
        return newOrder;
    }

    static update(id, updateData) {
        const orderIndex = orders.findIndex(order => order.id === id);
        if (orderIndex === -1) return null;

        orders[orderIndex] = { ...orders[orderIndex], ...updateData };

        if (updateData.items) {
            orders[orderIndex].totalPrice = this.calculateTotal(updateData.items);
        }

        return orders[orderIndex];
    }

    static delete(id) {
        const orderIndex = orders.findIndex(order => order.id === id);
        if (orderIndex === -1) return null;

        const deletedOrder = orders.splice(orderIndex, 1)[0];
        return deletedOrder;
    }

    static findByStatus(status) {
        return orders.filter(order => order.status === status);
    }
}

module.exports = Order;
