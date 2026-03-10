import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import {Button} from "@/components/ui/button"

import {useQueryClient} from "@tanstack/react-query"

import {Loader2, Monitor, Smartphone, Tablet} from "lucide-react"

import {
    useRevokeOtherSessions,
    useRevokeSession,
    useSessions
} from "@/features/authentication/queries/auth.queries"

import {parseUserAgent} from "@/lib/userAgent"
import {formatSessionTime} from "@/lib/time"
import {useState} from "react";

export default function SessionsSection() {

    const {data: sessions = [], isLoading} = useSessions()
    const [revokingId, setRevokingId] = useState<number | null>(null)
    const revokeMutation = useRevokeSession()
    const revokeOthersMutation = useRevokeOtherSessions()
    const queryClient = useQueryClient()

    const revoke = (id: number) => {

        setRevokingId(id)

        revokeMutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["sessions"]})
            },
            onSettled: () => {
                setRevokingId(null)
            }
        })

    }

    const revokeOthers = () => {

        revokeOthersMutation.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["sessions"]})
            }
        })

    }

    const deviceIcon = (type: string) => {

        if (type === "mobile") return <Smartphone className="w-5 h-5"/>
        if (type === "tablet") return <Tablet className="w-5 h-5"/>

        return <Monitor className="w-5 h-5"/>

    }

    return (

        <Card>

            <CardHeader>
                <CardTitle className="text-lg">
                    Active Sessions
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {isLoading && (
                    <div className="flex justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin"/>
                    </div>
                )}

                {sessions.map((session) => {

                    const isCurrent = session.current

                    const {browser, browserVersion, os, osVersion, device} =
                        parseUserAgent(session.user_agent)

                    const {relative, exact} =
                        formatSessionTime(session.last_used_at)

                    return (

                        <div
                            key={session.id}
                            className="flex items-center justify-between border rounded-lg p-4"
                        >

                            <div className="flex gap-3">

                                <div className="text-muted-foreground pt-1">
                                    {deviceIcon(device)}
                                </div>

                                <div className="space-y-1">

                                    <p className="text-base font-semibold flex items-center gap-2">
                                        {os} {osVersion} • {browser} {browserVersion}

                                        {isCurrent && (
                                            <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-600">
                                                Current
                                            </span>
                                        )}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        IP: {session.ip_address}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Last used: {relative}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {exact}
                                    </p>

                                </div>

                            </div>

                            <Button
                                size="sm"
                                variant="destructiveSoft"
                                disabled={isCurrent || revokingId === session.id}
                                onClick={() => revoke(session.id)}
                            >

                                {revokingId === session.id && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                )}

                                Revoke

                            </Button>

                        </div>

                    )

                })}

                {sessions.length > 1 && (

                    <Button
                        variant="destructiveSoft"
                        onClick={revokeOthers}
                        disabled={revokeOthersMutation.isPending}
                    >

                        {revokeOthersMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        )}

                        Log out other sessions

                    </Button>

                )}

            </CardContent>

        </Card>

    )

}