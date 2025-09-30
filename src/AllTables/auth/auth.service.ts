// Database
import { eq, sql } from "drizzle-orm";
import { TIUser, UsersTable } from "../../Drizzle/schema";
import db from "../../Drizzle/db";

//Register user
export const createUserService = async (user: TIUser) => {
    await db.insert(UsersTable).values(user)
    return "User created successfully";
}

//get user by Email
export const getUserByEmailService = async (email: string) => {
    return await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.email} = ${email}`
    });
};

//verify User
export const verifyUserService = async (email: string) => {
    await db.update(UsersTable)
        .set({ isVerified: true, verificationCode: null })
        .where(sql`${UsersTable.email} = ${email}`);
}


//login a user
export const userLoginService = async (user: Partial<TIUser>) => {
    // email and password
    const { email } = user;

    const LoggedInUser = await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.email} = ${email} `
    });
    return LoggedInUser;
}

//Get All Existing Users
export const getAllUsersService = async() =>{
    const allUsers = await db.query.UsersTable.findMany();
    return allUsers;
}


// Get User By userId
export const getUserByIDService = async (ID: number) => {
  const UserByID = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.userId, ID)
  });
  return UserByID;
};

//update a User by id
export const updateUserservice = async (ID: number, UserUpdated: Partial<TIUser>) => {
    const [updated] = await db.update(UsersTable)
        .set(UserUpdated)
        .where(eq(UsersTable.userId, ID))
        .returning();
    
    return updated;
}


//update a User to admin
export const updateUserToAdminservice = async (ID: number, UserUpdated: {"role" : "admin"}) => {
    const [updated] = await db.update(UsersTable)
        .set(UserUpdated)
        .where(eq(UsersTable.userId, ID))
        .returning();
    
    return updated;
}

// Delete User By ID
export const deleteUserservice = async (ID: number) =>{
    const deletedUser = await db.delete(UsersTable)
        .where(sql`${UsersTable.userId} = ${ID}`);
    return deletedUser;
}
