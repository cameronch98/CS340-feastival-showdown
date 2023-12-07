import express from 'express';
import * as discountsController from '../controllers/discountsController.mjs';

// Initialize discounts router
const discountsRoutes = express.Router();

// Define discounts routes
discountsRoutes
    .get('/', discountsController.getDiscountsTable)
    .get('/new-discount', discountsController.getNewDiscountForm)
    .get('/edit-discount', discountsController.getEditDiscountForm)
    .post('/new-discount/fetch', discountsController.addDiscount)
    .put('/edit-discount/fetch', discountsController.updateDiscount)
    .delete('/delete-discount-ajax', discountsController.deleteDiscount)

export { discountsRoutes };