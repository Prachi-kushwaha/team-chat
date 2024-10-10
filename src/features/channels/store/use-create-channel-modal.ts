import {atom, useAtom} from "jotai";

const createChannelModalAtom = atom(false)

export const useCreateChannelModal = () => {
    const [open, setOpen] = useAtom(createChannelModalAtom);
    return [open, setOpen];
};


