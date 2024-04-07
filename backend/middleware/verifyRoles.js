export const verifyRoles = (...roles) => {
    return (req, res, next) => {
        if (!req?.user?.roles) return res.sendStatus(401);
        // iterate over allowedRoles to find the role value I am looking for

        // 1. declare the ...roles as an array to iterate over
        const rolesArray = [...roles];
        // 2. map the array and find the role
        const result = req.roles
            .map((role) => rolesArray.includes(role))
            .find((value) => value == true);

        if (!result) return res.sendStatus(401);
        next();
    };
};

/* export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401); // Non autenticato
        }

        const userRole = req.user.role;
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            return res.sendStatus(403); // Non autorizzato
        }
    };
}; */