"use client";

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExchangeRateChart } from '@/components/ExchangeRateChart';

// Helper to format Date to YYYY-MM-DD string
const toDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Popular currencies with their symbols
const currencies = [
  // Major currencies
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  // North America & Oceania
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  // Asia
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  // Other popular
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
];

const timeRanges = ['5D', '1M', '1Y', '5Y', 'Max'] as const;
type TimeRange = (typeof timeRanges)[number];

export function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popularRates, setPopularRates] = useState<{ [key: string]: number }>({});
  const [historicalData, setHistoricalData] = useState<{ date: string; rate: number }[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('5D');
  const [fullHistory, setFullHistory] = useState<{ date: string; rate: number }[]>([]);

  // Fetch exchange rate from API
  const fetchExchangeRate = useCallback(async (from: string, to: string): Promise<number> => {
    const apiKey = process.env.NEXT_PUBLIC_FXRATES_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      throw new Error('API key missing');
    }

    const response = await fetch(
      `https://api.fxratesapi.com/convert?from=${from}&to=${to}&amount=1&api_key=${apiKey}`
    );

    if (!response.ok) throw new Error('Failed to fetch rate');
    const data = await response.json();

    if (data.success && data.info) {
      return data.info.rate;
    }
    throw new Error('Invalid rate data');
  }, []);

  // Process API data and fill gaps for missing dates
  const processAndFillData = useCallback((
    rates: Record<string, Record<string, number>>,
    startDate: Date,
    endDate: Date,
    targetCurrency: string
  ): { date: string; rate: number }[] => {
    const chartData: { date: string; rate: number }[] = [];
    const currentDate = new Date(startDate);
    const endStr = toDateString(endDate);

    // Get initial rate from first available data point
    const sortedKeys = Object.keys(rates).sort();
    let lastRate: number | null = sortedKeys.length > 0 && rates[sortedKeys[0]]?.[targetCurrency]
      ? rates[sortedKeys[0]][targetCurrency]
      : null;

    while (toDateString(currentDate) <= endStr) {
      const dateStr = toDateString(currentDate);
      const dailyRate = rates[dateStr]?.[targetCurrency];

      if (dailyRate !== undefined) {
        lastRate = dailyRate;
      }

      if (lastRate !== null) {
        chartData.push({ date: dateStr, rate: lastRate });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return chartData;
  }, []);

  // Fetch 5-day historical data
  const fetch5DayData = useCallback(async (
    from: string,
    to: string
  ): Promise<{ rates: Record<string, Record<string, number>>; startDate: Date; endDate: Date }> => {
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 4); // 5 days total

    const response = await fetch(
      `https://api.frankfurter.dev/v1/${toDateString(startDate)}..${toDateString(endDate)}?base=${from}&symbols=${to}`
    );

    if (!response.ok) throw new Error('Failed to fetch history');
    const data = await response.json();

    return { rates: data.rates, startDate, endDate };
  }, []);

  // Fetch full history (10 years) for caching
  const fetchFullHistory = useCallback(async (from: string, to: string) => {
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - 1); // Up to yesterday

      const startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 10);

      const response = await fetch(
        `https://api.frankfurter.dev/v1/${toDateString(startDate)}..${toDateString(endDate)}?base=${from}&symbols=${to}`
      );

      if (!response.ok) return;
      const data = await response.json();

      if (data.rates) {
        const processedFull = processAndFillData(data.rates, startDate, endDate, to);
        setFullHistory(processedFull);
      }
    } catch (err) {
      console.error('Failed to fetch full history:', err);
    }
  }, [processAndFillData]);

  // Fetch popular exchange rates
  const fetchPopularRates = useCallback(async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_FXRATES_API_KEY;
      if (!apiKey || apiKey === 'your_api_key_here') return;

      const response = await fetch(
        `https://api.fxratesapi.com/latest?base=USD&currencies=EUR,GBP,JPY&api_key=${apiKey}`
      );

      if (!response.ok) return;

      const data = await response.json();
      if (data.success && data.rates) {
        setPopularRates(data.rates);
      }
    } catch (err) {
      console.error('Failed to fetch popular rates:', err);
    }
  }, []);

  // Filter cached data by time range
  const getFilteredData = useCallback((range: TimeRange, currentRate: number | null): { date: string; rate: number }[] => {
    if (fullHistory.length === 0) return [];

    const today = new Date();
    const startDate = new Date(today);

    switch (range) {
      case '5D':
        startDate.setDate(today.getDate() - 5);
        break;
      case '1M':
        startDate.setDate(today.getDate() - 30);
        break;
      case '1Y':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case '5Y':
        startDate.setFullYear(today.getFullYear() - 5);
        break;
      case 'Max':
        startDate.setFullYear(today.getFullYear() - 10);
        break;
    }

    const startStr = toDateString(startDate);
    const filteredData = fullHistory.filter(d => d.date >= startStr);

    // Append today's rate if available
    if (currentRate) {
      const todayStr = toDateString(today);
      if (!filteredData.find(d => d.date === todayStr)) {
        filteredData.push({ date: todayStr, rate: currentRate });
      }
    }

    return filteredData;
  }, [fullHistory]);

  // Initial fetch of popular rates
  useEffect(() => {
    fetchPopularRates();
  }, [fetchPopularRates]);

  // Coordinated fetch when currency pair changes
  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    // Reset states
    setHistoricalData([]);
    setFullHistory([]);
    setExchangeRate(null);
    setConvertedAmount('');
    setTimeRange('5D');
    setIsLoadingChart(true);
    setIsLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        // Fetch rate and 5-day history in parallel
        const [rate, historyRaw] = await Promise.all([
          fetchExchangeRate(fromCurrency, toCurrency),
          fetch5DayData(fromCurrency, toCurrency)
        ]);

        setExchangeRate(rate);
        if (fromAmount) {
          setConvertedAmount((parseFloat(fromAmount) * rate).toFixed(2));
        }

        if (historyRaw?.rates) {
          const processedHistory = processAndFillData(
            historyRaw.rates,
            historyRaw.startDate,
            historyRaw.endDate,
            toCurrency
          );

          // Append today's live rate
          const todayStr = toDateString(new Date());
          const hasToday = processedHistory.some(d => d.date === todayStr);

          if (!hasToday) {
            processedHistory.push({ date: todayStr, rate });
          }

          setHistoricalData(processedHistory);
        }

        // Fetch full history in background for time range switching
        fetchFullHistory(fromCurrency, toCurrency);

      } catch (err) {
        console.error('Coordinated fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoadingChart(false);
        setIsLoading(false);
      }
    };

    loadData();
  }, [fromCurrency, toCurrency, fetchExchangeRate, fetch5DayData, processAndFillData, fetchFullHistory, fromAmount]);

  // Convert currency when amount changes (debounced)
  useEffect(() => {
    if (!fromAmount || parseFloat(fromAmount) === 0) {
      setConvertedAmount('');
      return;
    }

    // If we already have a rate, just calculate
    if (exchangeRate !== null) {
      setConvertedAmount((parseFloat(fromAmount) * exchangeRate).toFixed(2));
      return;
    }

    // Otherwise fetch the rate
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const rate = await fetchExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rate);
        setConvertedAmount((parseFloat(fromAmount) * rate).toFixed(2));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to convert currency');
        setConvertedAmount('');
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fromAmount, exchangeRate, fromCurrency, toCurrency, fetchExchangeRate]);

  // Update chart when time range changes and we have cached data
  useEffect(() => {
    if (fullHistory.length > 0) {
      const filtered = getFilteredData(timeRange, exchangeRate);
      setHistoricalData(filtered);
    } else if (timeRange !== '5D') {
      setIsLoadingChart(true);
    }
  }, [timeRange, fullHistory, exchangeRate, getFilteredData]);

  // Sync live rate to chart data
  useEffect(() => {
    if (exchangeRate && historicalData.length > 0) {
      const todayStr = toDateString(new Date());
      setHistoricalData(prev => {
        const existingIndex = prev.findIndex(d => d.date === todayStr);

        if (existingIndex >= 0) {
          if (prev[existingIndex].rate !== exchangeRate) {
            const updated = [...prev];
            updated[existingIndex] = { ...updated[existingIndex], rate: exchangeRate };
            return updated;
          }
          return prev;
        }

        return [...prev, { date: todayStr, rate: exchangeRate }];
      });
    }
  }, [exchangeRate, historicalData.length]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section id="currency-converter" className="min-h-screen flex items-start pt-24 animate-fade-in-up animate-delay-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Currency Converter
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between currencies with real-time exchange rates for accurate
            financial planning and international transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 items-center transform-gpu transition-transform duration-300 
                     lg:scale-100 xl:scale-105 2xl:scale-110">
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Live Exchange Rates
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get accurate, up-to-date exchange rates for all major currencies.
              Perfect for travel planning, international business, or investment analysis.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="from-amount"
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="pr-16"
                    placeholder="1000"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {currencies.find(c => c.code === fromCurrency)?.symbol}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 items-end">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="from-currency">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSwapCurrencies}
                    className="rounded-full"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="to-currency">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                {error ? (
                  <div className="text-sm text-destructive p-2 bg-destructive/10 rounded">
                    {error}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Converted Amount</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {isLoading ? (
                          <span className="text-muted-foreground">Loading...</span>
                        ) : convertedAmount ? (
                          <>{currencies.find(c => c.code === toCurrency)?.symbol}{convertedAmount}</>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                      {exchangeRate && (
                        <div className="text-xs text-muted-foreground">
                          1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h4 className="text-lg font-medium text-foreground mb-2">Popular Exchange Rates</h4>
              <p className="text-sm text-muted-foreground">
                Live rates for commonly traded currency pairs
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">USD → EUR</span>
                <span className="font-medium">
                  {popularRates.EUR ? popularRates.EUR.toFixed(4) : '...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">USD → GBP</span>
                <span className="font-medium">
                  {popularRates.GBP ? popularRates.GBP.toFixed(4) : '...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">USD → JPY</span>
                <span className="font-medium">
                  {popularRates.JPY ? popularRates.JPY.toFixed(2) : '...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EUR → GBP</span>
                <span className="font-medium">
                  {popularRates.EUR && popularRates.GBP
                    ? (popularRates.GBP / popularRates.EUR).toFixed(4)
                    : '...'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate Trend Chart */}
        <div className="mt-16 transform-gpu transition-transform duration-300 
                     lg:scale-100 xl:scale-105 2xl:scale-110">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h4 className="text-lg font-medium text-foreground mb-2">
                {fromCurrency} to {toCurrency} Exchange Rate Trend
              </h4>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Historical exchange rate data
                </p>
                <div className="flex space-x-1">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                        timeRange === range
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Area */}
              <div className="h-64 bg-muted/30 rounded-lg p-4">
                {isLoadingChart ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                ) : historicalData.length > 0 ? (
                  <ExchangeRateChart
                    data={historicalData}
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    timeRange={timeRange}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground/60 text-sm font-medium mb-1">
                      No chart data available
                    </p>
                    <p className="text-muted-foreground/40 text-xs text-center max-w-48">
                      Please configure your API key to view historical trends
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
