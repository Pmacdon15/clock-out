import { Card, CardContent, CardHeader, CardTitle } from '../card'

export default function HoursWorkedFilterFallback() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hours Worked </CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<div className="mb-4">
						<label className="mr-2" htmlFor="week-select">
							Filter by week:
						</label>
						<select
							className="rounded border p-1"
							id="week-select"
						></select>
					</div>
					<div className="h-96"></div>
				</div>
			</CardContent>
		</Card>
	)
}
