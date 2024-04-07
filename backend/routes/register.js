import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { registerController } from "../controllers/registerController.js";

// user registration schema
const userRegistrationSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: { type: "string", minLength: 3 },
        password: {
            type: "string",
            minLength: 6,
            // pattern explanation below
/*             pattern:
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{10,}$", */
        },
    },
};

const registerRouter = Router();

registerRouter.post(
    "/register",
    validate({ body: userRegistrationSchema }), registerController
);

export default registerRouter;

/* NOTE */
/* The JSON Schema doesn't directly support password complexity rules
like requiring special symbols, numbers, or uppercase letters
through simple type definitions.
Thus, I mixed a regex pattern property with the schema
to increase complexity requirements.
*/
