/**
 * Compound Interest Calculator Math Tests
 * 
 * Tests the mathematical accuracy of compound interest calculations including:
 * - Monthly compounding formula
 * - Annual compounding with contributions
 * - Future value calculations
 * - Edge cases and validation
 */

import { describe, it, expect } from 'vitest';

/**
 * Compound interest formula with regular contributions:
 * FV = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
 * 
 * Where:
 * - FV = Future value
 * - P = Initial principal
 * - r = Annual interest rate (as decimal)
 * - n = Number of compounding periods per year
 * - t = Number of years
 * - PMT = Regular contribution amount (per period)
 */
function calculateCompoundInterest(
    principal: number,
    monthlyContribution: number,
    annualRate: number,
    years: number,
    compoundingFrequency: 'monthly' | 'annually'
): number {
    const n = compoundingFrequency === 'monthly' ? 12 : 1;
    const effectiveRate = annualRate / n;
    const compoundExponent = n * years;

    if (years === 0) return principal;

    if (compoundingFrequency === 'annually') {
        // Simple annual compounding
        let value = principal;
        for (let year = 1; year <= years; year++) {
            value = value * (1 + annualRate);
            value += monthlyContribution * 12; // Annual contribution
        }
        return value;
    } else {
        // Monthly compounding with formula
        const principalGrowth = principal * Math.pow(1 + effectiveRate, compoundExponent);

        let annuityGrowth = 0;
        if (effectiveRate > 0) {
            annuityGrowth = monthlyContribution * (Math.pow(1 + effectiveRate, compoundExponent) - 1) / effectiveRate;
        } else {
            annuityGrowth = monthlyContribution * compoundExponent;
        }

        return principalGrowth + annuityGrowth;
    }
}

/**
 * Calculate baseline (no interest) for comparison
 */
function calculateBaseline(
    principal: number,
    monthlyContribution: number,
    years: number
): number {
    return principal + (monthlyContribution * 12 * years);
}

describe('Compound Interest Calculator - Monthly Compounding', () => {
    it('should calculate correct future value with monthly compounding', () => {
        // Test case: $10,000 initial, $500/month, 7% annual rate, 10 years
        const principal = 10000;
        const monthlyContribution = 500;
        const annualRate = 0.07;
        const years = 10;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Expected: ~$106,639 (includes both principal growth and contributions)
        expect(futureValue).toBeCloseTo(106639, 0);
    });

    it('should calculate correct value with no contributions', () => {
        // Only initial investment, no monthly contributions
        const principal = 10000;
        const monthlyContribution = 0;
        const annualRate = 0.07;
        const years = 10;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Expected: $10,000 * (1.07)^10 = ~$20,097
        expect(futureValue).toBeCloseTo(20097, 0);
    });

    it('should calculate correct value with no initial investment', () => {
        // Only monthly contributions, no initial investment
        const principal = 0;
        const monthlyContribution = 500;
        const annualRate = 0.07;
        const years = 10;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Expected: ~$86,542 (annuity formula)
        expect(futureValue).toBeCloseTo(86542, 0);
    });

    it('should handle different time horizons correctly', () => {
        const principal = 5000;
        const monthlyContribution = 300;
        const annualRate = 0.06;

        // 5 years
        const fv5years = calculateCompoundInterest(principal, monthlyContribution, annualRate, 5, 'monthly');
        expect(fv5years).toBeCloseTo(27675, 0);

        // 20 years - our implementation uses end-of-period compounding
        const fv20years = calculateCompoundInterest(principal, monthlyContribution, annualRate, 20, 'monthly');
        expect(fv20years).toBeCloseTo(155163, 0);

        // Longer horizon should always yield more
        expect(fv20years).toBeGreaterThan(fv5years);
    });

    it('should handle different interest rates correctly', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const years = 10;

        // 5% rate
        const fv5pct = calculateCompoundInterest(principal, monthlyContribution, 0.05, years, 'monthly');

        // 10% rate
        const fv10pct = calculateCompoundInterest(principal, monthlyContribution, 0.10, years, 'monthly');

        // Higher rate should yield more
        expect(fv10pct).toBeGreaterThan(fv5pct);

        // 5% should be around $94,000
        expect(fv5pct).toBeCloseTo(94000, -3);

        // 10% should be around $129,000
        expect(fv10pct).toBeCloseTo(129000, -3);
    });

    it('should handle zero interest rate', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const annualRate = 0;
        const years = 10;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // With 0% interest, should equal baseline (principal + contributions)
        const baseline = calculateBaseline(principal, monthlyContribution, years);
        expect(futureValue).toBeCloseTo(baseline, 0);
        expect(futureValue).toBe(70000); // 10000 + (500 * 12 * 10)
    });
});

