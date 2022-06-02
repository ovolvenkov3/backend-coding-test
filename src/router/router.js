const Router = require('express');
const RidesController = require('../controllers/rides.js');
const HealthController = require('../controllers/health.js');
const router = Router();

router.get('/rides', RidesController.getRides);
router.get('/rides/:id', RidesController.getRide);
router.post('/rides', RidesController.createRide);
router.get('/health', HealthController.getHealth);

module.exports = router;