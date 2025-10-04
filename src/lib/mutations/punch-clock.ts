import { useMutation } from "@tanstack/react-query";
import { punchInOrOutAction } from "../actions/punch-clock";
import { revalidatePathAction } from "../actions/revalidate";

export const usePunchClock = () => {
    return useMutation({
        mutationFn: (punchOut: boolean) => {
            return punchInOrOutAction(punchOut);
        },
        onSuccess: () => {
            revalidatePathAction("/punch-clock");
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};