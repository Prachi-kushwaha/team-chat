import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";
import { Button } from "./ui/button";
import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import { Hint } from "./hint";
import { EmojiPopover } from "./emoji-popover";
interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleThread: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton: boolean;
}

export const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleDelete,
  handleThread,
  handleReaction,
  hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className="absolute top-0 right-0">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant="ghost" size="iconSm" disabled={isPending}>
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
         {!hideThreadButton && (
             
        <Hint label="reply to a thread">
          <Button variant="ghost" size="iconSm" disabled={isPending} onClick={handleThread}>
            <MessageSquareTextIcon className="size-4" />
          </Button>
        </Hint>
         )}
         {isAuthor && (
             
        <Hint label="edit message">
          <Button variant="ghost" size="iconSm" disabled={isPending} onClick={handleEdit} >
            <Pencil className="size-4" />
          </Button>
        </Hint>
         )}
         {isAuthor && (

        <Hint label="delete message">
          <Button variant="ghost" size="iconSm" disabled={isPending} onClick={handleDelete}>
            <Trash className="size-4" />
          </Button>
        </Hint>
         )}
      </div>
    </div>
  );
};
