/* export const verifyRoles = (...roles) => {
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
}; */

export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Assicurati che req.roles sia un array e non undefined
        const userRoles = req.user.roles;

        console.log(`Ruoli utente: ${userRoles}`);
        console.log(`Ruoli permessi: ${allowedRoles}`);

        if (!userRoles) {
            return res.sendStatus(401); // Nessun ruolo trovato nell'utente
        }

        // Controlla se almeno uno dei ruoli dell'utente è incluso nei ruoli permessi
        const hasRole = userRoles.some(role => allowedRoles.includes(role));
        if (!hasRole) {
            return res.sendStatus(403); // Ruolo non autorizzato
        }

        next(); // Prosegui se l'utente ha il ruolo richiesto
    };
};
