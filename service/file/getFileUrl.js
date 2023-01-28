const path = require("path");
const fs = require("fs/promises");

const getFileUrl = (file, uploadDir, fileName) => {
  const avatarDir = path.join(process.cwd(), "public", uploadDir);

  const { filename, path: tempUpload } = file;

  const [extention] = filename.split(".").reverse();

  const avatarName = `${fileName}.${extention}`;
  const avatarUpload = path.join(avatarDir, avatarName);

  fs.rename(tempUpload, avatarUpload);

  return path.join(uploadDir, avatarName);
};

module.exports = getFileUrl;
