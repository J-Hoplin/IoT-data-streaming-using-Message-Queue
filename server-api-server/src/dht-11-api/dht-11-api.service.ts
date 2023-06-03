import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import influxConfig from 'src/config/config/influx.config';
import { InfluxDB } from '@influxdata/influxdb-client';
import { HumidityRepsonse } from './dto/humidity.response';
import { TemperatureResponse } from './dto/temperature.response';
import { HumidityNTemperatureResponse } from './dto/HumidityNTemperature.response';
import { InfluxSeriesResult } from './dto/influxSeries.result';

@Injectable()
export class Dht11ApiService {
  private commonCallback: preprocessCallBack = (
    series: influxPointFields[],
  ): InfluxSeriesResult[] => {
    const newPoints: InfluxSeriesResult[] = series.map((point) => {
      return new InfluxSeriesResult({
        time: point._time,
        value: point._value as number,
      });
    });
    return newPoints;
  };

  constructor(
    @Inject(influxConfig.KEY)
    private readonly influxConfigs: ConfigType<typeof influxConfig>,
  ) {}

  private async influxQLExecution(
    query: string,
    cb: preprocessCallBack,
  ): Promise<any[]> {
    const influxQueryApi = new InfluxDB({
      url: this.influxConfigs.url,
      token: this.influxConfigs.token,
    }).getQueryApi(this.influxConfigs.org);
    const datas = await influxQueryApi.collectRows(query);
    const preprocessDats = await cb(datas);
    return preprocessDats;
  }

  public async getAll(time: number): Promise<HumidityNTemperatureResponse> {
    const humidity = await this.getHumidity(time);
    const temperature = await this.getTemperature(time);
    return new HumidityNTemperatureResponse({
      humidity: humidity.humidity,
      temperature: temperature.temperature,
    });
  }

  public async getHumidity(time: number): Promise<HumidityRepsonse> {
    const query = `from(bucket: "DHT11-Measurement")
    |> range(start: -${time}m)
    |> filter(fn: (r) => r._measurement == "temp-hum-measure")
    |> filter(fn: (r) => r._field == "value" and r.indicator == "humidity")`;
    const result = await this.influxQLExecution(query, this.commonCallback);
    return new HumidityRepsonse({
      humidity: result,
    });
  }

  public async getTemperature(time: number): Promise<TemperatureResponse> {
    const query = `from(bucket: "DHT11-Measurement")
    |> range(start: -${time}m)
    |> filter(fn: (r) => r._measurement == "temp-hum-measure")
    |> filter(fn: (r) => r._field == "value" and r.indicator == "temperature")`;
    const result = await this.influxQLExecution(query, this.commonCallback);
    return new TemperatureResponse({
      temperature: result,
    });
  }
}
