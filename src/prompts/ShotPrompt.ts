import { Prompt, PromptOptions } from './Prompt';

interface ShotPromptOptions extends PromptOptions {
  shots: string[];
}

export class ShotPrompt extends Prompt {
  constructor({ prompt, format, slots, shots }: ShotPromptOptions) {
    prompt = prompt + '\n for example: \n' + shots.join('\n');
    super({ prompt, format, slots });
  }
}
