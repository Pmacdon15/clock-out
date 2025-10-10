import { auth, clerkClient } from "@clerk/nextjs/server";
import { OrgMember } from "../types/org-members";

export async function fetchOrgMembers(): Promise<OrgMember[]> {
	const { orgId } = await auth.protect();

	if (!orgId) throw new Error("No org");

	const clerk = await clerkClient();

	const members = await clerk.organizations.getOrganizationMembershipList({
		organizationId: orgId,
	});

	// Filter to only include user names and IDs
	const membersInfo = members.data.map((member) => ({
		userId: member.publicUserData?.userId ?? "",
		firstName: member.publicUserData?.firstName ?? "",
		lastName: member.publicUserData?.lastName ?? "",
	}));

	return membersInfo.filter((member) => member.userId !== "");
}
