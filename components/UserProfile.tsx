import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function UserProfile() {
    return (
        <Card className="container w-full">
            <CardHeader className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>Dang Khoa</CardTitle>
                    <CardDescription>CEO of Facebook</CardDescription>
                </div>

            </CardHeader>
            <CardContent>

            </CardContent>

        </Card>
    )
}
