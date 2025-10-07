export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center p-4 mt-8">{children}</div>
    )
}