"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, BarChart3 } from 'lucide-react';


// Chart component for displaying exchange rate trends
import { ExchangeRateChart } from '@/components/ExchangeRateChart';



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
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  // Popular currencies with their symbols
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  ];

  // Fetch exchange rate and convert currency
  const convertCurrency = async () => {
    if (!fromAmount || parseFloat(fromAmount) === 0) {
      setConvertedAmount('');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_FXRATES_API_KEY;

      if (!apiKey || apiKey === 'your_api_key_here') {
        throw new Error('API key not configured. Please add your FxRatesAPI key to .env.local');
      }

      const response = await fetch(
        `https://api.fxratesapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${fromAmount}&api_key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.result) {
        setConvertedAmount(data.result.toFixed(2));
        setExchangeRate(data.info.rate);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert currency');
      setConvertedAmount('');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch popular exchange rates
  const fetchPopularRates = async () => {
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
      // Silently fail for popular rates
      console.error('Failed to fetch popular rates:', err);
    }
  };

  // Fetch historical exchange rate data
  const fetchHistoricalData = async () => {
    setIsLoadingChart(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_FXRATES_API_KEY;
      if (!apiKey || apiKey === 'your_api_key_here') return;

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const formatDate = (date: Date) => date.toISOString().split('T')[0];

      const response = await fetch(
        `https://api.fxratesapi.com/timeseries?api_key=${apiKey}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&base=${fromCurrency}&currencies=${toCurrency}`
      );

      if (!response.ok) return;

      const data = await response.json();
      if (data.success && data.rates) {
        const chartData = Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
          date,
          rate: rates[toCurrency]
        }));
        setHistoricalData(chartData);
      }
    } catch (err) {
      console.error('Failed to fetch historical data:', err);
    } finally {
      setIsLoadingChart(false);
    }
  };

  // Convert currency when inputs change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      convertCurrency();
    }, 500); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [fromAmount, fromCurrency, toCurrency]);

  // Fetch popular rates on mount
  useEffect(() => {
    fetchPopularRates();
  }, []);

  // Fetch historical data when currencies change
  useEffect(() => {
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  };

  return (
    <section id="currency-converter" className="min-h-screen flex items-center animate-fade-in-up animate-delay-400">
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
              <p className="text-sm text-muted-foreground mb-4">
                Historical exchange rate data over the past 30 days
              </p>

              {/* Chart Area */}
              <div className="h-64 bg-muted/30 rounded-lg p-4">
                {isLoadingChart ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                ) : historicalData.length > 0 ? (
                  <ExchangeRateChart data={historicalData} fromCurrency={fromCurrency} toCurrency={toCurrency} />
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
