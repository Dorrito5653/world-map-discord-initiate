"""
Will be the socket server for multiplayer games
"""
from __future__ import annotations
from datetime import datetime
from typing import TYPE_CHECKING
import asyncio
import websockets
import logging
import os

if TYPE_CHECKING:
    from websockets.legacy.server import WebSocketServerProtocol

if not os.path.exists('./logs'):
    os.mkdir('logs')

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] (%(funcName)s:%(lineno)d): %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(f"./logs/{datetime.now().strftime('%H%M%S')}", encoding='utf-8')
    ]
)

server = 'localhost'
port = 5555


async def handler(websocket: WebSocketServerProtocol):
    name = await websocket.recv()
    logging.info(f"<<< {name}")

    greeting = f"Hello {name}!"

    await websocket.send(greeting)
    logging.info(f">>> {greeting}")


async def main():
    async with websockets.serve(handler, server, port):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(main())
