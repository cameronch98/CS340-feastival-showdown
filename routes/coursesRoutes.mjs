import express from 'express';
import * as coursesController from '../controllers/coursesController.mjs';

// Initialize courses router
const coursesRoutes = express.Router();

// Define courses routes
coursesRoutes
    .get('/', coursesController.getCoursesTable)
    .get('/get-course', coursesController.getOneCourse)
    .get('/new-course', coursesController.getNewCourseForm)
    .get('/edit-course', coursesController.getEditCourseForm)
    .post('/new-course/fetch', coursesController.addCourse)
    .put('/edit-course/fetch', coursesController.updateCourse)
    .delete('/delete-course-ajax', coursesController.deleteCourse)

export { coursesRoutes };