import http from 'http';
import cheerio from 'cheerio';

interface CrawlerResult {
  success: boolean;
  type: string;
  data: any;
}

export default class CrawlerPan extends Pan {
  protected async call(
    headers: http.OutgoingHttpHeaders,
  ): Promise<CrawlerResult> {
    const url = 'http://example.com';

    const options = {
      headers,
    };

    const request = http.get(url, options, response => {
      const contentType = response.headers['content-type'] || '';
      const statusCode = response.statusCode || 0;

      if (statusCode < 200 || statusCode >= 300) {
        request.abort();

        return {
          success: false,
          type: '',
          data: null,
        };
      }

      if (contentType.includes('application/json')) {
        let rawData = '';

        response.on('data', chunk => {
          rawData += chunk;
        });

        response.on('end', () => {
          try {
            const data = JSON.parse(rawData);

            return {
              success: true,
              type: 'json',
              data,
            };
          } catch (error) {
            return {
              success: false,
              type: '',
              data: null,
            };
          }
        });
      } else if (contentType.includes('text/html')) {
        let rawData = '';

        response.on('data', chunk => {
          rawData += chunk;
        });

        response.on('end', () => {
          const $ = cheerio.load(rawData);
          return {
            success: true,
            type: 'html',
            data: $,
          };
        });
      } else {
        request.abort();

        return {
          success: false,
          type: '',
          data: null,
        };
      }
    });

    request.on('error', () => {
      return {
        success: false,
        type: '',
        data: null,
      };
    });
  }
}
