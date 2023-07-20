import prisma from '../libs/prismadb';

import getSession from './getSession';

const getCurrentUser = async () => {

    try {
        const session = await getSession();


        // we are not returning error as it's not api endpoint

        if(!session?.user?.email) {
            console.error("session not found");
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email:session.user.email
            }
        });

        if(!currentUser) {
            console.error('user not found!');
            return null;
        }

        return currentUser;
    } catch(error) {

        console.error(error);
        return null;
    }
}

export default getCurrentUser;
