"""
Will be the socket server for multiplayer games
"""
from __future__ import annotations
from datetime import datetime
import json
from typing import TYPE_CHECKING
import asyncio
import websockets
import logging
import os
import secrets
from wmb_game import WMBGame

if TYPE_CHECKING:
    from websockets.legacy.server import WebSocketServerProtocol

JOIN: dict[str, WMBGame] = {}
SPECTATE: dict[str, WMBGame] = {}

if not os.path.exists('./logs'):
    os.mkdir('logs')

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] (%(funcName)s:%(lineno)d): %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(f"./logs/{datetime.now().strftime('%H-%M-%S')}.log", encoding='utf-8')
    ]
)

server = 'localhost'
port = 5555


async def create_game(ws: WebSocketServerProtocol, country: str):
    """
    Creates a new game.

    Parameters
    ----------
    ``country``:
        The country the player is going to be.
    ``ws``:
        the websocket of the first player.
    """
    join_id = secrets.token_urlsafe()
    spectate_id = secrets.token_urlsafe()

    game = WMBGame(spectate_id, join_id)
    game.add_player(ws, country)

    JOIN[join_id] = game
    SPECTATE[spectate_id] = game

    try:
        event = {
            'type': 'start',
            'join': join_id,
            'spectate': spectate_id
        }

        await ws.send(json.dumps(event))
        logging.info(f'First player started game: {id(game)}')
        await asyncio.Future()
    finally:
        del JOIN[join_id]


async def error(ws: WebSocketServerProtocol, message: str):
    """
    Sends an error message to the client

    Parameters
    ----------
    ``ws``:
        The websocket connection to the client
    ``message``:
        The error message
    """
    await ws.send(json.dumps({"type": "error", "message": message}))
    await ws.close(reason='Unkown error occurred')


async def join_game(ws: WebSocketServerProtocol, join_code: str, country: str):
    """
    Makes a client join an existing game.
    
    Parameters
    ----------
    ``country``:
        The country the player is going to be.
    ``ws``:
        the websocket of the player.
    """
    try:
        game = JOIN[join_code]
    except KeyError:
        await error(ws, 'Invalid join code')
        return

    try:
        game.add_player(ws, country)
    except LookupError: # Country does not exist
        await error(ws, 'That country does not exist')
    except ValueError: # Country already taken
        await error(ws, 'Country was already taken')
    else:
        logging.info(f'Another player has joined game: {join_code}')


async def handler(websocket: WebSocketServerProtocol):
    async for message in websocket:
        data: dict[str, str] = json.loads(message)
        if data['type'] == 'create':
            await create_game(websocket, data['country'])
        elif data['type'] == 'join':
            await join_game(websocket, data['joinCode'], data['country'])


async def main():
    async with websockets.serve(handler, server, port):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(main())
