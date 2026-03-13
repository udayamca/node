function log(req, res, next) {
    console.log('Logging Logger...');
    next();
}

module.exports = log;
