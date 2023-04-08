import { Middleware, MiddlewareManager } from './index';
import { MiddlewareConfig } from './MiddlewareConfig';
import { Agent } from '../agents';

class MyAgent implements Agent {
  extractKeywords(prompt: string): string[] {
    // 从 LLM 模型中提取关键词
    // 返回一个包含关键词的数组
    return ['keyword1', 'keyword2'];
  }

  handleKeywords(keywords: string[]): void {
    // 处理关键词
  }
}

const configData = {
  id: 'root',
  children: [
    {
      id: '1',
      name: 'middleware1',
      description: 'This is middleware 1',
      agent: new MyAgent(),
    },
    {
      id: '2',
      name: 'middleware2',
      description: 'This is middleware 2',
      agent: new MyAgent(),
    },
    {
      id: '3',
      name: 'middleware3',
      description: 'This is middleware 3',
      agent: new MyAgent(),
      children: [
        {
          id: '4',
          name: 'middleware4',
          description: 'This is middleware 4',
          agent: new MyAgent(),
        },
      ],
    },
  ],
};

const config = new MiddlewareConfig(configData);
const manager = new MiddlewareManager(config);

console.log(config.getRoot());

const middleware1: Middleware = {
  id: '1',
  name: 'middleware1',
  description: 'This is middleware 1',
  agent: new MyAgent(),
};

const middleware2: Middleware = {
  id: '2',
  name: 'middleware2',
  description: 'This is middleware 2',
  agent: new MyAgent(),
};

const middleware3: Middleware = {
  id: '3',
  name: 'middleware3',
  description: 'This is middleware 3',
  agent: new MyAgent(),
};

const middleware4: Middleware = {
  id: '4',
  name: 'middleware4',
  description: 'This is middleware 4',
  agent: new MyAgent(),
};

manager.add(middleware1);
manager.add(middleware2);
manager.add(middleware3);
manager.add(middleware4);

manager.run('some input');
