import { Button } from "@/components/ui/button"

export default function GoogleLoginButton() {

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    const login = () => {

        const redirectUri =
            `${window.location.origin}/auth/google/callback`

        const scope = "openid profile email"

        const url =
            "https://accounts.google.com/o/oauth2/v2/auth" +
            `?response_type=code` +
            `&client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&access_type=offline` +
            `&prompt=consent`

        window.location.href = url
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-3"
            onClick={login}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="18"
                height="18"
            >
                <path fill="#EA4335" d="M24 9.5c3.2 0 6.1 1.1 8.4 3.3l6.2-6.2C34.8 2.5 29.7 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.3 5.7C11.6 13.2 17.3 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.7-.1-3.3-.4-4.9H24v9.3h12.7c-.5 2.9-2.1 5.3-4.5 7v5.8h7.3c4.3-4 7-9.9 7-17.2z"/>
                <path fill="#FBBC05" d="M9.9 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4v-5.8H2.6C.9 17.3 0 20.6 0 24s.9 6.7 2.6 9.7l7.3-4.8z"/>
                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.7l-7.3-5.8c-2 1.4-4.7 2.2-8.6 2.2-6.7 0-12.4-4.5-14.4-10.6l-7.3 5.7C6.6 42.6 14.6 48 24 48z"/>
            </svg>

            Continue with Google
        </Button>
    )
}