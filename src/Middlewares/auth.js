

const adminAuth = (req, res, next) => {
  console.log("This was Getting to Autherized");
  const token = "cvb";
  const isAutherized = token === "cvb";
  if (isAutherized) {
    next();
  } else {
    res.status(401).send("Unauthorized Acess");
  }
}


module.exports = {adminAuth}