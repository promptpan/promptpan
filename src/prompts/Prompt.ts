import LLM from '../LLM/LLM';

export type SlotValue = string | number;

export interface PromptOptions {
  llm: LLM;
  prompt: string;
  slots?: { [key: string]: SlotValue };
  format?: (response: string, prompt: string) => any;
}

export default class Prompt {
  protected prompt: string;
  protected slotNames: string[];
  protected slots: { [key: string]: SlotValue };
  protected formatFn: (response: string, prompt: string) => any;
  protected llm: LLM;

  constructor({ llm, prompt, slots, format }: PromptOptions) {
    this.llm = llm;
    this.prompt = prompt;
    this.slots = slots || {};
    this.slotNames = Object.keys(this.slots);
    this.formatFn = format || (response => response);
  }

  async execute(slotValues: { [key: string]: SlotValue } = {}): Promise<any> {
    const promptWithSlots = this.slotNames.reduce(
      (prompt, slotName) =>
        prompt.replace(
          `{{${slotName}}}`,
          `${slotValues[slotName] || this.slots[slotName]}`,
        ),
      this.prompt,
    );

    const response = await this.llm.complete(promptWithSlots);

    return this.formatFn(response, this.prompt);
  }
}
