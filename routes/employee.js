const PostEmployeeController = require("../controllers/PostEmployee");
const GetEmployeeController = require("../controllers/GetEmployee");
const UpdateEmployeeController = require("../controllers/UpdateEmployee");
const DeleteEmployeeController = require("../controllers/DeleteEmployee");

const employeeRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

employeeRouter.post("/employee", commonauth, async (req, res) => {

    PostEmployeeController.Execute(req, res);
});

employeeRouter.put("/employee", commonauth, async (req, res) => {

    UpdateEmployeeController.Execute(req, res);
});

employeeRouter.get("/employee", commonauth, async (req, res) => {
    GetEmployeeController.Execute(req, res);
});

employeeRouter.delete("/employee", commonauth, async (req, res) => {
    DeleteEmployeeController.Execute(req, res);
});


module.exports = employeeRouter;
