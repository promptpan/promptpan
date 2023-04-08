import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import Pan from '../Pan';

interface DateRange {
  start: Date;
  end: Date;
}

interface EventData {
  id: string;
  summary: string;
  start: Date;
  end: Date;
}

export default class GCalendarPan extends Pan {
  private readonly authClient: OAuth2Client;
  private readonly calendar: any;

  constructor(credentials: any, token: any) {
    super();
    this.authClient = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0],
    );
    this.authClient.setCredentials(token);
    this.calendar = google.calendar({ version: 'v3', auth: this.authClient });
  }

  protected async call(dateRange: DateRange): Promise<EventData[]> {
    // 调用 Google Calendar API 查询待办事项
    const response = await this.calendar.events.list({
      calendarId: 'primary',
      timeMin: dateRange.start.toISOString(),
      timeMax: dateRange.end.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const items = response.data.items || [];

    // 处理并返回查询结果
    return items.map((item: any) => {
      return {
        id: item.id,
        summary: item.summary,
        start: new Date(item.start.dateTime || item.start.date),
        end: new Date(item.end.dateTime || item.end.date),
      };
    });
  }
}
