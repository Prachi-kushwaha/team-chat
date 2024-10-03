"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
