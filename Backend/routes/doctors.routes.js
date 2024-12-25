let express = require('express');
let router = express.Router();
let doctorsController = require('../controllers/doctors.controller');

router.route('/getAllDoctors').post(doctorsController.getAllDoctors);
router.route('/getAllSpecialisedCourses').post(doctorsController.getAllSpecialisedCourses);
router.route('/insertDoctorDetails').post(doctorsController.insertDoctorDetails);
router.route('/deleteDoctorDetails').post(doctorsController.deleteDoctorDetails);
router.route('/getAllDoctorsName').post(doctorsController.getAllDoctorsName);
router.route('/updateDoctorDetails').post(doctorsController.updateDoctorDetails);

module.exports = router;