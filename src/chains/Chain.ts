import Pan from '../pans/Pan';

export class Chain {
  private pan: Pan | null;

  constructor(pan?: Pan) {
    this.pan = pan || null;
  }

  async execute(...args: any[]): Promise<any> {
    return this.pan && (await this.pan.call(args[0]));
  }
}

export class ChainManager {
  static async executeSequentially(
    chains: Chain[],
    inputValues: any[],
  ): Promise<any> {
    let output = inputValues;
    for (const chain of chains) output = await chain.execute(...output);

    return output;
  }

  static async executeParallel(
    chains: Chain[],
    inputValues: any[],
  ): Promise<any> {
    const promises = chains.map(chain => chain.execute(...inputValues));
    const results = await Promise.all(promises);

    return results;
  }
}
