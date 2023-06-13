import KeynoteElem from "@/components/keynoteElem";
import {Keynote} from "@prisma/client";
import React from "react";
import AddButton from "@/app/addButton";
import prisma from "@/lib/prisma";

export default async function Home() {
    let keynotes: Keynote[] = await prisma.keynote.findMany();
    let activeKeynote: Keynote|null = await prisma.keynote.findFirst({
        where: {
            isActive: true,
        },
        orderBy: {
            id: 'desc'
        }
    });

    return (
        <div>
            <header className="bg-white shadow dark:bg-slate-800 dark:text-white">
                <div className="mx-auto max-w-7xl py-6 ml-10">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h1>
                </div>
            </header>
            <main className="mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 pb-8 col-2">
                    <div className="flex items-center justify-between space-y-2">
                        <h1 className="font-bold pb-3 text-lg">Currently displaying:</h1>
                        <AddButton />
                    </div>
                    {activeKeynote == null ?
                        <p>Currently there is no active Keynote</p> :
                        <KeynoteElem id={activeKeynote.id}
                                     title={activeKeynote.title}
                                     description={activeKeynote.description}
                                     createdAt={activeKeynote.createdAt}
                                     isActive={activeKeynote.isActive}
                        />
                    }
                </div>

                <h1 className="font-bold px-4 pb-3 text-lg">Available Keynotes:</h1>
                <div
                    className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
                    {keynotes.map((i) => (
                        <>
                            {i.isActive ? <></> :
                                <div key={i.id} className="group relative m-3">
                                    <KeynoteElem id={i.id}
                                                 title={i.title}
                                                 description={i.description}
                                                 createdAt={i.createdAt}
                                                 isActive={i.isActive}
                                    />
                                </div>
                            }
                        </>
                    ))}
                </div>
            </main>
        </div>
    )
}
