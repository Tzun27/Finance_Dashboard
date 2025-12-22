/**
 * Mortgage Calculator Math Tests
 * 
 * Tests the mathematical accuracy of mortgage calculations including:
 * - Monthly payment formula (P&I)
 * - Amortization schedule generation
 * - Extra payment scenarios
 * - Edge cases and validation
 */

import { describe, it, expect } from 'vitest';

/**
 * Standard mortgage payment formula: M = P[r(1+r)^n]/[(1+r)^n - 1]
 * Where:
 * - M = Monthly payment
 * - P = Principal (loan amount)
 * - r = Monthly interest rate (annual rate / 12)
 * - n = Number of payments (years * 12)
 */
function calculateMonthlyPayment(
    principal: number,
    annualRate: number,
    years: number
): number {
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    // Reject invalid inputs
    if (principal <= 0 || numberOfPayments <= 0 || annualRate < 0) {
        return 0;
    }

    // Handle zero interest rate
    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }

    const factor = Math.pow(1 + monthlyRate, numberOfPayments);
    return principal * (monthlyRate * factor) / (factor - 1);
}

/**
 * Generate amortization schedule entries
 */
interface AmortizationEntry {
    paymentNumber: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
}

function generateAmortizationSchedule(
    principal: number,
    monthlyPayment: number,
    monthlyRate: number,
    numberOfPayments: number,
    extraMonthlyPayment: number = 0
): AmortizationEntry[] {
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;

    for (let i = 1; i <= numberOfPayments && remainingBalance > 0.01; i++) {
        const interestPayment = remainingBalance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment + extraMonthlyPayment;

        // Don't overpay
        if (principalPayment > remainingBalance) {
            principalPayment = remainingBalance;
        }

        const newBalance = remainingBalance - principalPayment;

        schedule.push({
            paymentNumber: i,
            payment: monthlyPayment + extraMonthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            remainingBalance: Math.max(0, newBalance),
        });

        remainingBalance = newBalance;
    }

    return schedule;
}

describe('Mortgage Calculator - Monthly Payment Calculations', () => {
    it('should calculate correct monthly payment for standard 30-year mortgage', () => {
        // Test case: $320,000 loan at 6.5% for 30 years
        const principal = 320000;
        const annualRate = 0.065;
        const years = 30;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        // Expected: ~$2,022.62
        expect(monthlyPayment).toBeCloseTo(2022.62, 1);
    });

    it('should calculate correct monthly payment for 15-year mortgage', () => {
        // Test case: $320,000 loan at 6.5% for 15 years
        const principal = 320000;
        const annualRate = 0.065;
        const years = 15;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        // Expected: ~$2,787.54
        expect(monthlyPayment).toBeCloseTo(2787.54, 1);
    });

    it('should calculate correct monthly payment for different interest rates', () => {
        const principal = 300000;
        const years = 30;

        // 3% interest
        const payment3pct = calculateMonthlyPayment(principal, 0.03, years);
        expect(payment3pct).toBeCloseTo(1264.81, 2);

        // 7% interest
        const payment7pct = calculateMonthlyPayment(principal, 0.07, years);
        expect(payment7pct).toBeCloseTo(1995.91, 2);
    });

    it('should handle zero interest rate', () => {
        const principal = 100000;
        const annualRate = 0;
        const years = 10;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        // With 0% interest, monthly payment = principal / number of payments
        const expected = 100000 / (10 * 12);
        expect(monthlyPayment).toBeCloseTo(expected, 2);
    });

    it('should handle edge case: very small loan', () => {
        const principal = 1000;
        const annualRate = 0.05;
        const years = 5;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        expect(monthlyPayment).toBeGreaterThan(0);
        expect(monthlyPayment).toBeLessThan(principal); // Monthly payment should be less than total
    });

    it('should return 0 for invalid inputs', () => {
        expect(calculateMonthlyPayment(0, 0.05, 30)).toBe(0);
        expect(calculateMonthlyPayment(-1000, 0.05, 30)).toBe(0);
        expect(calculateMonthlyPayment(100000, -0.05, 30)).toBe(0); // Negative annual rate
        expect(calculateMonthlyPayment(100000, 0.05, 0)).toBe(0);
    });
});

