import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  // Fire romantic rose and gold confetti with heart shapes
  try {
    const scalar = 2;
    const heart = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });

    confetti({
      shapes: [heart, 'circle'],
      particleCount: 40,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fbbf24'],
      scalar: scalar,
      ticks: 200,
    });
  } catch {
    // Fallback standard confetti
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#e11d48', '#ec4899', '#f43f5e', '#f59e0b'],
    });
  }
}

export function fireGrandCelebration() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff1e60', '#ff70a6', '#ffd166', '#a0c4ff', '#ffbe0b']
    });
    // Right side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff1e60', '#ff70a6', '#ffd166', '#a0c4ff', '#ffbe0b']
    });
  }, 250);
}
