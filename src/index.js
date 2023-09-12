import "dotenv/config"; // env
import app from "./app.js";
import { sequelize } from "./config/database.js";
import cors from "cors";

import "./models/User.js";

async function main() {
  try {
    // CORS
    const whitelist = [
      "http://127.0.0.1:4200",
      "http://127.0.0.1:3000",
      "http://localhost:4200",
      "http://localhost:3000",
      "http://login.alejandropb.net",
      "https://login.alejandropb.net",
      "https://*.alejandropb.net",
    ];

    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Error de cors"));
        }
      },
    };

    app.use(cors(corsOptions));

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
