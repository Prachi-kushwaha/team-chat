
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateChannel } from "../api/use-create-channel";
import * as React from 'react';
import { useWorkspaceId } from "@/hooks/use-workspace-id";


export const CreateChannelModal = () => {
    const workspaceId = useWorkspaceId()
     const {mutate, isPending} = useCreateChannel()
    const [open, setOpen] = useCreateChannelModal();
    const [name, setName] = useState("")

    const handleClose = () => {
        setName("");
        setOpen(false);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value.replace(/\s/g, '-').toLowerCase();
        setName(value);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        mutate({name, workspaceId}, {
            onSuccess: (id) => {
                handleClose()
            }
        })

    }

    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      value={name}
                      disabled={isPending}
                      onChange={handleChange}
                      required
                      autoFocus
                      minLength={3}
                      maxLength={20}
                      placeholder="e.g plan-budget"
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                               Create
                        </Button>
                    </div>
                </form>
            </DialogContent>        
        </Dialog>
    )
   
}   