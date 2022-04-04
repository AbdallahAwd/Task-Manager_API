const express = require("express");
const User = require("../models/user");
const router = express.Router();
const sharp = require("sharp");
const auth = require("../middleware/auth");
const multer = require("multer");
const { sendEmail, cancelEmail } = require("../emails/accounts");
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(res, file, callback) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return callback(
        new Error("please Upload a images with these extentions [jpg,jpeg,png]")
      );
    }
    callback(undefined, true);
  },
});
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendEmail(user.email, user.name);
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.send(error);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByEmailAndPassword(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: `Error Occurs ${error}` });
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ info: "User LogOut" });
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/users/logout/all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ info: "All users loged out" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("uploads"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 250, width: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send({ info: "uploaded" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete("/user/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send({ info: "Deleted Image Successfully" });
  } catch (error) {
    res.status(400).send({ error: `Cannot Delete the Image${error}` });
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send({ error: "User Not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw Error("No Avatar Found");
    }
    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(400).send({ error: ` ${error}` });
  }
});
router.put("/users/me", auth, async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isAllowed = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isAllowed) {
    return res.send({ error: "Not Allowd Property" });
  }
  try {
    // to detect the field which is updated dynamicly

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    //to access middleware everytime
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/users/me", auth, async (req, res) => {
  try {
    req.user.remove();
    cancelEmail(req.user.email, req.user.name);
    res.send({ info: "User Deleted" });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
