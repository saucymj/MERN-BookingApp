const db = require("../config/connection");
const { User, Blog } = require("../models");
const userSeeds = require("./userSeeds.json");
const blogSeeds = require("./blogSeeds.json");

db.once("open", async () => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await User.create(userSeeds);

    for (let index = 0; index < blogSeeds.length; index++) {
      const { _id, reviewAuthor } = await Blog.create(blogSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: reviewAuthor },
        {
          $addToSet: {
            blog: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Done!");
  process.exit(0);
});
