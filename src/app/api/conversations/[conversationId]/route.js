import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(request,{params}) {
    try {
        const {conversationId} = params;
        const currentUser = await getCurrentUser();

        if(!currentUser?.id) return new NextResponse('Unauthorize',{status:400});


        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include:{
                users:true
            }
        });

        if(!existingConversation) return new NextResponse('Invalid Id',{status:400});

        const deletedConversation = await prisma.conversation.delete({
            where: {
                id:conversationId,
                userIds: {
                    hasSome:[currentUser.id]
                }
            }
        });

        return NextResponse.json(deletedConversation);

    } catch(error) {
        console.log(error,'ERROR_CONVERSATION_DELETE');
        return new NextResponse('Internal Error',{status:500});
    }
}
