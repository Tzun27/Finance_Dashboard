"use client";

import { useState, useMemo } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Amortization schedule entry type
interface AmortizationEntry {
  paymentNumber: number;
  date: Date;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export function MortgageCalculator() {
  // Core mortgage inputs
  const [homePrice, setHomePrice] = useState('400000');
  const [downPaymentDollar, setDownPaymentDollar] = useState('80000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('6.5');

  // Additional costs
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState('4800');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState('1200');
  const [hoaMonthly, setHoaMonthly] = useState('0');

  // Extra payments
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState('0');
  const [oneTimePayment, setOneTimePayment] = useState('0');
  const [oneTimePaymentMonth, setOneTimePaymentMonth] = useState('12');

  // Amortization view toggle
  const [showMonthlySchedule, setShowMonthlySchedule] = useState(false);

  // Validation defaults and minimums
  const DEFAULTS = {
    homePrice: '400000',
    downPayment: '80000',
    interestRate: '6.5',
    propertyTax: '4800',
    homeInsurance: '1200',
  };

  const MINIMUMS = {
    homePrice: 1000,
    downPaymentPercent: 0,
    interestRate: 0.01,
    propertyTax: 0,
    homeInsurance: 0,
    hoa: 0,
    extraPayment: 0,
  };

  // Validation handlers
  const validateHomePrice = () => {
    const value = parseFloat(homePrice);
    if (isNaN(value) || value < MINIMUMS.homePrice) {
      setHomePrice(DEFAULTS.homePrice);
      // Also reset down payment to maintain 20% ratio
      const newDownPayment = (parseFloat(DEFAULTS.homePrice) * 0.2).toFixed(0);
      setDownPaymentDollar(newDownPayment);
      setDownPaymentPercent('20');
    }
  };

  const validateDownPayment = () => {
    const price = parseFloat(homePrice) || parseFloat(DEFAULTS.homePrice);
    const downPayment = parseFloat(downPaymentDollar);

    if (isNaN(downPayment) || downPayment < 0) {
      setDownPaymentDollar('0');
      setDownPaymentPercent('0');
    } else if (downPayment > price) {
      // Cap at 100% of home price
      setDownPaymentDollar(price.toFixed(0));
      setDownPaymentPercent('100');
    }
  };

  const validateInterestRate = () => {
    const value = parseFloat(interestRate);
    if (isNaN(value) || value < MINIMUMS.interestRate) {
      setInterestRate(DEFAULTS.interestRate);
    } else if (value > 100) {
      // Cap at 100% (unreasonably high, but technically possible)
      setInterestRate('100');
    }
  };

  const validatePropertyTax = () => {
    const value = parseFloat(propertyTaxAnnual);
    if (isNaN(value) || value < MINIMUMS.propertyTax) {
      setPropertyTaxAnnual(DEFAULTS.propertyTax);
    }
  };

  const validateHomeInsurance = () => {
    const value = parseFloat(homeInsuranceAnnual);
    if (isNaN(value) || value < MINIMUMS.homeInsurance) {
      setHomeInsuranceAnnual(DEFAULTS.homeInsurance);
    }
  };

  const validateHoa = () => {
    const value = parseFloat(hoaMonthly);
    if (isNaN(value) || value < MINIMUMS.hoa) {
      setHoaMonthly('0');
    }
  };

  const validateExtraMonthly = () => {
    const value = parseFloat(extraMonthlyPayment);
    if (isNaN(value) || value < MINIMUMS.extraPayment) {
      setExtraMonthlyPayment('0');
    }
  };

  const validateOneTimePayment = () => {
    const value = parseFloat(oneTimePayment);
    if (isNaN(value) || value < MINIMUMS.extraPayment) {
      setOneTimePayment('0');
    }
  };

  const validateOneTimePaymentMonth = () => {
    const value = parseInt(oneTimePaymentMonth);
    const maxMonths = parseInt(loanTerm) * 12;
    if (isNaN(value) || value < 1) {
      setOneTimePaymentMonth('12');
    } else if (value > maxMonths) {
      setOneTimePaymentMonth(maxMonths.toString());
    }
  };


  // Sync down payment dollar and percent
  const updateDownPaymentDollar = (value: string) => {
    setDownPaymentDollar(value);
    const price = parseFloat(homePrice) || 0;
    const dollar = parseFloat(value) || 0;
    if (price > 0) {
      setDownPaymentPercent(((dollar / price) * 100).toFixed(2));
    }
  };

  const updateDownPaymentPercent = (value: string) => {
    setDownPaymentPercent(value);
    const price = parseFloat(homePrice) || 0;
    const percent = parseFloat(value) || 0;
    setDownPaymentDollar(((price * percent) / 100).toFixed(0));
  };

  // Calculate mortgage values
  const mortgageCalculations = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const downPayment = parseFloat(downPaymentDollar) || 0;
    const principal = price - downPayment;
    const annualRate = parseFloat(interestRate) / 100 || 0;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    const propertyTaxMonthly = (parseFloat(propertyTaxAnnual) || 0) / 12;
    const insuranceMonthly = (parseFloat(homeInsuranceAnnual) || 0) / 12;
    const hoa = parseFloat(hoaMonthly) || 0;

    // Monthly mortgage payment (P&I only) - M = P[r(1+r)^n]/[(1+r)^n - 1]
    let monthlyPI = 0;
    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const factor = Math.pow(1 + monthlyRate, numberOfPayments);
      monthlyPI = principal * (monthlyRate * factor) / (factor - 1);
    } else if (principal > 0 && numberOfPayments > 0) {
      monthlyPI = principal / numberOfPayments;
    }

    const totalMonthly = monthlyPI + propertyTaxMonthly + insuranceMonthly + hoa;

    return {
      principal,
      downPayment,
      monthlyPI,
      propertyTaxMonthly,
      insuranceMonthly,
      hoa,
      totalMonthly,
      monthlyRate,
      numberOfPayments,
    };
  }, [homePrice, downPaymentDollar, loanTerm, interestRate, propertyTaxAnnual, homeInsuranceAnnual, hoaMonthly]);

  // Generate amortization schedule
  const amortizationSchedule = useMemo(() => {
    const { principal, monthlyPI, monthlyRate, numberOfPayments } = mortgageCalculations;
    const schedule: AmortizationEntry[] = [];

    if (principal <= 0 || monthlyPI <= 0) return schedule;

    let remainingBalance = principal;
    const startDate = new Date();
    const extraMonthly = parseFloat(extraMonthlyPayment) || 0;
    const oneTime = parseFloat(oneTimePayment) || 0;
    const oneTimeMonth = parseInt(oneTimePaymentMonth) || 0;

    for (let i = 1; i <= numberOfPayments && remainingBalance > 0.01; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      let principalPayment = monthlyPI - interestPayment;

      // Add extra payments
      let totalExtraPayment = extraMonthly;
      if (i === oneTimeMonth && oneTime > 0) {
        totalExtraPayment += oneTime;
      }

      principalPayment += totalExtraPayment;

      // Ensure we don't overpay
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance;
      }

      const newBalance = remainingBalance - principalPayment;
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      schedule.push({
        paymentNumber: i,
        date: paymentDate,
        payment: monthlyPI + totalExtraPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, newBalance),
      });

      remainingBalance = newBalance;
    }

    return schedule;
  }, [mortgageCalculations, extraMonthlyPayment, oneTimePayment, oneTimePaymentMonth]);

  // Calculate with and without extra payments
  const extraPaymentAnalysis = useMemo(() => {
    const baseSchedule = amortizationSchedule;
    const { numberOfPayments, monthlyPI } = mortgageCalculations;

    if (baseSchedule.length === 0) {
      return {
        monthsSaved: 0,
        yearsSaved: 0,
        interestSaved: 0,
        totalInterestBase: 0,
        totalInterestWithExtra: 0,
      };
    }

    const monthsSaved = numberOfPayments - baseSchedule.length;
    const yearsSaved = Math.floor(monthsSaved / 12);
    const monthsRemaining = monthsSaved % 12;

    const totalInterestWithExtra = baseSchedule.reduce((sum, entry) => sum + entry.interest, 0);
    const totalInterestBase = (monthlyPI * numberOfPayments) - mortgageCalculations.principal;
    const interestSaved = totalInterestBase - totalInterestWithExtra;

    return {
      monthsSaved,
      yearsSaved,
      monthsRemaining,
      interestSaved,
      totalInterestBase,
      totalInterestWithExtra,
    };
  }, [amortizationSchedule, mortgageCalculations]);

  // Prepare chart data for amortization
  const amortizationChartData = useMemo(() => {
    const data: Array<{ month: number; year: number; balance: number; totalInterest: number }> = [];
    const schedule = amortizationSchedule;

    if (schedule.length === 0) return data;

    // Add starting point at year 0
    data.push({
      month: 0,
      year: 0,
      balance: mortgageCalculations.principal,
      totalInterest: 0,
    });

    let cumulativeInterest = 0;

    // Sample data points - show every 12 months for clarity
    for (let i = 0; i < schedule.length; i++) {
      cumulativeInterest += schedule[i].interest;

      // Include year-end points and the final payment
      if (i % 12 === 11 || i === schedule.length - 1) {
        const yearValue = (i + 1) / 12;
        data.push({
          month: i + 1,
          year: Math.round(yearValue * 10) / 10, // Round to 1 decimal for fractional years
          balance: schedule[i].remainingBalance,
          totalInterest: cumulativeInterest,
        });
      }
    }

    return data;
  }, [amortizationSchedule, mortgageCalculations]);

  // Payment breakdown for pie chart
  const paymentBreakdown = useMemo(() => {
    const { monthlyPI, propertyTaxMonthly, insuranceMonthly, hoa } = mortgageCalculations;

    if (amortizationSchedule.length === 0) {
      return [];
    }

    // Use first month's interest/principal breakdown
    const firstPayment = amortizationSchedule[0];

    return [
      { name: 'Principal', value: firstPayment.principal, color: '#3b82f6' },
      { name: 'Interest', value: firstPayment.interest, color: '#ef4444' },
      { name: 'Property Tax', value: propertyTaxMonthly, color: '#22c55e' },
      { name: 'Insurance', value: insuranceMonthly, color: '#a855f7' },
      ...(hoa > 0 ? [{ name: 'HOA Fees', value: hoa, color: '#f97316' }] : []),
    ].filter(item => item.value > 0);
  }, [mortgageCalculations, amortizationSchedule]);

  // Yearly summary for table
  const yearlySchedule = useMemo(() => {
    const yearly: AmortizationEntry[] = [];

    for (let year = 1; year <= parseInt(loanTerm); year++) {
      const monthIndex = year * 12 - 1;
      if (monthIndex < amortizationSchedule.length) {
        yearly.push(amortizationSchedule[monthIndex]);
      }
    }

    // Add final payment if it doesn't align with year
    const lastPayment = amortizationSchedule[amortizationSchedule.length - 1];
    if (lastPayment && lastPayment.paymentNumber % 12 !== 0) {
      yearly.push(lastPayment);
    }

    return yearly;
  }, [amortizationSchedule, loanTerm]);

  return (
    <section id="mortgage-calculator" className="py-24 bg-background animate-fade-in-up animate-delay-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Mortgage Calculator
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimate your monthly housing costs and understand the long-term financial impact of your mortgage.
            See detailed breakdowns and explore "what if" scenarios.
          </p>
        </div>

        {/* Main Grid Layout - Inputs and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your mortgage information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Home Price */}
                <div className="space-y-2">
                  <Label htmlFor="home-price">Home Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="home-price"
                      type="number"
                      value={homePrice}
                      onChange={(e) => {
                        setHomePrice(e.target.value);
                        // Recalculate down payment dollar amount
                        const price = parseFloat(e.target.value) || 0;
                        const percent = parseFloat(downPaymentPercent) || 0;
                        setDownPaymentDollar(((price * percent) / 100).toFixed(0));
                      }}
                      onBlur={validateHomePrice}
                      className="pl-8"
                      placeholder="400000"
                    />
                  </div>
                </div>

                {/* Down Payment - Dual Input */}
                <div className="space-y-2">
                  <Label>Down Payment</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={downPaymentDollar}
                        onChange={(e) => updateDownPaymentDollar(e.target.value)}
                        onBlur={validateDownPayment}
                        className="pl-8"
                        placeholder="80000"
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        value={downPaymentPercent}
                        onChange={(e) => updateDownPaymentPercent(e.target.value)}
                        onBlur={validateDownPayment}
                        className="pr-8"
                        placeholder="20"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="space-y-2">
                  <Label htmlFor="loan-term">Loan Term</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15-Year Fixed</SelectItem>
                      <SelectItem value="30">30-Year Fixed</SelectItem>
                      <SelectItem value="20">20-Year Fixed</SelectItem>
                      <SelectItem value="10">10-Year Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <Label htmlFor="interest-rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      onBlur={validateInterestRate}
                      className="pr-8"
                      placeholder="6.5"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Costs</CardTitle>
                <CardDescription>Property taxes, insurance, and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Property Tax */}
                <div className="space-y-2">
                  <Label htmlFor="property-tax">Property Tax (Annual)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="property-tax"
                      type="number"
                      value={propertyTaxAnnual}
                      onChange={(e) => setPropertyTaxAnnual(e.target.value)}
                      onBlur={validatePropertyTax}
                      className="pl-8"
                      placeholder="4800"
                    />
                  </div>
                </div>

                {/* Home Insurance */}
                <div className="space-y-2">
                  <Label htmlFor="home-insurance">Homeowners Insurance (Annual)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="home-insurance"
                      type="number"
                      value={homeInsuranceAnnual}
                      onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
                      onBlur={validateHomeInsurance}
                      className="pl-8"
                      placeholder="1200"
                    />
                  </div>
                </div>

                {/* HOA Fees */}
                <div className="space-y-2">
                  <Label htmlFor="hoa-fees">HOA Fees (Monthly)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="hoa-fees"
                      type="number"
                      value={hoaMonthly}
                      onChange={(e) => setHoaMonthly(e.target.value)}
                      onBlur={validateHoa}
                      className="pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Extra Payments</CardTitle>
                <CardDescription>Pay off your mortgage faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Extra Monthly */}
                <div className="space-y-2">
                  <Label htmlFor="extra monthly">Extra Monthly Payment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="extra-monthly"
                      type="number"
                      value={extraMonthlyPayment}
                      onChange={(e) => setExtraMonthlyPayment(e.target.value)}
                      onBlur={validateExtraMonthly}
                      className="pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* One-time Payment */}
                <div className="space-y-2">
                  <Label>One-Time Extra Payment</Label>
                  <p className="text-xs text-muted-foreground">Make a lump sum payment at a specific month</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="one-time" className="text-xs">Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="one-time"
                          type="number"
                          value={oneTimePayment}
                          onChange={(e) => setOneTimePayment(e.target.value)}
                          onBlur={validateOneTimePayment}
                          className="pl-8"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="one-time-month" className="text-xs">At Month #</Label>
                      <Input
                        id="one-time-month"
                        type="number"
                        value={oneTimePaymentMonth}
                        onChange={(e) => setOneTimePaymentMonth(e.target.value)}
                        onBlur={validateOneTimePaymentMonth}
                        placeholder="12"
                        min="1"
                        max={mortgageCalculations.numberOfPayments.toString()}
                      />
                    </div>
                  </div>
                </div>

                {/* Results */}
                {(parseFloat(extraMonthlyPayment) > 0 || parseFloat(oneTimePayment) > 0) && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg space-y-2">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      Pay off {extraPaymentAnalysis.yearsSaved} years {extraPaymentAnalysis.monthsRemaining} months early
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Save ${extraPaymentAnalysis.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} in interest
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Breakdown */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Payment</CardTitle>
                <CardDescription>Your estimated housing costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-6">
                  ${mortgageCalculations.totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Principal & Interest</span>
                    <span className="font-medium">${mortgageCalculations.monthlyPI.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Property Tax</span>
                    <span className="font-medium">${mortgageCalculations.propertyTaxMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Homeowners Insurance</span>
                    <span className="font-medium">${mortgageCalculations.insuranceMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  {mortgageCalculations.hoa > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">HOA Fees</span>
                      <span className="font-medium">${mortgageCalculations.hoa.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-medium">${mortgageCalculations.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-medium">${mortgageCalculations.downPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Breakdown Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Breakdown</CardTitle>
                <CardDescription>First month's payment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Width Amortization Schedule */}
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Amortization Schedule</CardTitle>
              <CardDescription>See how your loan balance decreases over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={amortizationChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="year"
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                      fontSize={12}
                      domain={[0, 'dataMax']}
                      allowDataOverflow={false}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      fontSize={12}
                      width={60}
                    />
                    <Tooltip
                      formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                      labelFormatter={(year) => `Year ${year}`}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      name="Loan Balance"
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalInterest"
                      stroke="#ef4444"
                      strokeWidth={2.5}
                      name="Total Interest Paid"
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Toggle Button */}
              <div className="flex justify-center mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMonthlySchedule(!showMonthlySchedule)}
                >
                  {showMonthlySchedule ? 'Show Yearly Summary' : 'Show Monthly Details'}
                </Button>
              </div>

              {/* Amortization Table */}
              <div className="max-h-96 overflow-y-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-2 font-medium">#</th>
                      <th className="text-left p-2 font-medium">Date</th>
                      <th className="text-right p-2 font-medium">Principal</th>
                      <th className="text-right p-2 font-medium">Interest</th>
                      <th className="text-right p-2 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showMonthlySchedule ? amortizationSchedule : yearlySchedule).map((entry, idx) => (
                      <tr key={idx} className="border-t hover:bg-muted/50">
                        <td className="p-2">{entry.paymentNumber}</td>
                        <td className="p-2">
                          {entry.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </td>
                        <td className="text-right p-2">
                          ${entry.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2">
                          ${entry.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right p-2 font-medium">
                          ${entry.remainingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
