const KoaRouter = require('koa-router');
const router = new KoaRouter();
const weather = require('./Controllers/weather');

const controller = require('./controllers/controller');


router.get('/weather', weather.getWeather);


router.get('/topic', controller.getAllTopics);
router.post('/topic', controller.postTopic);
router.put('/topic/:id/:direction', controller.updateTopic);
router.delete('/topic/:id', controller.deleteTopic);

module.exports = router;