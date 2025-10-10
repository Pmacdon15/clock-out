import { Button } from "@/components/ui/button";
import TimeInput from "@/components/ui/inputs/time-input";
import Link from "next/link";

export default function Loading() {
	return (
		<div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full md:w-3/6 ">
			<div className="flex flex-col gap-4 rounded-xl p-8 bg-black">
				<div className="flex text-white justify-center"></div>
				<div className="flex justify-end ">
					<Link href="/hours-worked">
						<Button variant={"outline"}>Hours Worked</Button>
					</Link>
				</div>
				<TimeInput disabled={false} />
				<TimeInput punchOut disabled={true} />
			</div>
		</div>
	);
}
