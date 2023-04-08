import OpenAI, { OpenAIConfig } from './adapters/OpenAI';

type AdapterType = 'openai' | 'morepromptapi';

export interface IAdapter {
  complete(prompt: string, options: any): Promise<any>;
}

export default class LLM {
  private adapter: IAdapter | null = null;

  constructor(adapter: AdapterType = 'openai', options: any) {
    if (!adapter || adapter === 'openai')
      this.adapter = new OpenAI(options as OpenAIConfig);

    if (!this.adapter) throw new Error('LLM adapter not found');
  }

  async complete(prompt: string, options?: any): Promise<any> {
    if (!this.adapter) throw new Error('LLM adapter not found');

    return this.adapter.complete(prompt, options);
  }
}
