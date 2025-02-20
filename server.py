from flask import Flask, request
from flask_socketio import SocketIO
import pigpio

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins = "*")

@app.route('/')
def home():
    return "Flask App on Raspberry Pi"

@socketio.on('send_data')
def handle_data(data):
    print(f"Recieved {data}")
    socketio.emit('response', {'message': 'Data recieved'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port = 5000)
    
