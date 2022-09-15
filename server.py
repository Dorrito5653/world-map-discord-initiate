"""
Will be the socket server for multiplayer games
"""
import socket
import threading
import sys
import json
import traceback

server = socket.gethostbyname(socket.gethostname())
port = 5555

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((server, port))
print(f'Socket binded successfully as {server, port}')


s.listen()
print('Waiting for connection...')


def new_client(conn: socket.socket):
    while True:
        try:
            data = json.loads(conn.recv(2048).decode())
            conn.send(json.dumps({"message":"test"}).encode())
        except Exception:
            print("Unkown Error, disconecting imeidietly")
            print(traceback.format_exc())


while True:
    conn, addr = s.accept()

    threading.Thread(target=new_client, args=[conn]).start()
