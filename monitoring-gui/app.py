import tkinter as tk
from tkinter import font
import requests
from datetime import datetime


class MontioringTool(tk.Tk):
    default_label_pady = 15
    default_unknown_value = "ㅡㅡ"
    default_title = "DHT-11 Humidity and Temperature"

    def __init__(self) -> None:
        super().__init__()
        self.title(MontioringTool.default_title)
        self.resizable(False, False)

        # Font
        self.titleFont = font.Font(size=20, weight='bold')
        self.normalFont = font.Font(size=18)

        inner = tk.Frame(self, borderwidth=10)
        '''
        pack() document : https://tcl.tk/man/tcl8.6/TkCmd/pack.htm#M11

        fill - both : Stretch the content both horizontally and vertically
        expand = True : Specifies wheteher the content should be expanded to consume extra space in their container
        '''
        inner.pack(fill='both', expand=True)
        self.label = tk.Label(
            inner, text=MontioringTool.default_title, pady=20, font=self.titleFont)
        self.label.grid(row=0, column=0, columnspan=2)

        self.humidity_key = tk.Label(
            inner,
            text="Humidity",
            font=self.normalFont,
            pady=MontioringTool.default_label_pady)
        self.humidity_value = tk.Label(
            inner,
            text=MontioringTool.default_unknown_value,
            font=self.normalFont,
            pady=MontioringTool.default_label_pady)
        self.humidity_key.grid(row=1, column=0)
        self.humidity_value.grid(row=1, column=1)

        self.temperature_key = tk.Label(
            inner,
            text="Temperature",
            font=self.normalFont,
            pady=MontioringTool.default_label_pady)
        self.temperature_value = tk.Label(
            inner,
            text=MontioringTool.default_unknown_value,
            font=self.normalFont,
            pady=MontioringTool.default_label_pady)
        self.temperature_key.grid(row=2, column=0)
        self.temperature_value.grid(row=2, column=1)

        self.estimated_time_key = tk.Label(
            inner,
            text="Estimated Time",
            font=self.normalFont,
            pady=MontioringTool.default_label_pady)
        self.estimated_time_value = tk.Label(
            inner,
            text=MontioringTool.default_unknown_value,
            font=self.normalFont,
            pady=MontioringTool.default_label_pady)
        self.estimated_time_key.grid(row=3, column=0)
        self.estimated_time_value.grid(row=3, column=1)
        self.updater()

    def getValues(self):
        result_dict = dict()
        try:
            result = requests.get("http://127.0.0.1:3000/dht11?time=1")
            result_dict = dict(result.json())
        except (requests.exceptions.ConnectionError, requests.exceptions.ConnectTimeout) as e:
            print(f"Unhealthy API server connection : {e.__class__.__name__}")
        # Values for temperature
        humidity_value = MontioringTool.default_unknown_value
        # Values for humidity
        temperature_value = MontioringTool.default_unknown_value
        estimated_date = MontioringTool.default_unknown_value
        try:
            time_format = "%Y-%m-%dT%H:%M:%S"
            estimated_date = datetime.strptime(
                result_dict['humidity'][-1]['time'].split('.')[0],
                time_format
            ).strftime("%H : %M :%S")
            humidity_value = f"{result_dict['humidity'][-1]['value']} %"
            temperature_value = f"{result_dict['temperature'][-1]['value']} ℃"
        except BaseException as e:
            print(e)
        return humidity_value, temperature_value, estimated_date

    def updater(self):
        humidity_value, temperature_value, estimated_date = self.getValues()

        self.humidity_value.config(text=humidity_value)
        self.temperature_value.config(text=temperature_value)
        self.estimated_time_value.config(text=estimated_date)
        self.after(1000, self.updater)


if __name__ == "__main__":
    app = MontioringTool()
    app.mainloop()
