const router = require("express").Router();
const path = require("path");
const authRouter = require("./auth");

const validateAccess = require("../middleware/validateAccess");

const userController = require("../controllers/user");
const categoryController = require("../controllers/category");
const productController = require("../controllers/product");

router.use("/auth", authRouter);

router.use(validateAccess);

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/userImages");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png, .jpg, and .jpeg File Format Allowed...!")
      );
    }
  },
}).single("image");

router.post("/user", uploadImage, userController.createUserHandler);
// router.get("/user", userController.getAllUserHandler);
// router.get("/user/:id", userController.getOneUserHandler);
// router.put("/user/:id", userController.updateUserHandler);
// router.delete("/user/:id", userController.deleteUserHandler);

router.post("/category", categoryController.createCategoryHandler);
router.get("/category", categoryController.getAllCategoryHandler);

router.post("/product", productController.createProductHandler);
router.get("/product", productController.getAllProductHandler);
router.get("/categorywisetotal", productController.getCategoryWiseTotal);
router.put("/product/:id", productController.updateProductHandler);
router.delete("/product/:id", productController.deleteProductHandler);

module.exports = router;
