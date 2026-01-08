/**
 * Shared validation utilities for financial calculators
 */

/**
 * Validates a numeric input and returns the validated value or default
 * @param value - The string value to validate
 * @param min - Minimum allowed value (optional)
 * @param max - Maximum allowed value (optional)
 * @param defaultValue - Default value to return if validation fails
 * @returns Validated or default value as string
 */
export function validateNumber(
    value: string,
    min?: number,
    max?: number,
    defaultValue: string = '0'
): string {
    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
        return defaultValue;
    }

    if (min !== undefined && numValue < min) {
        return defaultValue;
    }

    if (max !== undefined && numValue > max) {
        return max.toString();
    }

    return value;
}

/**
 * Validates a percentage input (0-100)
 * @param value - The string value to validate
 * @param defaultValue - Default value to return if validation fails
 * @returns Validated or default value as string
 */
export function validatePercentage(
    value: string,
    defaultValue: string = '0'
): string {
    return validateNumber(value, 0, 100, defaultValue);
}

/**
 * Validates a positive number (>= 0)
 * @param value - The string value to validate
 * @param defaultValue - Default value to return if validation fails
 * @returns Validated or default value as string
 */
export function validatePositiveNumber(
    value: string,
    defaultValue: string = '0'
): string {
    return validateNumber(value, 0, undefined, defaultValue);
}

/**
 * Validates an integer within a range
 * @param value - The string value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param defaultValue - Default value to return if validation fails
 * @returns Validated or default value as string
 */
export function validateInteger(
    value: string,
    min: number,
    max: number,
    defaultValue: string
): string {
    const intValue = parseInt(value);

    if (isNaN(intValue)) {
        return defaultValue;
    }

    if (intValue < min) {
        return defaultValue;
    }

    if (intValue > max) {
        return max.toString();
    }

    return intValue.toString();
}

/**
 * Creates a reusable validator function with predefined rules
 * @param min - Minimum allowed value (optional)
 * @param max - Maximum allowed value (optional)
 * @param defaultValue - Default value to return if validation fails
 * @returns A validator function
 */
export function createNumberValidator(
    min?: number,
    max?: number,
    defaultValue: string = '0'
) {
    return (value: string): string => validateNumber(value, min, max, defaultValue);
}
