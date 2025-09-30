
// --- SEEDING LOGIC ---

import db from "./db";
import bcrypt from "bcryptjs";

async function seed() {
    console.log("Seeding started...");


    password: await bcrypt.hash("mypassword", 10)

    // Insert into Users table 
//     await db.insert(UsersTable).values([
//   {
//     "firstName": "Jean",
//     "lastName": "Smith",
//     "email": "jean.smith@example.com",
//     "phoneNumber": "+1-781-445-5336",
//     "address": "Unit 1520 Box 9259, DPO AA 89285",
//     "password": await bcrypt.hash("hashed_password_1", 10),
//      "role": "admin",
//     "isVerified": false,
//     "verificationCode": "245274"
//   }


console.log("Seeding finished!");
    process.exit(0);
}

seed().catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
});