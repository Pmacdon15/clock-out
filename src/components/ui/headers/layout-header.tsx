import { ClockAlert } from "lucide-react";
import Link from "next/link";

export default function Header() {
	return (
		<Link href={"/"}>
			<div className="flex items-center justify-center w-full md:w-4/6 p-4 mx-auto rounded-full border-[3px] border-dashed border-blue-400 mt-8">
				<div
					className={
						"flex gap-2 text-4xl font-bold justify-center align-middle items-center text-center"
					}
				>
					Clock Out <ClockAlert size={34} />
				</div>
			</div>
		</Link>
	);
}
