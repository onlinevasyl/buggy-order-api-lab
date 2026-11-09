const helpers = {

    calculateTotal: items => {
        if (!Array.isArray(items)) {
            throw new TypeError('Items must be an array');
        }

        let totalCents = 0;
        for (const item of items) {
            const price = Number(item && item.price);
            const quantity = Number(item && item.quantity);
            if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(quantity) || quantity <= 0) {
                throw new TypeError('Each item must have a positive finite price and quantity');
            }
            totalCents += Math.round(price * quantity * 100);
        }
        return totalCents / 100;
    },

    validateOrderData: (data) => {
        if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
        if (typeof data.customerName !== 'string' || !data.customerName.trim()) return false;
        if (!Array.isArray(data.items) || data.items.length === 0) return false;
        if (!data.shippingAddress || typeof data.shippingAddress !== 'object' || Array.isArray(data.shippingAddress)) return false;

        return data.items.every(item => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
            if (typeof item.name !== 'string' || !item.name.trim()) return false;

            const price = Number(item.price);
            const quantity = Number(item.quantity);
            return Number.isFinite(price) && price > 0 && Number.isFinite(quantity) && quantity > 0;
        });
    },

    isValidStatus: (status) => {
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        return typeof status === 'string' && validStatuses.includes(status.toLowerCase());
    },

    paginate: (array, page, limit) => {
        if (!Array.isArray(array)) {
            throw new TypeError('Value to paginate must be an array');
        }
        if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
            throw new RangeError('Page and limit must be positive integers');
        }

        const startIndex = (page - 1) * limit;
        return array.slice(startIndex, startIndex + limit);
    },

    formatOrderResponse: (order) => {
        if (!order || typeof order !== 'object') {
            throw new TypeError('Order must be an object');
        }

        const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
        const sanitize = value => {
            if (typeof value === 'string') return escapeHtml(value);
            if (Array.isArray(value)) return value.map(sanitize);
            if (value && typeof value === 'object') {
                return Object.fromEntries(Object.entries(value).map(([key, nestedValue]) => [key, sanitize(nestedValue)]));
            }
            return value;
        };

        const createdAt = order.createdAt instanceof Date
            ? order.createdAt
            : typeof order.createdAt === 'string' || typeof order.createdAt === 'number'
                ? new Date(order.createdAt)
                : null;
        if (!createdAt || !Number.isFinite(createdAt.getTime())) {
            throw new TypeError('Order createdAt must be a valid date');
        }

        return {
            id: order.id,
            customer: sanitize(order.customerName),
            items: sanitize(order.items),
            total: order.totalPrice,
            status: sanitize(order.status),
            created: createdAt.toISOString()
        };
    }
};

module.exports = helpers;
