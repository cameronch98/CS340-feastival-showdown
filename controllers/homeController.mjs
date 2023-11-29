import * as homeModel from '../models/homeModel.mjs';

// Render contents of home page
export const getHomePage = async(req, res) => {

    // Render home page
    res.render('index')
}