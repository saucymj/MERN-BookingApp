const router = require("express").Router();
const { getAllUsers } = require("../controllers/user-controllers");

router.route('/').get(getAllUsers);

module.exports = router;
