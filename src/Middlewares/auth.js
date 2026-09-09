const adminAuth = (req, res, next) => {
  console.log("This was auth getting to the  Admin ");
  const token = "xyz";
  const isAutherized = token === "xyz";
  if (!isAutherized) {
    res.status(401).send("Unauthorized Token");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("This was auth getting to the the user ");
  const token = "xyz";
  const isAutherized = token === "xyz";
  if (!isAutherized) {
    res.status(401).send("Unauthorized Token");
  } else {
    next();
  }
};



module.exports = {userAuth,adminAuth} 