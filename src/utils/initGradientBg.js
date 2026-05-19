/* Sourced from https://github.com/baunov/gradients-bg/blob/main/src/main.ts and converted to JS */
/*
  The MIT License (MIT)
  Copyright (c) 2024 Denis Baunov
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

export function startGradientBg() {
  const interBubble = document.querySelector('#gradient-bg .interactive');
  if (!interBubble) {
    if (import.meta.env.DEV) {
      console.warn('Interactive bubble element not found for gradient background.');
    }
    return () => {};
  }

  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;
  let scrollY = 0;

  function move() {
    curX += (tgX - curX) / 16;
    curY += (tgY - curY) / 16;
    if (interBubble) {
        const offsetY = -scrollY * 0.05;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY + offsetY)}px)`;
    }
    requestAnimationFrame(move);
  }

  const handleMouseMove = (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  };

  const handleScroll = () => {
    scrollY = window.scrollY;
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll, { passive: true });
  const animationFrameId = requestAnimationFrame(move);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(animationFrameId);
    if (interBubble) {
        interBubble.style.transform = 'translate(0px, 0px)';
    }
  };
}
