const db = require("../config/connection");
const { User, Blog } = require("../models");
const userSeeds = require("./userSeeds.json");
const blogSeeds = require("./blogSeeds.json");

db.once('open', async () => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await User.create(userSeeds);

    for (let i = 0; i < blogSeeds.length; i++) {
      const { _id, blogAuthor } = await Blog.create(blogSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: blogAuthor },
        {
          $addToSet: {
            blogs: _id,
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
