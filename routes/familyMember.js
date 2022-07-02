const PostFamilyMemberController = require("../controllers/PostFamilyMember");
const GetEmployeeController = require("../controllers/GetEmployee");

const familyMemberRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

familyMemberRouter.post("/familymember", async (req, res) => {

    PostFamilyMemberController.Execute(req, res);
});

familyMemberRouter.get("/familymember", async (req, res) => {
    GetEmployeeController.Execute(req, res);
});

module.exports = familyMemberRouter;
