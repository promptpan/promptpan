import cheerio from 'cheerio';

interface ClipResult {
  success: boolean;
  content: string;
}

export class ClipPan extends Pan {
  protected async call(html: string): Promise<ClipResult> {
    const $ = cheerio.load(html);

    // 在这里使用 cheerio 来解析 HTML，获取正文信息
    const content = $('body').text();

    if (content.length > 0)
      return {
        success: true,
        content,
      };
    else
      return {
        success: false,
        content: '',
      };
  }
}
