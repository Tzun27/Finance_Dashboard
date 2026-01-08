import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
            <div className="max-w-md w-full mx-4">
                <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <svg
                                className="w-8 h-8 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Sorry, we couldn&apos;t find the page you&apos;re looking for.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
