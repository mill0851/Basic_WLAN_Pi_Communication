import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import requests

# Replace with the actual Raspberry Pi IP address
raspberry_pi_url = 'http://192.168.8.103:5000'

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
        max=100,
        step=1,
        value=0,
        marks={i: str(i) for i in range(0, 101, 50)},
        tooltip={"placement": "bottom", "always_visible": True}
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
)

def send_data(n_clicks, pwm_value):
    if n_clicks > 0:
        try:
            response = requests.post(f'{raspberry_pi_url}/control', data={
                'pwm_value': pwm_value,
            })
            return "Data sent successfully!" if response.status_code == 200 else "Error sending data."
        except requests.exceptions.RequestException:
            return "Failed to connect to Raspberry Pi."
    
    return "Press Submit to send data."

# Run the Dash server
if __name__ == '__main__':
    app.run_server(debug=True, host='0.0.0.0', port=8080)