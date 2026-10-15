
"use strict";

/**
 * Keeps an index within a circular collection.
 *
 * Example:
 * wrapIndex(-1, 4) returns 3.
 * wrapIndex(4, 4) returns 0.
 */
function wrapIndex(index, length) {
    if (!Number.isInteger(length) || length <= 0) {
        return 0;
    }

    return ((index % length) + length) % length;
}

/**
 * Formats a number using two digits.
 *
 * Example:
 * padNumber(3) returns "03".
 */
function padNumber(number) {
    return String(number).padStart(2, "0");
}

/**
 * Checks whether the visitor prefers reduced motion.
 */
function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}
