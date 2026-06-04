"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="w-full justify-start gap-2 hover:bg-transparent cursor-default"
        >
          {/* 
            The UserButton handles the click, the avatar, and the popup automatically.
            We pass elements alongside it to match your sidebar's aesthetic.
          */}
          <UserButton
            showName={false}
            appearance={{
              elements: {
                rootBox: "flex items-center",
                userButtonAvatarBox: "h-8 w-8",
                userButtonTrigger: "focus:shadow-none focus-visible:ring-0",
              },
            }}
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.fullName}</span>
            <span className="truncate text-xs">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