describe('Mortgage Calculator - Amortization Schedule', () => {
    it('should generate correct amortization schedule', () => {
        const principal = 100000;
        const annualRate = 0.06;
        const years = 10;
        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;

        const schedule = generateAmortizationSchedule(
            principal,
            monthlyPayment,
            monthlyRate,
            numberOfPayments
        );

        // Should have exactly 120 payments for 10-year mortgage
        expect(schedule.length).toBe(120);

        // First payment - interest should be significant at 6%
        // But this is a 10-year loan which pays down principal faster
        expect(schedule[0].interest).toBeGreaterThan(0);

        // Last payment should have more principal than interest
        const lastPayment = schedule[schedule.length - 1];
        expect(lastPayment.principal).toBeGreaterThan(lastPayment.interest);

        // Final balance should be ~0
        expect(lastPayment.remainingBalance).toBeCloseTo(0, 0);
    });

    it('should correctly calculate total interest paid', () => {
        const principal = 200000;
        const annualRate = 0.05;
        const years = 30;
        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;

        const schedule = generateAmortizationSchedule(
            principal,
            monthlyPayment,
            monthlyRate,
            numberOfPayments
        );

        const totalInterest = schedule.reduce((sum, entry) => sum + entry.interest, 0);
        const totalPrincipal = schedule.reduce((sum, entry) => sum + entry.principal, 0);

        // Total principal paid should equal original loan amount
        expect(totalPrincipal).toBeCloseTo(principal, 0);

        // Total interest for this loan should be around $186,511
        expect(totalInterest).toBeCloseTo(186511, -2); // Within $100
    });

    it('should handle extra monthly payments correctly', () => {
        const principal = 300000;
        const annualRate = 0.065;
        const years = 30;
        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;
        const extraPayment = 100;

        const scheduleWithoutExtra = generateAmortizationSchedule(
            principal,
            monthlyPayment,
            monthlyRate,
            numberOfPayments
        );

        const scheduleWithExtra = generateAmortizationSchedule(
            principal,
            monthlyPayment,
            monthlyRate,
            numberOfPayments,
            extraPayment
        );

        // With extra payments, loan should be paid off earlier
        expect(scheduleWithExtra.length).toBeLessThan(scheduleWithoutExtra.length);

        // Total interest with extra payments should be less
        const interestWithout = scheduleWithoutExtra.reduce((sum, e) => sum + e.interest, 0);
        const interestWith = scheduleWithExtra.reduce((sum, e) => sum + e.interest, 0);
        expect(interestWith).toBeLessThan(interestWithout);

        // Should save significant interest (typically $40k+ on this scenario)
        const interestSaved = interestWithout - interestWith;
        expect(interestSaved).toBeGreaterThan(30000);
    });

    it('should calculate balance reduction correctly over time', () => {
        const principal = 250000;
        const annualRate = 0.06;
        const years = 30;
        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;

        const schedule = generateAmortizationSchedule(
            principal,
            monthlyPayment,
            monthlyRate,
            numberOfPayments
        );

        // Balance should decrease monotonically
        for (let i = 1; i < schedule.length; i++) {
            expect(schedule[i].remainingBalance).toBeLessThanOrEqual(
                schedule[i - 1].remainingBalance
            );
        }

        // After 1 year (12 payments), balance should be reduced
        const balanceAfter1Year = schedule[11].remainingBalance;
        expect(balanceAfter1Year).toBeLessThan(principal);
        expect(balanceAfter1Year).toBeGreaterThan(principal * 0.95); // Not much in first year
    });
});

