'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
            <div className="max-w-md w-full mx-4">
                <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                            <svg
                                className="w-8 h-8 text-destructive"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Something went wrong!
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            We encountered an unexpected error. Please try again.
                        </p>
                        {process.env.NODE_ENV === 'development' && error.message && (
                            <div className="mb-6 p-4 bg-muted rounded text-left">
                                <p className="text-sm font-mono text-muted-foreground break-words">
                                    {error.message}
                                </p>
                            </div>
                        )}
                        <button
                            onClick={reset}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