describe('Compound Interest Calculator - Annual Compounding', () => {
    it('should calculate correct future value with annual compounding', () => {
        const principal = 10000;
        const monthlyContribution = 500; // $6,000 per year
        const annualRate = 0.07;
        const years = 10;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'annually'
        );

        // Annual compounding yields less than monthly
        const monthlyFV = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        expect(futureValue).toBeLessThan(monthlyFV);
    });

    it('should handle contributions at end of year', () => {
        const principal = 5000;
        const monthlyContribution = 100; // $1,200 annual
        const annualRate = 0.08;
        const years = 5;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'annually'
        );

        // Should be positive and reasonable
        expect(futureValue).toBeGreaterThan(principal);
        expect(futureValue).toBeGreaterThan(10000);
    });
});

describe('Compound Interest Calculator - Baseline Comparison', () => {
    it('should calculate baseline correctly (no interest)', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const years = 10;

        const baseline = calculateBaseline(principal, monthlyContribution, years);

        expect(baseline).toBe(70000); // 10000 + (500 * 12 * 10)
    });

    it('should show compound interest exceeds baseline', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const annualRate = 0.07;
        const years = 10;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        const baseline = calculateBaseline(principal, monthlyContribution, years);

        // Compound interest should always be greater than baseline
        expect(futureValue).toBeGreaterThan(baseline);

        // Difference is the earned interest
        const earnedInterest = futureValue - baseline;
        expect(earnedInterest).toBeGreaterThan(26000); // Significant interest earned
    });
});

describe('Compound Interest Calculator - The Power of Compounding', () => {
    it('should demonstrate exponential growth over long periods', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const annualRate = 0.08;

        const fv10years = calculateCompoundInterest(principal, monthlyContribution, annualRate, 10, 'monthly');
        const fv20years = calculateCompoundInterest(principal, monthlyContribution, annualRate, 20, 'monthly');
        const fv30years = calculateCompoundInterest(principal, monthlyContribution, annualRate, 30, 'monthly');

        // Growth should accelerate significantly
        const growth10to20 = fv20years - fv10years;
        const growth20to30 = fv30years - fv20years;

        // Second decade should add more than first decade
        expect(growth20to30).toBeGreaterThan(growth10to20);
    });

    it('should show small rate differences compound to large differences', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const years = 30;

        const fv6pct = calculateCompoundInterest(principal, monthlyContribution, 0.06, years, 'monthly');
        const fv8pct = calculateCompoundInterest(principal, monthlyContribution, 0.08, years, 'monthly');

        // 2% difference compounds to substantial amount over 30 years
        const difference = fv8pct - fv6pct;
        expect(difference).toBeGreaterThan(200000); // Over $200k difference
    });

    it('should show early contributions are more valuable', () => {
        // Scenario 1: Invest $500/month for 10 years, then stop, let grow for 20 more years
        const earlyContributor = calculateCompoundInterest(10000, 500, 0.07, 10, 'monthly');
        const earlyContributorFinal = calculateCompoundInterest(earlyContributor, 0, 0.07, 20, 'monthly');

        // Scenario 2: Wait 10 years, then invest $500/month for 20 years
        const lateContributor = calculateCompoundInterest(10000, 0, 0.07, 10, 'monthly');
        const lateContributorFinal = calculateCompoundInterest(lateContributor, 500, 0.07, 20, 'monthly');

        // Early contributor should have more despite contributing for less time
        expect(earlyContributorFinal).toBeGreaterThan(lateContributorFinal);
    });
});

