import { registerAs } from "@nestjs/config";
import * as dotenv from 'dotenv';

export default registerAs('startup', () => {
    dotenv.config();
    return {
        origin: process.env.ORIGIN,
        port: process.env.PORT,
        corsOriginUrl: process.env.CORS_ORIGIN_URL,
        corsContainerOriginUrl: process.env.CORS_CONTAINER_ORIGIN_URL
    }
})
