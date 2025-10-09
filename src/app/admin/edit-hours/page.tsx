import BorderBox from "@/components/ui/containers/border-box";
import EditHoursList from "@/components/ui/edit-hours/edit-hours-list";
import ListItemEditHours from "@/components/ui/edit-hours/list-item-edit-hours";
import OrgMembersFilter from "@/components/ui/filters/org-member-filter";
import { WeekSelector } from "@/components/ui/filters/week-selector";
import { fetchOrgMembers } from "@/lib/DAL/org-members";
import {
  getAllWeeksWithWorkForEmployee,
  getEmployeeTimeCards,
} from "@/lib/DAL/punch-clock";
import { Suspense } from "react";

// Dummy data for hours worked
const dummyHours = [
  {
    id: 1,
    user_id: "Bob",
    org_id: "org1",
    time_in: "2024-03-18 09:00:00",
    time_out: "2024-03-18 17:00:00",
  },
  {
    id: 2,
    user_id: "Bob",
    org_id: "org1",
    time_in: "2024-03-19 09:00:00",
    time_out: "2024-03-19 16:30:00",
  },
  {
    id: 3,
    user_id: "Bob",
    org_id: "org1",
    time_in: "2024-03-20 09:00:00",
    time_out: "2024-03-20 17:15:00",
  },
  {
    id: 4,
    user_id: "Bob",
    org_id: "org1",
    time_in: "2024-03-21 09:00:00",
    time_out: "2024-03-21 16:45:00",
  },
  {
    id: 5,
    user_id: "Bob",
    org_id: "org1",
    time_in: "2024-03-22 09:00:00",
    time_out: "2024-03-22 17:00:00",
  },
  {
    id: 6,
    user_id: "Bob",
    org_id: "org1",
    time_in: "2024-03-23 09:00:00",
    time_out: "2024-03-23 17:30:00",
  },
];

export default async function Page(props: PageProps<"/admin/edit-hours">) {
  const searchParams = await props.searchParams;

  const employeeIdValue = searchParams.employee;
  const employeeId = Array.isArray(employeeIdValue)
    ? employeeIdValue[0]
    : employeeIdValue;

  const weekValue = searchParams.week
  const week = Array.isArray(weekValue)
    ? weekValue[0]
    : weekValue;


  const orgMembersPromise = fetchOrgMembers();
  const weeksPromise = getAllWeeksWithWorkForEmployee(employeeId);
  const hoursPromise = getEmployeeTimeCards(week, employeeId)

  return (
    <BorderBox>
      <h1 className="text-2xl font-bold mb-4">Edit Hours</h1>
      <Suspense>
        <OrgMembersFilter orgMemberPromise={orgMembersPromise} />
      </Suspense>
      <Suspense>
        <WeekSelector weeksPromise={weeksPromise} variant="/admin/edit-hours" />
      </Suspense>
      <Suspense>
        < EditHoursList hoursPromise={hoursPromise} />
      </Suspense>
    </BorderBox>
  );
}
