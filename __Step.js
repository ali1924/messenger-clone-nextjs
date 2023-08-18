/* npm i @tailwindcss/form
change tailwind config plugin 

***********Prisma with mongoDB connection*********
1. npx i -D prisma
2. npx prisma init
3. mongodb and prisma provider setup 
4. mongodb uri in .env (mongodb database vs uri)
5. model create (in schema.prisma file) 
6. npx prisma db push

***********(1:18:51)Time**************
npm i next-auth@latest  
npm i @prisma/client 
npm i @next-auth/prisma-adapter 
npm i bcrypt
npm i -D @types/bcrypt

************ app>libs>prismadb.ts
  (a)  1. import prisma client
       2. client create (globally)
       3. declare client type (globally)
       4. export

   (b)*********route****** app>api>auth>[...nextAuth]>route.ts
      i. const authOptions
         i.1 adapter
         i.2 provider
            i.2.1 CredentialsProvider
         i.3 debug
      ii.export NextAuth(authOptions)

    (C)*****register********app>api>register>route.ts
    




*/
