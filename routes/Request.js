const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostExpressAccounting = require("../controllers/PostExpressAccounting");
const GetExpressAccounting = require("../controllers/GetExpressAccounting");
const UpdateExpressAccounting = require("../controllers/UpdateExpressAccounting");

Router.post('/expressaccounting', auth, async (req, res) => {

    PostExpressAccounting.Execute(req, res);


});


Router.get("/expressaccounting", auth, async (req, res) => {
    GetExpressAccounting.Execute(req, res);
});


Router.put("/expressaccounting", auth, async (req, res) => {
    UpdateExpressAccounting.Execute(req, res);
});





module.exports = Router;