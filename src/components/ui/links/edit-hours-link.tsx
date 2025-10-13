import { isAdminFunction } from '@/lib/utils/clerk-utils'
import LinkWithPath from './link'

export default async function EditHoursLink() {
	const { isAdmin } = await isAdminFunction()
	return isAdmin ? (
		<LinkWithPath path={'/admin/manage-hours'} text={'Manage Hours'} />
	) : null
}
