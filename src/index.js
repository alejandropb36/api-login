import "dotenv/config"; // env
import app from "./app.js";
import { sequelize } from "./config/database.js";

import "./models/User.js";

async function main() {
  try {
    

    const PORT = process.env.PORT || 4000;

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error to run app:", error);
  }
}

main();
