import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hashes a plain text password
export async function hashPassword(password: string): Promise<string> {
  try {
    if (!password) {
      throw new Error("Password cannot be empty");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    if (!hashedPassword) {
      throw new Error("Hashing failed");
    }
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
}

// Verifies a plain text password against a hashed password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    if (!password || !hashedPassword) {
      throw new Error("Password and hashed password cannot be empty");
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Failed to verify password");
  }
}
