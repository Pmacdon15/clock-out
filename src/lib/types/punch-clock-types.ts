export interface TimeCard {
	id: number
	user_id: string
	org_id: string
	time_in: Date
	time_out: Date | null
}
export interface HoursWorked {
	date: string
	hours: number
	fill?: string
}

export interface Week {
	label: string
	value: string
}

export interface MonthlyHours {
	month: string
	hours: number
}
