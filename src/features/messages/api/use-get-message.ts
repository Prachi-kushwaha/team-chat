import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMessageProps {
    id: Id<"messages">
}


export const useGetMessage = ({id}: UseGetMessageProps) => { 

const data = useQuery(api.message.getById, {id})
const isLoading = data === undefined;

    return {data, isLoading}
}