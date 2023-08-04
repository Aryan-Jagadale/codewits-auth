import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
    userId?:string
}


export async function DELETE(
    request:Request, {
        params
    }: {params:IParams}
) {
    

    const {userId} = params


    if(!userId || typeof userId !== 'string') {
        throw new Error('Invalid Id')
    }

    const email = await prisma.client.deleteMany({
        where: {
            id:userId
        }
    });

    return NextResponse.json(email)
}


export async function PUT( 
    request: Request, 
    {params}:{params:IParams}    
) {
    const {userId} = params
    const json = await request.json()

    //console.log(json);
    


    if(!userId || typeof userId !== 'string') {
        throw new Error('Invalid Id')
    }

    const updated = await prisma.client.update({
        where: {
            id: userId,
        },
        data:  json
    })

    return NextResponse.json(updated)

}