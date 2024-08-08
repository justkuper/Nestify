const withAuth = (req, res, next) => {  
  if (!req.session.userType) {
    res.redirect(307, '/login');
    return;
  }
  console.log(req.session.uid + " auth")
  next();
};

module.exports = withAuth;
