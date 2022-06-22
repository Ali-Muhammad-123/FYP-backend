const Router = require("express").Router();
const auth = require("../middleware/auth");
const PostExpressAccounting = require("../controllers/PostExpressAccounting");


Router.post('/expressaccounting', auth, async (req, res) => {

    PostExpressAccounting.Execute(req, res);


});





module.exports = Router;