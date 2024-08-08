const withAuth = (req, res, next) => {  
  if (!req.session.userType) {
    res.redirect(307, '/login');
    return;
  }
  console.log(req.session.uid + "login")
  next();
};

module.exports = withAuth;
