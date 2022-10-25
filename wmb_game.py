from __future__ import annotations
from tools.models.city import City
from tools.models.country import Country
from typing import TYPE_CHECKING

from tools.models.country_province import CountryProvince
from tools.models.terrain import Terrain

if TYPE_CHECKING:
    from websockets.legacy.server import WebSocketServerProtocol

__all__ = ['WMBGame']


class WMBGame:
    def __init__(self, spectate_code: str, join_code: str) -> None:
        # Testing data, not going to be the actual stats
        self.countries: list[Country] = [
            Country(
                name='USSR',
                cities=[],
                land_area=10000,
                provinces=[],
                capitol=None,
                main_terrain=Terrain(desert=True, mountainous=True)
            ),
            Country(
                name='USSR2',
                cities=[],
                land_area=10000,
                provinces=[],
                capitol=None,
                main_terrain=Terrain(desert=True, mountainous=True)
            )
        ]
        self.connections: list[WebSocketServerProtocol] = []
        self.join_code = join_code
        self.spectate_code = spectate_code
    
    def add_player(self, conn: WebSocketServerProtocol, country: str):
        """
        Add a player to the game.

        Parameters
        ----------
        ``conn``:
            The connection to this player
        ``country``:
            The name of the country this player will be
        """
        c = self.look_for_country_name(country)

        if c.leader:
            raise ValueError('Country already taken')
        c.leader = conn
        self.connections.append(conn)
    
    def look_for_country_name(self, name: str):
        """
        Looks for a country and returns it if found or raises a ``LookupError``

        Parameters
        ----------
        ``name``:
            The name of the country to look for
        """
        for c in self.countries:
            if c.name == name:
                return c
        raise LookupError(f'Could not find country name: {name!r}')
