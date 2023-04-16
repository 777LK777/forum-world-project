import { registerAs } from "@nestjs/config";
import * as dotenv from 'dotenv';

export default registerAs('api-path', () => {
    dotenv.config();
    return {
        origin: process.env.CORE_ORIGIN
    }
})
