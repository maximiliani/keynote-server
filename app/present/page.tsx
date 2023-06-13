import "./fullscreen.css"
import {Keynote} from "@prisma/client";
import prisma from "@/lib/prisma";

export default async function ActiveKeynote() {
    const keynote: Keynote | null = await prisma.keynote.findFirst({
        where: {
            isActive: true
        },
        orderBy: {
            id: "desc"
        }
    })
    const url = `/keynoteFiles/${keynote?.id}/index.html`

    return (
        <iframe src={url}/>
    )
}