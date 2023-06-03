type preprocessCallBack = (x: any[]) => any[] | Promise<any[]>;

interface influxPointFields extends Record<string, any> {
  result: string;
  table: number;
  _start: Date;
  _stop: Date;
  _time: Date;
  _value: number | string;
  _field: string;
  _measurement: string;
  indicator: string;
  location: string;
}

interface influxSeriesResult {
  time: Date;
  value: number;
}
