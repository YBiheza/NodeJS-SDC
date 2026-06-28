"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workHours = {
    start: 9,
    finish: 18
};
const pickHours = {
    start: 15,
    finish: 16
};
function checkWorkHours(date) {
    return (date.getHours() < workHours.start && date.getHours() >= workHours.finish);
}
function checkPickHours(date) {
    return (date.getHours() < pickHours.start && date.getHours() >= pickHours.finish);
}
function calculateDiscount(orderData) {
    let discount = [];
    if (checkPickHours(orderData.date)) {
        discount.push(0.1);
    }
    if (orderData.sum > 100) {
        discount.push(0.2);
    }
    if (discount.length === 0)
        return 0;
    return Math.max(...discount);
}
class OrderService {
    placeOrder(orderData) {
        if (!checkWorkHours(orderData.createdAt)) {
            throw new Error("Orders are not accepted outside working hours");
        }
        const discount = calculateDiscount(orderData.price);
        const finalPrice = orderData.price * (1 - discount);
        return {
            ...orderData,
            finalPrice
        };
    }
}
//# sourceMappingURL=OrderService.js.map