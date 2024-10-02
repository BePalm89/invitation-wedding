import server from "./src/config/server.js";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 8000;


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})