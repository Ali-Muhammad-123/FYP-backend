const PostFamilyMemberController = require("../controllers/PostFamilyMember");
const GetFamilyMemberController = require("../controllers/GetFamilyMember");

const familyMemberRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

familyMemberRouter.post("/familymember", async (req, res) => {

    PostFamilyMemberController.Execute(req, res);
});

familyMemberRouter.get("/familymember", async (req, res) => {
    GetFamilyMemberController.Execute(req, res);
});

module.exports = familyMemberRouter;
