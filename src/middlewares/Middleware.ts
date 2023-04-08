import { MiddlewareConfig, MiddlewareNode } from './MiddlewareConfig';
import { Agent } from '../agents/Agent';

export interface Middleware {
  id: string;
  name: string;
  description: string;
  agent: Agent;
}

export class MiddlewareManager {
  private middlewares: Middleware[] = [];
  private config: MiddlewareConfig;

  constructor(config: MiddlewareConfig, middlewares: Middleware[] = []) {
    this.config = config;
    this.middlewares = middlewares;
  }

  public add(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  public async run(prompt: string): Promise<void> {
    const keywords = this.extractKeywords(prompt);
    const root = this.config.getRoot();
    await this.runNode(root, keywords);
  }

  private async runNode(
    node: MiddlewareNode,
    keywords: string[],
  ): Promise<void> {
    if (node.isLeaf()) {
      const middleware = this.getMiddlewareById(node.getId());
      middleware.agent.handleKeywords(keywords);
    } else {
      const tasks = node
        .getChildren()
        .map(child => this.runNode(child, keywords));

      if (node.isParallel()) await Promise.all(tasks);
      else for (const task of tasks) await task;
    }
  }

  private extractKeywords(prompt: string): string[] {
    // 从 LLM 模型中提取关键词
    // 返回一个包含关键词的数组
    return [];
  }

  private getMiddlewareById(id: string): Middleware {
    const middleware = this.middlewares.find(m => m.id === id);
    if (!middleware) throw new Error(`Middleware with ID "${id}" not found`);

    return middleware;
  }
}
