import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '../../libs/prismadb';
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const {image,name} = body;

        if(!currentUser?.id) {
            return new NextResponse('Unauthorized',{status:401});
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                image:image,
                name:name
            }
        });
        return NextResponse.json(updatedUser);

    } catch(error) {
        console.log(error,"ERROR_SETTING");

        return new NextResponse("Internal Error",{status:500});
    }
}