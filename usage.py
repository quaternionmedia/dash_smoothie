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
        label='my-label'
    ),
    html.Div(id='output'),
    dcc.Interval(id='interval', interval = 1000, n_intervals=0),

])

@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)

@app.callback(Output('input', 'extendData'), [Input('interval', 'n_intervals')])
def update_smoothie(n):
    return random()

if __name__ == '__main__':
    app.run_server(debug=True)
