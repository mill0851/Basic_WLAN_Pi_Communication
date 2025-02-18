import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import requests

# Replace with the actual Raspberry Pi IP address
raspberry_pi_url = 'http://<raspberry_pi_ip>:5000'

# Initialize the Dash app
app = dash.Dash(__name__)

# Define the layout of the web app
app.layout = html.Div([
    html.H1("Raspberry Pi Control Panel"),

    # Slider for PWM value (0-255)
    html.Label("PWM Value (0-255):"),
    dcc.Slider(
        id='pwm_slider',
        min=0,
        max=255,
        step=1,
        value=0,
        marks={i: str(i) for i in range(0, 256, 50)},
        tooltip={"placement": "bottom", "always_visible": True},
        style={'margin': '20px'}
    ),

    # Checkbox for the switch state
    html.Label("Switch Control:"),
    dcc.Checklist(
        id='switch_state',
        options=[{'label': ' ON', 'value': 'on'}],
        value=[],  # Default: OFF
        style={'margin': '20px'}
    ),

    # Button to submit values
    html.Button('Submit', id='submit_button', n_clicks=0),

    # Output message
    html.Div(id='output_message', style={'margin': '20px', 'color': 'green'})
])

# Define callback to send data to Raspberry Pi
@app.callback(
    Output('output_message', 'children'),
    Input('submit_button', 'n_clicks'),
    Input('pwm_slider', 'value'),
    Input('switch_state', 'value')
)
def send_data(n_clicks, pwm_value, switch_state):
    if n_clicks > 0:
        try:
            response = requests.post(f'{raspberry_pi_url}/control', data={
                'pwm_value': pwm_value,
                'switch_state': 'on' if 'on' in switch_state else 'off'
            })
            return "Data sent successfully!" if response.status_code == 200 else "Error sending data."
        except requests.exceptions.RequestException:
            return "Failed to connect to Raspberry Pi."
    
    return "Press Submit to send data."

# Run the Dash server
if __name__ == '__main__':
    app.run_server(debug=True, host='0.0.0.0', port=8050)