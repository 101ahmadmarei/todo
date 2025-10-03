
export default function SignIn() {
    return (
        <div className="flex h-screen">
            {/* Left sidebar */}

            {/* Right form section */}
            <div className="flex flex-1 items-center justify-center bg-background">
                <div className="max-w-md w-full p-8">
                    <h1 className="text-2xl font-bold mb-2 text-center">Sign in</h1>
                    <p className="text-subText text-center mb-6">
                        Log in to unlock tailored content and stay connected with your community.
                    </p>

                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-primary font-medium hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}