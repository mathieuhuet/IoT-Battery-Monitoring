const KoaRouter = require('koa-router');
const router = new KoaRouter();
const weather = require('./Controllers/weather');
const device = require('./Controllers/device');
const user = require('./Controllers/user');
const emc = require('./Controllers/emc');
const pmv = require('./Controllers/pmv');
const authMiddleware = require('./Middlewares/auth');


router.get('/weather', weather.getWeather);

router.get('/device/:id', device.getSingleDevice)
router.get('/device', device.getAllDevices);
router.post('/device', device.postDevice);
router.put('/device/:id', device.updateDevice);
router.delete('/device/:id', device.deleteDevice);

router.post('/register', user.create);
router.post('/login', user.login);
router.get('/me', authMiddleware, user.profile);
router.post('/logout', authMiddleware, user.logout);

router.get('/emc/:id', emc.getLiveData);
router.get('/pmv/:id', pmv.getLiveData);

module.exports = router;