const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router.js');

const app = new Koa();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser());
app.use(router.routes());

app.listen(3030, () => {
  console.log(`Server listening on port 3030`);
});