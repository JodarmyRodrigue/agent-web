module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.jwt) {
        console.log('User is Authenticated');
    } else {
        console.log('User is not Authenticated');
        res.redirect('/auth/login');
    }
    next();
};