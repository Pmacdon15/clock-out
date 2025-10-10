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
						<label htmlFor="week-select" className="mr-2">
							Filter by week:
						</label>
						<select
							id="week-select"
							className="border p-1 rounded"
						></select>
					</div>
					<div className="h-96"></div>
				</div>
			</CardContent>
		</Card>
	)
}
