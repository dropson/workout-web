'use client'

import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Bell, LogIn, LogOut, SquarePercent, User, UserPlus } from "lucide-react"
import { Hint } from "../hint"
import { useAuth } from "@/app/modules/auth/hooks/use-auth"
export function Header() {

    const { logout, user, isAuthenticated, } = useAuth()
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log('Login failed')
        }
    }

    return (
        <div className="flex justify-between items-center bg-zinc-100 p-2 sm:p-4 ">
            <div>
                <Link href='/' className="flex items-center gap-2 group">
                    <Image src='/images/gym.png'
                        className="transition-transform duration-300 group-hover:scale-115"
                        width={32} height={32} priority alt="logo" />
                    <span className="font-bold transition-all duration-300 group-hover:underline">Workout</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">

                <Dialog>
                    <DialogTrigger asChild>

                        <Button variant="ghost" className="rounded-full cursor-pointer" size='icon-lg'>
                            <Hint label="Changelog">
                                <Bell color="#4F8EF7" className="size-6" strokeWidth={2.5} />
                            </Hint>
                        </Button>

                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>What's New</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <p key={index} className="mb-4 leading-normal">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                        <Button size="icon" className="rounded-full bg-gray-400 cursor-pointer">
                            <Hint label="Profile">
                                <Avatar className="bg-sky-600">
                                    {isAuthenticated ? (
                                        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                                    ) : (

                                        <AvatarFallback className="bg-sky-600"><User color="white" /></AvatarFallback>

                                    )}
                                </Avatar>
                            </Hint>
                        </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                        {isAuthenticated ? (
                            <>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link className="flex items-center gap-2" href='/profile'><User /> Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem> <SquarePercent color="#6b21a8" /> Subscription</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive"><button className="flex items-center gap-2 cursor-pointer" onClick={handleLogout} ><LogOut color="red" /> Logout</button></DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link className="flex items-center gap-2" href='/auth/login'><LogIn /> Login</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link className="flex items-center gap-2" href='/auth/register'><UserPlus /> Register</Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}
