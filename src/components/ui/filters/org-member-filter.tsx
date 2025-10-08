import { OrgMember } from "@/lib/types/org-members";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import { use } from "react";

export default function OrgMembersFilter({ orgMemberPromise }: { orgMemberPromise: Promise<OrgMember[]> }) {
    const orgMembers = use(orgMemberPromise)
    return (
        <h2 className="flex gap-4 items-center">
            <span>For</span>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a member" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Members</SelectLabel>
                        {orgMembers.map((member: OrgMember) => (
                            <SelectItem
                                key={member.userId}
                                value={member.firstName + " " + member.lastName}
                            >
                                {member.firstName + " " + member.lastName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </h2>
    )
}