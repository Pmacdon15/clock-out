import { isAdmin } from '@/lib/utils/clerk-utils'
import LinkWithPath from './link'

export default async function EditHoursLink() {
	const isAdminBool = await isAdmin()
	return isAdminBool ? (
		<LinkWithPath path={'/admin/manage-hours'} text={'Edit Hours'} />
	) : null
}
