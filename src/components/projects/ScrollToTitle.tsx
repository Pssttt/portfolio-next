'use client';

import { useEffect } from 'react';

export function ScrollToTitle() {
  useEffect(() => {
    setTimeout(() => {
      const titleElement = document.getElementById('project-title');
      if (titleElement) {
        titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  });

  return null;
}
