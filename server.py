"""
Will be the socket server for multiplayer games
"""
import socket
import threading
import json
import traceback
import logging
import os

if not os.path.exists('./logs'):
    os.mkdir('logs')

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s | %(threadName)s]: %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(f"./logs/log.log", encoding='utf-8')
    ]
)

server = socket.gethostbyname(socket.gethostname())
port = 5555

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((server, port))
logging.info(f'Socket binded successfully as {server, port}')


s.listen()
logging.info('Waiting for connection...')


def new_client(conn: socket.socket):
    reply = json.dumps({"message":"test"})
    while True:
        try:
            data = json.loads(conn.recv(2048).decode())
            conn.send(reply.encode())

            # Don't log the sent and recieved to prevent log being large
            print(f'Recieved: {data}')
            print(f'Sending: {reply}')
        except Exception:
            logging.info("Unkown Error, disconecting imeidietly")
            logging.info(traceback.format_exc())
            break
    
    conn.close()


while True:
    conn, addr = s.accept()

    threading.Thread(target=new_client, args=[conn]).start()
