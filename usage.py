import dash_smoothie
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import dash_core_components as dcc
from random import random
app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    dash_smoothie.Smoothie(
        id='input',
        value='my-value',
        label='my-label',
        millisPerPixel=10,
        axisProps=[{'name': 'x', 'r': 255}, {'name': 'y', 'g': 255}, {'name': 'z', 'b': 255}],
    ),
    html.Div(id='speedValue'),
    dcc.Input(id='speedInput', type='range', min=0, max=100, value=10),
    dcc.Interval(id='interval', interval = 1000, n_intervals=0),

])

@app.callback([Output('speedValue', 'children'), Output('input', 'millisPerPixel')], [Input('speedInput', 'value')])
def display_output(value):
    return ['graph speed: {} ms/pixel'.format(value), value]

@app.callback(Output('input', 'extendData'), [Input('interval', 'n_intervals')])
def update_smoothie(n):
    return [random()*100, random()*100, random()*100]

if __name__ == '__main__':
    app.run_server(debug=True)
