import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetMembersProps {
  workspaceId: Id<"workspaces">;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const data = useQuery(api.members.get, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
