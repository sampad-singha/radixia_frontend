import { useEffect } from "react"
import {useSearchParams, Link, useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function EmailVerifiedPage() {

    const [params] = useSearchParams()
    const navigate = useNavigate()

    const verified = params.get("verified") === "1"

    useEffect(() => {

        if (verified) {

            const t = setTimeout(() => {
                navigate("/profile")
            }, 3000)

            return () => clearTimeout(t)
        }

    }, [verified, navigate])

    return (
        <div className="flex items-center justify-center min-h-screen">

            <div className="text-center space-y-4">

                {verified ? (
                    <>
                        <h1 className="text-xl font-semibold">
                            Email verified successfully
                        </h1>

                        <Button asChild>
                            <Link to="/profile">
                                Continue
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-semibold">
                            Verification failed
                        </h1>

                        <Button asChild>
                            <Link to="/login">
                                Back to login
                            </Link>
                        </Button>
                    </>
                )}

            </div>

        </div>
    )
}