describe('Mortgage Calculator - Down Payment Logic', () => {
    it('should correctly calculate loan amount from home price and down payment', () => {
        const homePrice = 400000;
        const downPaymentPercent = 20;
        const downPaymentDollar = (homePrice * downPaymentPercent) / 100;
        const loanAmount = homePrice - downPaymentDollar;

        expect(downPaymentDollar).toBe(80000);
        expect(loanAmount).toBe(320000);
    });

    it('should sync dollar and percent down payments', () => {
        const homePrice = 500000;

        // Convert 15% to dollars
        const percent = 15;
        const dollars = (homePrice * percent) / 100;
        expect(dollars).toBe(75000);

        // Convert $100,000 to percent
        const dollarAmount = 100000;
        const percentage = (dollarAmount / homePrice) * 100;
        expect(percentage).toBe(20);
    });

    it('should handle 0% down payment', () => {
        const homePrice = 300000;
        const downPayment = 0;
        const loanAmount = homePrice - downPayment;

        expect(loanAmount).toBe(homePrice);
    });

    it('should handle 100% down payment (cash purchase)', () => {
        const homePrice = 250000;
        const downPayment = 250000;
        const loanAmount = homePrice - downPayment;

        expect(loanAmount).toBe(0);
    });
});

describe('Mortgage Calculator - Additional Costs', () => {
    it('should correctly calculate monthly costs from annual values', () => {
        const propertyTaxAnnual = 4800;
        const insuranceAnnual = 1200;
        const hoaMonthly = 150;

        const propertyTaxMonthly = propertyTaxAnnual / 12;
        const insuranceMonthly = insuranceAnnual / 12;

        expect(propertyTaxMonthly).toBe(400);
        expect(insuranceMonthly).toBe(100);
        expect(hoaMonthly).toBe(150);

        // Total additional monthly costs
        const totalAdditional = propertyTaxMonthly + insuranceMonthly + hoaMonthly;
        expect(totalAdditional).toBe(650);
    });

    it('should calculate total monthly payment including all costs', () => {
        const principal = 320000;
        const annualRate = 0.065;
        const years = 30;
        const monthlyPI = calculateMonthlyPayment(principal, annualRate, years);

        const propertyTaxMonthly = 400;
        const insuranceMonthly = 100;
        const hoaMonthly = 0;

        const totalMonthly = monthlyPI + propertyTaxMonthly + insuranceMonthly + hoaMonthly;

        // Should be around $2,522.62
        expect(totalMonthly).toBeCloseTo(2522.62, 1);
    });
});

describe('Mortgage Calculator - Edge Cases', () => {
    it('should handle very high interest rates', () => {
        const principal = 100000;
        const annualRate = 0.20; // 20% (very high)
        const years = 30;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        // Should still calculate without errors
        expect(monthlyPayment).toBeGreaterThan(0);
        // At 20% interest, most of payment is interest
        expect(monthlyPayment).toBeGreaterThan(1600); // More than interest-only payment
    });

    it('should handle short loan terms', () => {
        const principal = 100000;
        const annualRate = 0.05;
        const years = 1;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        // 1-year loan should have high monthly payments
        expect(monthlyPayment).toBeGreaterThan(8000);
    });

    it('should handle very low interest rates', () => {
        const principal = 200000;
        const annualRate = 0.01; // 1%
        const years = 30;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);

        // At 1% interest, payment should be low
        expect(monthlyPayment).toBeCloseTo(643.28, 2);
    });
});

describe('Mortgage Calculator - Real World Scenarios', () => {
    it('should handle typical first-time homebuyer scenario', () => {
        // $350,000 home, 5% down, 6.75% rate, 30 years
        const homePrice = 350000;
        const downPaymentPercent = 5;
        const downPayment = (homePrice * downPaymentPercent) / 100;
        const principal = homePrice - downPayment;
        const annualRate = 0.0675;
        const years = 30;

        expect(downPayment).toBe(17500);
        expect(principal).toBe(332500);

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        expect(monthlyPayment).toBeCloseTo(2156.59, 1);
    });

    it('should handle refinance scenario with extra payments', () => {
        // Refinance: $200,000 remaining, 4% rate, 20 years, $200 extra/month
        const principal = 200000;
        const annualRate = 0.04;
        const years = 20;
        const extraMonthly = 200;

        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;

        const scheduleWithExtra = generateAmortizationSchedule(
            principal,
            monthlyPayment,
            monthlyRate,
            numberOfPayments,
            extraMonthly
        );

        // With $200 extra, should pay off faster (around 193 months)
        expect(scheduleWithExtra.length).toBeLessThan(numberOfPayments);
        expect(scheduleWithExtra.length).toBeGreaterThan(160);
    });
});
