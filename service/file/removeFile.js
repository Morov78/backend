const path = require("path");
const fs = require("fs/promises");

const removeFile = (avatar) => {
  try {
    const avatarDir = path.join(process.cwd(), "public", avatar);

    fs.rm(avatarDir);
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeFile;
