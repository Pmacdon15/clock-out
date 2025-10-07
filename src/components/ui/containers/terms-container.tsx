import BorderBox from "./border-box"

export default function TermsContainer({ children, typeOfContainer }: { children: React.ReactNode, typeOfContainer: string }) {
    return (
        <BorderBox>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">{typeOfContainer}</h1>
                <pre className="whitespace-pre-wrap font-sans">
                    {children}
                </pre>
            </div>
        </BorderBox>
    )
}