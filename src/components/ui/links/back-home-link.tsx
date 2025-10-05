import Link from "next/link";
import { Button } from "../button";

export default function BackHomeLink() {
    return (
        <Link href={'/'} >
            <Button variant={"outline"}>Back Home</Button>
        </Link>
    )
}