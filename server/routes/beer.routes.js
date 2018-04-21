const Router = require("koa-router");
const router = new Router();
const beerController = require("../controllers/beerController");
const BASE_URL = '/api/beer';

router.get(BASE_URL, beerController.index);
router.get(`${BASE_URL}/:id`, beerController.get);

module.exports = router;
