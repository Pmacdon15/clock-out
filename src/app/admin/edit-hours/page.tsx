import BorderBox from "@/components/ui/containers/border-box";
import ListItemEditHours from "@/components/ui/edit-hours/list-item-edit-hours";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchOrgMembers } from "@/lib/DAL/org-members";
import { OrgMember } from "@/lib/types/org-members";


// Dummy data for hours worked
const dummyHours = [
    { id: 1, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-18 09:00:00', time_out: '2024-03-18 17:00:00' },
    { id: 2, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-19 09:00:00', time_out: '2024-03-19 16:30:00' },
    { id: 3, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-20 09:00:00', time_out: '2024-03-20 17:15:00' },
    { id: 4, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-21 09:00:00', time_out: '2024-03-21 16:45:00' },
    { id: 5, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-22 09:00:00', time_out: '2024-03-22 17:00:00' },
    { id: 6, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-23 09:00:00', time_out: '2024-03-23 17:30:00' },
];

export default async function Page() {
    const orgMembers = await fetchOrgMembers();
    console.log("orgMembers:", JSON.stringify(orgMembers, null, 2))
    return (
        <BorderBox>
            <h1 className="text-2xl font-bold mb-4">Edit Hours</h1>
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
            <ul className="divide-y divide-gray-200">
                {dummyHours.map((entry) => (
                    <ListItemEditHours key={entry.id} entry={entry} />
                ))}
            </ul>
        </BorderBox>
    );
}