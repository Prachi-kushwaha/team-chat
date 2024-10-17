import {atom, useAtom} from "jotai";

const createWorkspaceModalAtom = atom(false)

export const useCreateWorkspaceModal = (): [boolean, (value: boolean) => void] => {
    const [open, setOpen] = useAtom(createWorkspaceModalAtom);
    return [open, setOpen];
};


