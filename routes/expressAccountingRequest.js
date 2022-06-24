const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostExpressAccounting = require("../controllers/PostExpressAccounting");
const GetExpressAccounting = require("../controllers/GetExpressAccounting");


Router.post('/expressaccounting', auth, async (req, res) => {

    PostExpressAccounting.Execute(req, res);


});

Router.get("/expressaccounting", auth, async (req, res) => {
    GetExpressAccounting.Execute(req, res);
});





module.exports = Router;