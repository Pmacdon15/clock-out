import { useMutation } from "@tanstack/react-query";
import { punchInOrOutAction } from "../actions/punch-clock";

export const usePunchClock = () => {
    return useMutation({
        mutationFn: () => {
            return punchInOrOutAction();
        },
        // onSuccess: () => { revalidatePathAction("/lists/client") },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};
