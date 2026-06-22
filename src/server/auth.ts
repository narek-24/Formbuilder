// import Credentials from "next-auth/providers/credentials";
// // import { type Adapter } from "next-auth/adapters";
// import { loginSchema } from "@/lib/schemas/auth-schemas";
// import { cache } from "react";
// import {
//   getServerSession,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// /** * @see https://next-auth.js.org/configuration/options */
// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     session: ({ session, token }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: token.id as string,
//       },
//     }),
//   },
//   //   adapter: DrizzleAdapter(db) as Adapter,
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const { data, success } = loginSchema.safeParse(credentials);
//         if (!success || !data) {
//           return null;
//         }

//         const user = {};

//         if (!user) {
//           throw new Error("User not found.");
//         }

//         // const isMatch = bcrypt.compareSync(data.password, user.hashedPassword);
//         // if (!isMatch) return null;

//         return {
//           id: "123",
//           // id: user.id,
//           // name: user.name,
//           // email: user.email,
//           // image: user.image,
//         };
//       },
//     }),
//   ],
// };

// export const getServerAuthSession = cache(() => getServerSession(authOptions));
