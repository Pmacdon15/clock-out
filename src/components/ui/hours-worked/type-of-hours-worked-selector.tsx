// 'use client'
// import { useState } from 'react'
// import type { HoursWorked, Week } from '@/lib/types/punch-clock-types'
// import { HoursWorkedContainer } from './hours-worked-container'

// export default function TypeOfHoursSelector({
// 	payPeriodHoursPromise,
// 	weeklyHoursPromise,
// 	weeksPromise,
// }: {
// 	payPeriodHoursPromise: Promise<HoursWorked[]>
// 	weeklyHoursPromise: Promise<HoursWorked[]>
// 	weeksPromise: Promise<Week[]>
// }) {

// 	return (
// 		// <>
// 			<div className="w-full p-2 md:w-5/6">
// 				<HoursWorkedContainer
// 					payPeriodHoursPromise={payPeriodHoursPromise}
// 					weeklyHoursPromise={weeklyHoursPromise}
// 					weeksPromise={
// 						typeOfHours === 'weekly' ? weeksPromise : undefined
// 					}
// 				/>
// 			</div>
// 		{/* </> */}
// 	)
// }
