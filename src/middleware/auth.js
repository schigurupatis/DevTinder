const adminAuth = (req, res, next) => {
    //check if the user is authorized or not
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Admin Authentication");
    }else {
        next();
    }
}

const userAuth = (req, res, next) => {
    //check if the user is authorized or not
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("User Authentication");
    }else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}

