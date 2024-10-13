import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder?: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) =>{
  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const {mutate:createMessage} = useCreateMessage()

  const handleSubmit = ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    console.log({ body, image });
    try {
      createMessage({
        workspaceId,
        channelId,
        body,
      }, {throwError:true})
   setEditorKey((prevKey)=>prevKey+1)
    } catch (error) {
      toast.error("failed to send messages")
    } finally{
      setIsPending(false)
    }
  }  

  return (
    <div className="px-5 w-full">
      <Editor
      key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
}
