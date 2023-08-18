import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"

// 0. Auth options
export const authOptions: AuthOptions = {
  // 1. set adapter from PrismaAdapter 
  adapter: PrismaAdapter(prisma),
  // 2.Set providers from Github or Google or any 
  providers: [
    // 2.1 Github provider using clientId and Client Secret
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    // 2.2 Github provider using clientId and Client Secret
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    // 2.3 Credential provider using email and password
    CredentialsProvider({
      // 2.3.1 Set name credentials
      name: 'credentials',
      // 2.3.2 set credential object using email and password
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      // 3.3.3 function authorize credential
      async authorize(credentials) {
        // 3.3.3.1 check credential email and password not exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        // 3.3.3.2 user find using email 
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        // 3.3.3.3 check user or hashedPassword not found 
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }
        //3.3.3.4 Set isCorrectPassword
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        // 3.3.3.5 check password not correct
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        // 3.3.3.6 return user
        return user;
      }
    })
  ],
  // 3. debug 
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  // 4. Secret
  secret: process.env.NEXTAUTH_SECRET,
}
// 5. NextAuth(authOption)
const handler = NextAuth(authOptions);
// 6. GET AND POST
export { handler as GET, handler as POST };