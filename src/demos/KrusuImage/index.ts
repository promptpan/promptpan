import IsImage from '../../agents/agents/IsImage';
import readline from 'readline';
import KrusuChain from './KrusuChain';
import LLM from '../../LLM/LLM';

async function krusu(prompt: string): Promise<string> {
  const llm = new LLM('openai', {
    apiKey: '__SK__',
  });

  const isImageAgent = new IsImage(llm);
  const krusuChain = new KrusuChain();

  const agentResult = await isImageAgent.extract(prompt);

  console.info(agentResult);

  return agentResult.isImage
    ? await krusuChain.execute(agentResult.prompt)
    : '不是图片生成提示';
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise<string>(resolve => {
    rl.question('请输入一个文本 prompt: ', resolve);
  });

  const loading = setInterval(() => {
    process.stdout.write('.');
  }, 500);

  const result = await krusu(userInput);

  clearInterval(loading);
  process.stdout.write('\n');

  console.log(`优化后的Prompt：\n${result}`);
}

main();
