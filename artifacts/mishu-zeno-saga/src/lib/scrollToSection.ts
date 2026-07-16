type ScrollToSectionOptions = {
  offset?: number;
  behavior?: ScrollBehavior;
};

export const scrollToSection = (
  selector: string,
  { offset = 76, behavior = 'smooth' }: ScrollToSectionOptions = {},
) => {
  const target = document.querySelector<HTMLElement>(selector);

  if (!target) {
    return false;
  }

  const scrollRoot = document.scrollingElement ?? document.documentElement;
  const rawTop = target.getBoundingClientRect().top + window.scrollY - offset;
  const maxTop = Math.max(0, scrollRoot.scrollHeight - window.innerHeight);
  const top = Math.min(Math.max(rawTop, 0), maxTop);

  window.requestAnimationFrame(() => {
    try {
      window.scrollTo({ top, behavior });
      scrollRoot.scrollTo({ top, behavior });
    } catch {
      window.scrollTo(0, top);
      scrollRoot.scrollTop = top;
    }
  });

  if (window.history.pushState) {
    window.history.pushState(null, '', selector);
  }

  return true;
};
