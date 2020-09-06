module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.jwt) {
        console.log('User is Authenticated');
    } else {
        console.log('User is not Authenticated');
        res.status(400);
        if (req.method === 'GET') {
            res.redirect('/auth/login');
        } else if (req.method === 'POST') {
            res.json({
                message: "VOUS N'AVEZ PAS LA PERMISSION"
            });
        } else {
            res.json({
                message: "VOUS N'AVEZ PAS LA PERMISSION"
            });
        }

    }
    next();
};