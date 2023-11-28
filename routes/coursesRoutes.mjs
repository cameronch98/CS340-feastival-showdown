import express from 'express';
import * as coursesController from '../controllers/coursesController.mjs';

// Initialize courses router
const coursesRoutes = express.Router();

// Define courses routes
coursesRoutes
    .get('/', coursesController.getCoursesTable)
    .get('/new-course', coursesController.getNewCourseForm)
    .get('/edit-course', coursesController.getEditCourseForm)
    .post('/new-course-ajax', coursesController.addCourse)
    .put('/edit-course-ajax', coursesController.updateCourse)
    .delete('/delete-course-ajax', coursesController.deleteCourse)

export { coursesRoutes };