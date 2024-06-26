// CORS options here
export const whiteList = [
    "https://www.yoursite.com",
    "http://localhost:3500",
    "http://localhost:5173",
    "http://127.0.0.1:5500",
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
