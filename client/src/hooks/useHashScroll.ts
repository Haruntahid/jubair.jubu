import { useEffect } from "react";

const NAV_OFFSET = 72;

function scrollToHash(replace = false) {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const scroll = () => {
    const el = document.getElementById(hash);
    if (!el) return;

    const top =
      el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: replace ? "auto" : "smooth" });
  };

  requestAnimationFrame(() => {
    scroll();
    setTimeout(scroll, 150);
  });
}

export function useHashScroll(deps: unknown[] = []) {
  useEffect(() => {
    scrollToHash(true);

    const onHashChange = () => scrollToHash(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
