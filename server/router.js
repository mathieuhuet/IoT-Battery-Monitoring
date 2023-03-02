const KoaRouter = require('koa-router');
const router = new KoaRouter();
const weather = require('./Controllers/weather');
const device = require('./Controllers/device');
const userController = require('./Controllers/user');
const authMiddleware = require('./Middlewares/auth');


router.get('/weather', weather.getWeather);

router.get('/device', device.getAllDevices);
router.post('/device', device.postDevice);
router.put('/device/:id', device.updateDevice);
router.delete('/device/:id', device.deleteDevice);

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;