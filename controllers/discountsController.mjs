// Import discounts model
import { query } from 'express';
import * as discountsModel from '../models/discountsModel.mjs';

// Render main discounts page and table
export const getDiscountsTable = async(req, res) => {
    try {
        // Run query to get all discounts and populate table
        let results = await discountsModel.getAllDiscounts();
        res.status(200).render('discounts', {discount: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting discounts: ', err);
        res.status(500).send('Error selecting discounts');
    }
};

// Render new discount page and form
export const getNewDiscountForm = async(req, res) => {
    try {
        // Render new discount page and form
        res.status(200).render('new-discount');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new discount page/form: ', err);
        res.status(500).send('Error rendering new discount page/form');
    }
};

// Render edit discount page and form
export const getEditDiscountForm = async(req, res) => {
    try {
        // Run query to get discount with given id and prepopulate form
        let results = await discountsModel.getDiscountById(req.query.id);
        res.render('edit-discount', {discount: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit discount page/form: ', err);
        res.status(500).send('Error rendering edit discount page/form');
    }
};

// Add a new discount
export const addDiscount = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'discount': req.body.discount,
        'percent': req.body.percent
    };

    try {
        // Run query to insert a new discount with given data
        let results = await discountsModel.addDiscount(queryParams);
        res.status(201).redirect('/discounts');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new discount', err);
        res.status(500).send('Error adding new discount');
    }
};

// Update a discount
export const updateDiscount = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'discount': req.body.discount,
        'percent': req.body.percent,
        'id': req.body.id
    };

    try {
        // Run query to update given discount with new data
        let results = await discountsModel.updateDiscount(queryParams);
        res.status(200).render('discounts');
    } catch(err) {
        // Send error status and message
        console.error('Error editing discount', err);
        res.status(500).send('Error editing discount');
    }
};

// Delete a discount
export const deleteDiscount = async(req, res) => {
    try {
        // Run query to delete discount with the given id
        let results = await discountsModel.deleteDiscount(req.body.id);
        res.status(204).render('discounts');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting discount', err);
        res.status(500).send('Error deleting discount');
    }
};