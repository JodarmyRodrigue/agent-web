module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.jwt) {
        console.log('User is Authenticated');
    } else {
        console.log('User is not Authenticated');
        if (req.method === 'GET') {
            res.redirect('/auth/login');
        } else if (req.method === 'POST') {
            res.status(400).json({
                message: "VOUS N'AVEZ PAS LA PERMISSION"
            });
        } else {
            res.status(400).json({
                message: "VOUS N'AVEZ PAS LA PERMISSION"
            });
        }

    }
    next();
};