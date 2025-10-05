import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function LinkWithPath({ path, text }: { path: string, text: string }) {
    return (
        <Link href={`${path}`}>
            <Button variant={"outline"}>
                {text}
            </Button>
        </Link>
    )
}