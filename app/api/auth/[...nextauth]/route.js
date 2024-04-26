import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '../../../../utils/database'
import User from '../../../models/user'
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDB()
                // regarder si l'utilisateur existe deja
                const userExists = await User.findOne({ email: profile.email })
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s+/g, "").toLowerCase(),

                        image: profile.picture
                    })
                }


                //si il n'existe pas d'utilisateur, créer un utilisateur
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }


    },

})
export { handler as GET, handler as POST }