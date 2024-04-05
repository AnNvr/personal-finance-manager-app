export const whitelist = [
    'https://yoursite.com',
    "http://localhost:3500",
    "http://localhost:5173",
    "http://127.0.0.1:5500",
]

export const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}