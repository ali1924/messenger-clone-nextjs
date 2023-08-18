import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request:Request){
        // 1. find post data from client
        const body=await request.json();
        // 2. extract body data
        const {email,name,password}=body;
        // 3. if check any body data not found
        if(!email || !name !password){
            return new NextResponse('Missing Info',{status:400});
        }
        // 4. hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // 5. user create
        const user = await prisma.user.create({
            data: {
              email,
              name,
              hashedPassword
            }
          });
        //   6. return user
        return NextResponse.json(user);
}