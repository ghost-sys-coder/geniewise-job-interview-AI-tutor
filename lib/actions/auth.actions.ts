"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

// cookie expires in 1 week
const ONE_WEEK = 60 * 60 * 24 * 7;

// signup user with firebase admin sdk
export async function signUp(params: SignUpParams) {
    try {
        const { uid, name, email } = params;

        const userRecord = await db.collection("users").doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists"
            }
        }

        await db.collection("users").doc(uid).set({
            name, email
        });

        return {
            success: true,
            message: "User created successfully"
        }
    } catch (error) {
        console.error("Error creating user", error);

        if (error instanceof Error && (error as { code?: string }).code === "auth/email-already-exists") {
            return {
                success: false,
                message: "Email already exists",
            }
        }
    }
}

// create a session cookie for the user
export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000
    });

    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    })
}

// sign in user with firebase admin sdk
export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "User not found"
            }
        };

        await setSessionCookie(idToken);
    } catch (error) {
        console.error("Error signing in user", error);

        return {
            success: false,
            message: "Failed to log into account"
        }
    }
}


// get current user
export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User;
    } catch (error) {
        console.log("Error getting current user", error);

        return null;
    }


}

// check if user is authenticated
export const isAuthenticated = async () => {
    const user = await getCurrentUser();

    return !!user;
}