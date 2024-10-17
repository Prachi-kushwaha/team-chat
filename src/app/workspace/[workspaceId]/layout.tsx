"use client";

import { SideBar } from "./sidebar";
import { Toolbar } from "./toolbar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkSpaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-pannel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/api/components/profile";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const {parentMessageId, profileMemberId, onClose} = usePanel()

  const showPanel = !!parentMessageId || !!profileMemberId
  return (
    <div className="h-full bg-white">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <SideBar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"ca-workspace-layout"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <div><WorkSpaceSidebar/></div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={80}>{children}</ResizablePanel>
          {
            showPanel && (
              <>
              <ResizableHandle withHandle/>
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId? (
                  <Thread 
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ):profileMemberId?(
                     <Profile  memberId={profileMemberId as Id<"members">} onClose={onClose}/>
                ):(

                    <div className="flex h-full items-center justify-center">
                      <Loader className="size-5 animate-spin text-muted-foreground"/>
                    </div>
                )}
              </ResizablePanel>
              </>
            )
          }
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
