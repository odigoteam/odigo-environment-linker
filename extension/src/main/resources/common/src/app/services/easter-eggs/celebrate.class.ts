declare const startConfetti: any;
declare const stopConfetti: any;

export class CelebrateEasterEgg implements EasterEgg {
  active: boolean = false;

  run(): void {
    startConfetti();
    this.active = true;
  }

  stop(): void {
    stopConfetti();
    this.active = false;
  }
}
