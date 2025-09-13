"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, TrendingUp, Globe, Banknote, BarChart3 } from 'lucide-react';

export function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('850.00');

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

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    // In a real app, you would recalculate the conversion here
  };

  return (
    <section id="currency-converter" className="py-24 bg-muted/30">
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Converted Amount</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {currencies.find(c => c.code === toCurrency)?.symbol}{convertedAmount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      1 {fromCurrency} = 0.85 {toCurrency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h4 className="text-lg font-medium text-foreground mb-2">
                Exchange Rate Features
              </h4>
              <p className="text-sm text-muted-foreground">
                Professional currency conversion tools for all your financial needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Real-Time Rates</h5>
                    <p className="text-sm text-muted-foreground">
                      Live exchange rates updated every minute for accurate conversions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Global Coverage</h5>
                    <p className="text-sm text-muted-foreground">
                      Support for 180+ currencies from around the world.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Banknote className="h-5 w-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Bank-Grade Accuracy</h5>
                    <p className="text-sm text-muted-foreground">
                      Professional-grade precision for business and investment use.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <ArrowRightLeft className="h-5 w-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Instant Conversion</h5>
                    <p className="text-sm text-muted-foreground">
                      Quick currency swapping and immediate rate calculations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h6 className="font-medium text-foreground mb-2">Popular Exchange Rates</h6>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USD → EUR</span>
                  <span className="font-medium">0.8500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USD → GBP</span>
                  <span className="font-medium">0.7850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USD → JPY</span>
                  <span className="font-medium">149.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">EUR → GBP</span>
                  <span className="font-medium">0.9235</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder Chart Section - Between input fields and features */}
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

              {/* Placeholder Chart Area */}
              <div className="h-64 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground/60 text-sm font-medium mb-1">
                  Exchange Rate Chart
                </p>
                <p className="text-muted-foreground/40 text-xs text-center max-w-48">
                  Interactive chart showing {fromCurrency}/{toCurrency} rate trends over time - to be implemented
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
