import { registerAs } from "@nestjs/config";
import * as dotenv from 'dotenv';

export default registerAs('startup', () => {
    dotenv.config();
    return {
        origin: process.env.ORIGIN,
        port: process.env.PORT,
        corsOrigin: process.env.CORS_ORIGIN,
        corsPort: process.env.CORS_PORT
    }
})
