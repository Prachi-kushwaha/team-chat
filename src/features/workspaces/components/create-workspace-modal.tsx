"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspaces";
import { DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const router = useRouter()
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("")

  const { mutate, isPending} = useCreateWorkspace();
  const handleClose = () => {
    setOpen(false);
    setName("")
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    mutate({name},{
      onSuccess(id){
        toast.success("Workspace created")
        router.push(`/workspace/${id}`)
        handleClose()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} action="" className="space-y-4">
          <Input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="workspace name e.g. 'work', 'persoanl' etc"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
