const jwt = require("jsonwebtoken");

function Auth(req, res, next) {
  const token = req.headers.token;
  try{
    const isVerify = jwt.verify(token, "SomeSecret")
    let decoded;
    if(isVerify){
        decoded = jwt.decode(token, "SomeSecret");
    }
    res.locals.data = decoded.username;
    next();
  }catch(err){
    res.json({msg: err})
  }
}

module.exports = Auth;
