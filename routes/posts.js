const router = require("express").Router();
const verify = require("../verifyToken");
const userModel = require("../model/users");

router.get("/", verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.user);
    //   const user = userModel.findById(req.user.user);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
