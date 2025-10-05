export default function TermsContainer({ children, typeOfContainer }: { children: React.ReactNode, typeOfContainer: string }) {
    return (
        <div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 md:w-4/6  mx-auto w-full">
            <div className="flex flex-col gap-4 rounded-xl p-8 bg-black">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">{typeOfContainer}</h1>
                    <pre className="whitespace-pre-wrap font-sans">
                        {children}
                    </pre>
                </div>
            </div>
        </div>
    )
}