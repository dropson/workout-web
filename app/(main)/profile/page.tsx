'use client';
import { useAuth } from "@/app/modules/auth/hooks/use-auth";
import { AuthGuard } from "@/components/auth-guard";


export default function Profile() {

    const { user} = useAuth();

    return (
        <AuthGuard>
            <div>
                <h2> Hello, {user?.firstName} {user?.lastName}  👋</h2>
            </div>
        </AuthGuard>
    )
}
