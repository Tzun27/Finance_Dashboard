import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const amount = searchParams.get('amount') || '1';

    if (!from || !to) {
        return NextResponse.json(
            { error: 'Missing required parameters: from, to' },
            { status: 400 }
        );
    }

    const apiKey = process.env.FXRATES_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
        return NextResponse.json(
            { error: 'API key not configured' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.fxratesapi.com/convert?from=${from}&to=${to}&amount=${amount}&api_key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch rate from FX API');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('FX API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch exchange rate' },
            { status: 500 }
        );
    }
}
