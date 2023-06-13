import {KeynoteSkeleton} from "@/components/keynoteElem";

export default function Home() {

    return (
        <div>
            <header className="bg-white shadow dark:bg-slate-800 dark:text-white">
                <div className="mx-auto max-w-7xl py-6 ml-10">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h1>
                </div>
            </header>
            <main className="mx-auto py-6 sm:px-6 lg:px-8">
                <div
                    className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
                    {[...Array(6)].map((i) => (
                        <div key={i} className="group relative m-3">
                            <KeynoteSkeleton/>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}