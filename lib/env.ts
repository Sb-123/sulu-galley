import { cleanEnv, str } from "envalid"

const env = cleanEnv(process.env, {
    PEXELS_API_KEYS: str(),
})

export default env;