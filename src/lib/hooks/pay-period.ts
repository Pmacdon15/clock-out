import { useQuery } from '@tanstack/react-query'
import { fetchPayPeriod } from '../DAL/par-period'

export const useFetchPayPeriod = (startDate: Date, endDate: Date) => {
	return useQuery({
		queryKey: ['payPeriod', startDate, endDate],
		queryFn: () => fetchPayPeriod(startDate, endDate),
	})
}
