import axios from 'axios';
import { IAdapter } from '../LLM';

export interface OpenAIConfig {
  apiKey: string;
  apiVersion?: string;
  apiUrl?: string;
}

export interface OpenAICompletionOptions {
  messages: any[];
  model: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stop?: string[] | string;
}

export default class OpenAI implements IAdapter {
  private apiKey: string;
  private apiVersion: string;
  private apiUrl: string;

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.apiVersion = config.apiVersion || 'v1';
    this.apiUrl = config.apiUrl || 'https://api.openai.com';
  }

  async complete(
    prompt: string,
    options: OpenAICompletionOptions = {
      messages: [],
      model: 'gpt-3.5-turbo',
    },
  ): Promise<any> {
    options.messages = [{ role: 'user', content: prompt || '' }];
    const url = `${this.apiUrl}/${this.apiVersion}/chat/completions`;
    let response = null;

    try {
      response = await axios.post(url, options, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
    } catch (error) {
      console.error(error);
    }

    if (!response || !response.data)
      throw new Error(`OpenAI API call failed, response ${response}`);

    return response.data.choices[0].message.content;
  }
}
