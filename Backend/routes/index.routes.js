let express = require('express');
let router = express.Router();
let loginRouter = require('./login.routes')
let patientsRouter = require('./patients.routes')
let doctorsRouter = require('./doctors.routes')
let appointmentRouter = require('./appointment.routes')

router.use('/login', loginRouter);
router.use("/patients", patientsRouter);
router.use("/doctors", doctorsRouter);
router.use("/appointments", appointmentRouter);

module.exports = router;