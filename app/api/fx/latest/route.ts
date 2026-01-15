import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const base = searchParams.get('base') || 'USD';
    const currencies = searchParams.get('currencies') || 'EUR,GBP,JPY';

    const apiKey = process.env.FXRATES_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
        return NextResponse.json(
            { error: 'API key not configured' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.fxratesapi.com/latest?base=${base}&currencies=${currencies}&api_key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch rates from FX API');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('FX API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch exchange rates' },
            { status: 500 }
        );
    }
}
