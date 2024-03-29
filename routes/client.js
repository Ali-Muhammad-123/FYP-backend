const userRouter = require("express").Router();
const GetUserController = require("../controllers/GetUserController");
const SearchUserController = require("../controllers/SearchUserController");
const PostUserController = require("../controllers/PostUserController");
const UpdateUserController = require("../controllers/UpdateUser");
const DeleteUserController = require("../controllers/DeleteUser");
// const auth = require("../middleware/adminAuth");

module.exports = (upload) => {
	userRouter.get("/user", async (req, res) => {
		GetUserController.Execute(req, res);
	});

	userRouter.get("/user/search", async (req, res) => {
		SearchUserController.Execute(req, res);
	});

	userRouter.post(
		"/user",
		upload.single("profilePicture"),
		async (req, res) => {
			PostUserController.Execute(req, res);
		}
	);

	userRouter.put("/user", upload.single("profilePicture"), async (req, res) => {
		UpdateUserController.Execute(req, res);
	});

	userRouter.delete("/user", async (req, res) => {
		DeleteUserController.Execute(req, res);
	});

	return userRouter;
};
