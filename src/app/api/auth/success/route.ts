import {PrismaClient} from "@prisma/client";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    let dbUser = await prisma.user.findUnique({
        where: {id: user.id}
    });
    console.log({dbUser});
    
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                firstname: user.given_name ?? "",
                lastname: user.family_name ?? "",
                picture: user.picture,
            }
        });
    }

    return NextResponse.redirect("http://localhost:3000/dashboard");
}
