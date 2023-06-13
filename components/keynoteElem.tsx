import {Skeleton} from "@/components/ui/skeleton"
import {Keynote} from "@prisma/client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Button} from "@/components/ui/button";
import {Edit, ExternalLink, Presentation, StopCircle, Trash} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {revalidatePath, revalidateTag} from "next/cache";
import fs from "fs";

export default function KeynoteElem({id, title, description, isActive, createdAt}: Keynote) {
    async function deleteKeynote() {
        "use server"
        const masterDir = process.cwd() + `/public/keynoteFiles/`
        fs.rmSync(masterDir + `/${id}`, {recursive: true, force: true})
        await prisma.keynote.delete({
            where: {
                id: id
            }
        })
        revalidatePath(`/`)
        return
    }

    async function toggleActive() {
        "use server"

        await prisma.keynote.update({
            where: {
                id: id
            },
            data: {
                isActive: !isActive
            }
        })

        revalidatePath(`/`)
        revalidatePath("/present")
        revalidateTag("present")
        return
    }

    return (
        <Card className="w-[425px]">
            <CardHeader>
                <CardTitle className="flex justify-between gap-3">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <Link href={`/keynoteFiles/${id}/index.html`} target="_blank"><ExternalLink/></Link>
                </CardTitle>
                <CardDescription>
                    <p className="text-sm text-gray-500 pb-1 font-bold">Created at: {createdAt.toUTCString()}</p>
                    <p className="text-gray-500 h-11">{description}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <iframe src={`/keynoteFiles/${id}/index.html`} className="h-48 w-[375px]"/>
            </CardContent>
            <CardFooter className="flex justify-between gap-3">
                <form action={toggleActive}>{isActive ?
                    <Button type="submit" variant="outline" className="bg-red-500 text-white p-2">
                        <StopCircle className="mr-1"/> Stop Signage
                    </Button>
                    :
                    <Button type="submit">
                        <Presentation className="mr-2"/> Present
                    </Button>
                }</form>
                <form action={deleteKeynote}>
                    <Button variant="destructive"><Trash className="mr-2"/> Delete</Button>
                </form>
            </CardFooter>
        </Card>
    )
}

export function KeynoteSkeleton() {
    return (
        <Card className="w-[425px]">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-[275px]"/>
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-14 w-[375px]"/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-48 w-[375px]"/>
            </CardContent>
            <CardFooter className="flex justify-between gap-3">
                <Toggle variant="outline" size="lg" aria-label="Toggle signage" disabled> <Presentation
                    className="mr-2"/> Present on signage</Toggle>
                <Button variant="secondary" disabled><Edit className="mr-2"/> Edit</Button>
                <Button variant="destructive" disabled><Trash className="mr-2"/> Delete</Button>
            </CardFooter>
        </Card>
    )
}