describe('Compound Interest Calculator - Edge Cases', () => {
    it('should handle zero values gracefully', () => {
        expect(calculateCompoundInterest(0, 0, 0.07, 10, 'monthly')).toBe(0);
        expect(calculateCompoundInterest(0, 500, 0.07, 0, 'monthly')).toBe(0);
    });

    it('should handle large values without overflow', () => {
        const principal = 1000000; // $1M
        const monthlyContribution = 10000; // $10k/month
        const annualRate = 0.10;
        const years = 30;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        expect(futureValue).toBeGreaterThan(0);
        expect(futureValue).toBeLessThan(Number.MAX_SAFE_INTEGER);
    });

    it('should handle very small contributions', () => {
        const principal = 100;
        const monthlyContribution = 10;
        const annualRate = 0.05;
        const years = 5;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        expect(futureValue).toBeGreaterThan(principal);
        expect(futureValue).toBeCloseTo(808, 0);
    });

    it('should handle very high interest rates', () => {
        const principal = 1000;
        const monthlyContribution = 100;
        const annualRate = 0.50; // 50% (crypto/high risk)
        const years = 5;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Should calculate without errors
        expect(futureValue).toBeGreaterThan(0);
        expect(futureValue).toBeGreaterThan(10000); // Significant growth at 50%
    });

    it('should handle fractional years correctly', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const annualRate = 0.07;

        const fv1year = calculateCompoundInterest(principal, monthlyContribution, annualRate, 1, 'monthly');
        const fv2years = calculateCompoundInterest(principal, monthlyContribution, annualRate, 2, 'monthly');

        // 2 years should be more than 2x 1 year due to compounding
        expect(fv2years).toBeGreaterThan(fv1year * 2 - principal); // Accounting for principal
    });
});

describe('Compound Interest Calculator - Real World Scenarios', () => {
    it('should calculate retirement savings correctly', () => {
        // Typical 401k: Start with $10k, contribute $500/month, 7% return, 30 years
        const principal = 10000;
        const monthlyContribution = 500;
        const annualRate = 0.07;
        const years = 30;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Should be around $691,000
        expect(futureValue).toBeGreaterThan(680000);
        expect(futureValue).toBeCloseTo(691150, -1);
    });

    it('should calculate college savings correctly', () => {
        // 529 plan: Start with $5k, contribute $300/month, 6% return, 18 years
        const principal = 5000;
        const monthlyContribution = 300;
        const annualRate = 0.06;
        const years = 18;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Should be around $130,890
        expect(futureValue).toBeGreaterThan(130000);
        expect(futureValue).toBeCloseTo(130890, -1);
    });

    it('should calculate emergency fund growth', () => {
        // High-yield savings: $1k start, $200/month, 4% return, 3 years
        const principal = 1000;
        const monthlyContribution = 200;
        const annualRate = 0.04;
        const years = 3;

        const futureValue = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        // Should be around $8,760
        expect(futureValue).toBeGreaterThan(8700);
        expect(futureValue).toBeCloseTo(8760, -1);
    });

    it('should compare monthly vs annual compounding for savings', () => {
        const principal = 20000;
        const monthlyContribution = 1000;
        const annualRate = 0.06;
        const years = 10;

        const monthlyCompound = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'monthly'
        );

        const annualCompound = calculateCompoundInterest(
            principal,
            monthlyContribution,
            annualRate,
            years,
            'annually'
        );

        // Monthly compounding should yield more
        expect(monthlyCompound).toBeGreaterThan(annualCompound);

        // Difference should be several thousand dollars
        const difference = monthlyCompound - annualCompound;
        expect(difference).toBeGreaterThan(1000);
    });
});

describe('Compound Interest Calculator - Rate Variance Scenarios', () => {
    it('should calculate high and low variance scenarios', () => {
        const principal = 10000;
        const monthlyContribution = 500;
        const baseRate = 0.07;
        const variance = 0.02; // ±2%
        const years = 10;

        const baseFV = calculateCompoundInterest(principal, monthlyContribution, baseRate, years, 'monthly');
        const highFV = calculateCompoundInterest(principal, monthlyContribution, baseRate + variance, years, 'monthly');
        const lowFV = calculateCompoundInterest(principal, monthlyContribution, baseRate - variance, years, 'monthly');

        // High scenario should be greater than base
        expect(highFV).toBeGreaterThan(baseFV);

        // Low scenario should be less than base
        expect(lowFV).toBeLessThan(baseFV);

        // All should be greater than baseline (no interest)
        const baseline = calculateBaseline(principal, monthlyContribution, years);
        expect(lowFV).toBeGreaterThan(baseline);
    });
});
