import LLM from '../LLM/LLM';

export default class Agent {
  llm: LLM | null;
  constructor(llm: LLM) {
    this.llm = llm;
  }

  extract(prompt: string): any {
    throw new Error('Not implemented');
  }
}
