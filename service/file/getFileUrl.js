const path = require("path");

const Jimp = require("jimp");

const getFileUrl = (file, uploadDir, fileName, size) => {
  try {
    const avatarDir = path.join(process.cwd(), "public", uploadDir);

    const { filename, path: tempUpload } = file;

    const [extention] = filename.split(".").reverse();

    const avatarName = `${fileName}.${extention}`;
    const avatarUpload = path.join(avatarDir, avatarName);

    Jimp.read(tempUpload, (error, workfile) => {
      if (error) {
        console.log(error);
        throw error;
      }

      workfile.resize(...size).write(avatarUpload);
    });

    // fs.rename(tempUpload, avatarUpload);

    return path.join(uploadDir, avatarName);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getFileUrl;
