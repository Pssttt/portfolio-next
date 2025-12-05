'use client';

import { useEffect } from 'react';

export function ScrollToTitle() {
  useEffect(() => {
    const titleElement = document.getElementById('project-title');
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return null;
}
