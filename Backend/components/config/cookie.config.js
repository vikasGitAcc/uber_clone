export const setCookieOptions = {
        httpOnly: true,
        secure: process.env.SECURE_MODE === "production",
        maxAge: 24*60*60*1000,
        sameSite: "lax"    
}