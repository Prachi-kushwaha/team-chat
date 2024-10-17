"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/user-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const router = useRouter()
    const{signOut} = useAuthActions()
  const { data, isLoading } = useCurrentUser();

  if(isLoading){
    return <Loader className="size-4 animate-spin text-muted-foreground"/>
  }

  if(!data){
    return null;
  }

  const {image, name } = data

  const avatarFallback = name!.charAt(0).toUpperCase()

  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    router.push("/"); // Redirect to the home page
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage className="rounded-md" alt={name} src={image}/>
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={handleSignOut} className="h-10">
            <LogOut className="size-4 mr-2"/>
            Logout
            </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
