/**
 * Shared chart configuration and styling for Recharts components
 */

/**
 * Standard color palette for charts
 */
export const CHART_COLORS = {
    primary: '#3b82f6',      // Blue
    success: '#22c55e',      // Green
    danger: '#ef4444',       // Red
    warning: '#f97316',      // Orange
    purple: '#a855f7',       // Purple
    muted: '#6b7280',        // Gray
    dark: '#0f172a',         // Dark slate
    // Google Finance style trend colors
    trendPositive: '#137333',
    trendNegative: '#d93025',
} as const;

/**
 * Default tooltip styling for consistent appearance across charts
 */
export const DEFAULT_TOOLTIP_STYLE = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    color: '#1f2937',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(4px)',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
} as const;

/**
 * Default label styling for chart tooltips
 */
export const DEFAULT_LABEL_STYLE = {
    color: '#374151',
    fontWeight: '600',
    marginBottom: '4px',
} as const;

/**
 * Common chart margins
 */
export const CHART_MARGINS = {
    default: { top: 20, right: 30, left: 20, bottom: 30 },
    compact: { top: 10, right: 10, left: 0, bottom: 0 },
    large: { top: 30, right: 40, left: 30, bottom: 40 },
} as const;

/**
 * Currency formatter for chart values
 * @param value - The numeric value to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, decimals: number = 0): string {
    return `$${value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })}`;
}

/**
 * Compact number formatter for chart axes (e.g., $10k, $1.5M)
 * @param value - The numeric value to format
 * @returns Formatted compact string
 */
export function formatCompactCurrency(value: number): string {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value.toFixed(0)}`;
}

/**
 * Percentage formatter
 * @param value - The numeric value (0-1 or 0-100)
 * @param asDecimal - Whether value is in decimal form (0-1) vs percentage (0-100)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, asDecimal: boolean = false): string {
    const percentValue = asDecimal ? value * 100 : value;
    return `${percentValue.toFixed(2)}%`;
}
