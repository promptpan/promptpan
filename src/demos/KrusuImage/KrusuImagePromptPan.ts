import KrusuKeywordsMap from './KrusuKeywordsMap';
import Pan from '../../pans/Pan';

export default class KrusuImagePromptPan extends Pan {
  async call(prompt: string): Promise<string> {
    // 在 Prompt 前后补充克鲁苏画风的说明
    const prefix = '克鲁苏之眼看到了这个绘图指令：\n';
    const suffix = '\n请开始创作吧！';

    // 对一些关键词进行替换
    const regex = new RegExp(
      Array.from(KrusuKeywordsMap.keys()).join('|'),
      'gi',
    );
    prompt = prompt.replace(regex, match => {
      return KrusuKeywordsMap.get(match) || match;
    });

    return `${prefix}\n\n${prompt}\n\n${suffix}`;
  }
}
