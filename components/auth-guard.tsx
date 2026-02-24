'use client';

import { useAuth } from "@/app/modules/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Spinner } from "./ui/spinner";


export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            router.replace('/auth/login');
        }
    }, [isAuthenticated, isInitialized, router]);


    if (!isInitialized) {
        return <div className="flex flex-1 items-center justify-center w-full h-full min-h-[inherit]">
            <Spinner className="size-10" />
        </div>;
    }


    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
