const extractToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
      const errorRes = 
      {
          "error" : 
          { 
              "code" : 401,
              "message" : "Access Denied!" 
          }
      }
      return res.status(401).json(errorRes);
    }
    // console.log(authToken);
    const token = authToken.split(' ')[1];
    req.token = token;
    // console.log(token);
    next();
  }
  module.exports = {extractToken};