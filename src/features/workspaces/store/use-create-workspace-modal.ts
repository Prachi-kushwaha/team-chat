import {atom, useAtom} from "jotai";

const createWorkspaceModalAtom = atom(false)

export const useCreateWorkspaceModal = () => {
    const [open, setOpen] = useAtom(createWorkspaceModalAtom);
    return [open, setOpen];
};


