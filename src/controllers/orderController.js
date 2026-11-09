const Order = require('../models/order');
const helpers = require('../utils/helpers');

const orderController = {

    // GET all orders
    getAllOrders: (req, res) => {
        try {
            const orders = Order.findAll();
            if (orders.length === 0) {
                return res.status(404).json({ message: 'No orders found' });
            }
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Failed to retrieve orders:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // GET order by ID
    getOrderById: (req, res) => {
        try {
            const order = Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json(order);
        } catch (error) {
            console.error('Failed to retrieve order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // POST create new order
    createOrder: (req, res) => {
        const orderData = req.body;

        if (!helpers.validateOrderData(orderData)) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        try {
            const newOrder = Order.create(orderData);

            return res.status(201).json({
                message: 'Order created successfully',
                order: newOrder
            });
        } catch (error) {
            console.error('Failed to create order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // PUT update order
    updateOrder: (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!updateData || typeof updateData !== 'object' || Array.isArray(updateData) || Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: 'Update data must be a non-empty object' });
            }

            const updatedOrder = Order.update(id, updateData);

            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json({
                message: 'Order updated successfully',
                order: updatedOrder
            });
        } catch (error) {
            console.error('Failed to update order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // DELETE order
    deleteOrder: (req, res) => {
        try {
            const { id } = req.params;
            const deleted = Order.delete(id);

            if (!deleted) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // BUG #26: Returns 200 instead of 204 (No Content) for successful delete
            // Also sends a body with 204 which some clients ignore
            return res.status(204).end();
        } catch (error) {
            console.error('Failed to delete order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // GET orders by status
    getOrdersByStatus: (req, res) => {
        try {
            const { status } = req.query;

            if (!helpers.isValidStatus(status)) {
                return res.status(400).json({
                    message: 'Invalid status. Allowed values: pending, processing, shipped, delivered, cancelled'
                });
            }

            const orders = Order.findByStatus(status.toLowerCase());
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Failed to retrieve orders by status:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // GET order summary/analytics
    getOrderSummary: (req, res) => {
        try {
            const orders = Order.findAll();

            const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

            const summary = {
                totalOrders: orders.length,
                totalRevenue: totalRevenue,
                pendingOrders: orders.filter(o => o.status === 'pending').length,
                completedOrders: orders.filter(o => o.status === 'completed').length
            };

            return res.status(200).json(summary);
        } catch (error) {
            console.error('Failed to retrieve order summary:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = orderController;
