import { useEffect, useRef } from "react"
import { useNavigate, useSearchParams, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useOAuthLogin } from "../queries/oauth.queries"

export default function OAuthCallbackPage() {

    const { provider } = useParams()
    const [params] = useSearchParams()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const oauthMutation = useOAuthLogin()
    const executed = useRef(false)

    useEffect(() => {

        if (executed.current) return
        executed.current = true

        const code = params.get("code")

        if (!provider || !code) {
            navigate("/login")
            return
        }

        const run = async () => {

            try {

                const result = await oauthMutation.mutateAsync({ provider, code })

                if (result.mfa_required) {

                    sessionStorage.setItem(
                        "mfa_data",
                        JSON.stringify({
                            methods: result.available_methods,
                            challengeSent: result.challenge_sent
                        })
                    )

                    navigate("/verify-mfa", { replace: true })
                    return
                }

                await queryClient.fetchQuery({
                    queryKey: ["user"]
                })

                navigate("/profile", { replace: true })

            } catch {

                console.log("OAuth login failed")
                navigate("/login", { replace: true })
            }
        }

        run()

    }, [provider, params, navigate, queryClient, oauthMutation])

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40">
            <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing you in...</span>
            </div>
        </div>
    )
}