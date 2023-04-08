import fetch from 'node-fetch';
import Pan from '../Pan'

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export default class WeatherPan extends Pan {
  protected async call(coordinate: Coordinate): Promise<WeatherData> {
    // 调用天气查询下游服务
    const API_KEY = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) throw new Error(`Status code ${response.status}`);

    const data = await response.json();

    // 处理并返回查询结果
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  }
}
