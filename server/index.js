const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router.js');

const app = new Koa();

app.use(cors({
  origin: 'http://localhost:8080',
}));
app.use(bodyParser());
app.use(router.routes());

app.listen(3030, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server is listening on port 3030!`);
  }
});