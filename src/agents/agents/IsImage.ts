import Agent from '../Agent';
import LLM from '../../LLM/LLM';
import Prompt from '../../prompts/Prompt';

type AgentResponse = {
  isImage: boolean;
  prompt: string;
};

export default class IsImageAgent extends Agent {
  prompt: Prompt;

  constructor(llm: LLM) {
    super(llm);
    // todo: create different prompt for different types of llm
    this.prompt = new Prompt({
      llm,
      prompt:
        '帮我判断接下面的文字是不是用于生成图片的提示词，如果是的话，直接回答 yes， 否则回答 no：\n{{prompt}}',
      slots: {
        prompt: '',
      },
    });
  }

  async extract(prompt: string): Promise<AgentResponse> {
    const result: string = await this.prompt.execute({ prompt });

    return {
      isImage: result.toLowerCase() === 'yes',
      prompt,
    };
  }
}
