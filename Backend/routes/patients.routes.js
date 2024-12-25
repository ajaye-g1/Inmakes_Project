let express = require('express');
let router = express.Router();
let patientController = require('../controllers/patients.controller');

router.route('/getAllPatients').post(patientController.getAllPatients);
router.route('/insertPatientDetails').post(patientController.insertPatientDetails);
router.route('/deletePatientDetails').post(patientController.deletePatientDetails);
router.route('/getAllPatientsName').post(patientController.getAllPatientsName);
router.route('/updatePatientDetails').post(patientController.updatePatientDetails);


module.exports = router;