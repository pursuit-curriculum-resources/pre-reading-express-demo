const checkForColorKey = (req, res, next) => {
  if (req.body.hasOwnProperty("name")) {
    next();
  } else {
    res.send("You must supply an object with a key of `name`");
  }
};

module.exports = {
  checkForColorKey,
};
