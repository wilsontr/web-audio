const baseFrequency = 220.00; // Starting frequency (A3)
export const iwatoScale: number[] = [];

for (let i = 0; i < 3; i++) {
    const octaveOffset = i * 12;
    iwatoScale.push(
        baseFrequency * Math.pow(2, octaveOffset / 12), // 1
        baseFrequency * Math.pow(2, (octaveOffset + 1) / 12), // b2
        baseFrequency * Math.pow(2, (octaveOffset + 5) / 12), // 4
        baseFrequency * Math.pow(2, (octaveOffset + 6) / 12), // b5
        baseFrequency * Math.pow(2, (octaveOffset + 10) / 12) // b7
    );
}