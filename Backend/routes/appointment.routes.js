let express = require('express');
let router = express.Router();
let allAppointments = require('../controllers/appointment.controller');

router.route('/getAllAppointments').post(allAppointments.getAllAppointments);
router.route('/addAppointment').post(allAppointments.addAnAppointment);
router.route('/deleteAppointment').post(allAppointments.deleteAppointment);
router.route('/updateAppointmentDetails').post(allAppointments.updateAppointmentDetails);

module.exports = router;