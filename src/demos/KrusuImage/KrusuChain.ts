import { Chain } from '../../chains/Chain';
import KrusuImagePromptPan from './KrusuImagePromptPan';

export default class KrusuChain extends Chain {
  async execute(prompt: string): Promise<string> {
    const pan = new KrusuImagePromptPan();

    return await pan.call(prompt);
  }
}
