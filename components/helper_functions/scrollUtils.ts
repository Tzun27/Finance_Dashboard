/**
 * Smooth scroll to an element by ID with optional offset
 * @param targetId - The ID of the element to scroll to
 * @param offset - Optional offset in pixels from the top (default: 0)
 */
export function scrollToElement(targetId: string, offset: number = 0): void {
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
