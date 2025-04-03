function createRandomGenerator(seed: number) : () => number {
    return function() {
      seed = (seed * 1664525 + 1013904223) % 2147483648;
      return seed;
    };
}

export function generateRandomSeed(seed: number, currentDate: Date) : () => number {    
    const dateSeed = currentDate.getFullYear() * 10000 + 
                         (currentDate.getMonth() + 1) * 100 + 
                         currentDate.getDate() + currentDate.getHours() + currentDate.getMinutes() + currentDate.getSeconds();

    const seedToGenerate = dateSeed + seed;
    const random = createRandomGenerator(seedToGenerate);
    
    return random;
}
