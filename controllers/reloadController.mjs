import * as reloadModel from '../models/reloadModel.mjs';

// Function to run on reload click
export const reloadDatabase = async(req, res) => {
    
    // Empty database
    await reloadModel.emptyDB();

    // Reload sample data
    await reloadModel.reloadAttendees();
    await reloadModel.reloadCompetitors();
    await reloadModel.reloadEventYears();
    await reloadModel.reloadCourses();
    await reloadModel.reloadTicketTypes();
    await reloadModel.reloadTickets();
    await reloadModel.reloadDiscounts();
    await reloadModel.reloadTeams();
    await reloadModel.reloadTicketSales();
    await reloadModel.reloadCompetitorRegs();
    await reloadModel.reloadDishes();
    await reloadModel.reloadRatings();

    // Send status and reload current page
    res.status(201).redirect('back');
}