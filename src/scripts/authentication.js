async function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next(); // User is authenticated
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

module.exports = isAuthenticated;