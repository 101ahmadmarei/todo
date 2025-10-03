import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="max-w-md w-full p-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Create account</h1>
            <p className="text-subText text-center mb-6">
                Sign up to join and start organizing your haunted tasks!
            </p>

            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
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
                    Sign up
                </button>
            </form>

            <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/auth/signin" className="text-primary font-medium hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
}