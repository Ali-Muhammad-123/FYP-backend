const GetPromotions = require("../controllers/GetAllPromotions");
const EditPromotions = require("../controllers/UpdatePromotion");
const AddPromotions = require("../controllers/PostPromotion");
const DeletePromotions = require("../controllers/GetAllPromotions");
const PromotionsRouter = require("express").Router();
const commonauth = require("../middleware/commonauth");

module.exports = (upload) => {
  PromotionsRouter.get("/allPromotions", commonauth, async (req, res) => {
    console.log("hit");
    GetPromotions.Execute(req, res);
  });

  PromotionsRouter.post(
    "/Promotions",
    commonauth,
    upload.single("promotion"),
    async (req, res) => {
      AddPromotions.Execute(req, res);
    }
  );

  PromotionsRouter.put(
    "/updatePromotions",
    commonauth,
    upload.single("promotion"),
    async (req, res) => {
      EditPromotions.Execute(req, res);
    }
  );

  PromotionsRouter.delete("/deletePromotions", async (req, res) => {
    DeletePromotions.Execute(req, res);
  });

  return PromotionsRouter;
};
