import "./fullscreen.css"
import prisma from "@/lib/prisma";

export default async function Presentation() {
    let keynote = await prisma.keynote.findFirst({
        where: {
            isActive: true,
        },
        orderBy: {
            id: 'desc'
        }
    });

    let url = `/keynoteFiles/${keynote?.id}/index.html`

    return (
        <>
            <iframe src={url} className="w-full aspect-auto block max-w-full h-full max-h-full"/>
        </>
    )
}