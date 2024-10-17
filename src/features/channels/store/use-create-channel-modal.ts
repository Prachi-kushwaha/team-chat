import {atom, useAtom} from "jotai";

const createChannelModalAtom = atom(false)

export const useCreateChannelModal = (): [boolean, (value: boolean) => void] => {
    const [open, setOpen] = useAtom(createChannelModalAtom);
    return [open, setOpen];
};


