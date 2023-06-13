import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";
import {Keynote} from "@prisma/client";
import {revalidatePath} from "next/cache";
import prisma from "@/lib/prisma";
import {join} from "path";
import {mkdir, stat, writeFile} from "fs/promises";
import AdmZip from "adm-zip";
import {readdirSync} from "fs";
import {
    Dialog,
    DialogContent, DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";

export default function AddButton() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="flex items-center space-x-2 bg-green-700 text-white"><Plus className="mr-2"/> Add
                    Keynote</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <form action={addKeynote}>
                    <DialogHeader>
                        <DialogTitle>Add Keynote</DialogTitle>
                        <DialogDescription>
                            Add a new Keynote to this server. Therefore you have to provide a title, a description and
                            the <b>zip compressed</b> HTML archive.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid w-full items-center gap-1.5 mb-6 mt-8" aria-required>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter title here..." required
                               aria-required/>
                        <p className="text-sm text-muted-foreground">Enter the title of this Keynote.</p>
                    </div>

                    <div className="grid w-full items-center gap-1.5 mb-6" aria-required>
                        <Label htmlFor="desc">Description</Label>
                        <Input type="text" name="desc" id="desc" placeholder="Enter description here..." required
                               aria-required/>
                        <p className="text-sm text-muted-foreground">Enter a description for this Keynote.</p>
                    </div>

                    <div className="grid w-full items-center gap-1.5 mb-6" aria-required>
                        <Label htmlFor="zip">Keynote archive</Label>
                        <Input id="zip" name="zip" type="file" placeholder="demo.zip" accept="application/zip" required
                               aria-required/>
                        <p className="text-sm text-muted-foreground">Upload the <b>.zip compressed</b> archive of the
                            HTML directory you want to display. <br/> You can generate this folder by
                            clicking {'"File" > "Export to" > "HTML"'}.</p>
                    </div>
                    <DialogFooter>
                        <Button type="submit"><Plus className="mr-2"/> Add Keynote</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

async function addKeynote(formData: FormData) {
    "use server"
    console.log(formData)

    const data: { title: string, description: string } = {
        title: formData.get("title") as string,
        description: formData.get("desc") as string
    }

    await prisma.keynote.create({
        data: data
    }).then((keynote: Keynote) => {
        const file = formData.get("zip") as Blob | null;
        if (file) saveZipKeynote(file, keynote.id)
        console.log(keynote)
    })

    revalidatePath(`/`)
    return
}

export async function saveZipKeynote(file: Blob, id: number) {
    const fsextra = require('fs-extra')

    const masterDir = process.cwd() + `/public/keynoteFiles/`

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/${id}`;
    const uploadDir = join(masterDir, relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, {recursive: true});
        } else {
            console.error("Error while trying to create directory when uploading a file\n", e);
        }
    }

    try {
        const filename = `${file.name.replace(
            /\.[^/.]+$/,
            ""
        )}.zip`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const zipFileUrl = `${uploadDir}/${filename}`;
        const admZipFile = new AdmZip(zipFileUrl);
        const tempDir = process.cwd() + `/tmp/${id}`;

        admZipFile.extractAllTo(tempDir, true);
        const zipDirs = readdirSync(tempDir, {withFileTypes: true})
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

        // @ts-ignore
        fsextra.move(tempDir + `/${zipDirs[0]}`, `${uploadDir}`, {overwrite: true}, err => {
            if (err) return console.error(err)
            console.log('success!')
        });
    } catch (e) {
        console.error("Error while trying to upload a file\n", e);
    }
}
