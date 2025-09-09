/**
 * Smooth scroll to an element by ID with optional offset
 * @param targetId - The ID of the element to scroll to
 * @param offset - Optional offset in pixels from the top (default: 0)
 */
export function scrollToElement(targetId: string, offset: number = 0) {
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

/**
 * Simple smooth scroll to element (no offset)
 * @param targetId - The ID of the element to scroll to
 */
export function scrollToElementSimple(targetId: string) {
  scrollToElement(targetId, 0);
}
