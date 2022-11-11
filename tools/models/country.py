from __future__ import annotations
from typing import TYPE_CHECKING
from typing import TypeAlias, Literal
from .utils import string_to_int

if TYPE_CHECKING:
    from .terrain import Terrain
    from .country_alliance import CountryAlliance
    from .city import City
    from .country_province import CountryProvince
    from websockets.legacy.server import WebSocketServerProtocol

# same as _military_info but has "population" in it
_power_info: TypeAlias = Literal[
    'tanks',
    'artilary',
    'planes',
    'military population',
    'military specialty',
    'nukes',
    'bombs',
    'ships',
    'robots',
    'cannons',
    'armoured vehicles',
    'aircraft carriers',
    'submarines',
    'destroyers',
    'missiles',
    'machine guns',
    'population'
]


class Country:
    def __init__(
        self,
        *,
        name: str,
        leader: WebSocketServerProtocol | None = None, # Leader is None if it is an AI
        cities: list[City],
        land_area: int, # in kilometers squared
        provinces: list[CountryProvince],
        capitol: City,
        main_terrain: Terrain,
        military_pop: str = '0',
        tanks: str = '0',
        artilary: str = '0',
        planes: str = '0',
        military_specialty: str = 'None',
        google_doc: str = 'None',
        nukes: str = '0',
        bombs: str = '0',
        landlocked: bool = False,
        is_island: bool = True,
        ships: str = '0',
        flag: str | None = None, # a url pointing to an image of the flag
        cannons: str = '0',
        vehicles: str = '0',
        aircraft_carriers: str = '0',
        submarines: str = '0',
        destroyers: str = '0',
        missiles: str = '0',
        machine_guns: str = '0',
        scientists: str = '100',
        miners: str = '5K',
        is_un_partner: bool = False,
        alliances: list[CountryAlliance] = None
    ) -> None:
        self.main_terrain = main_terrain
        self.name = name
        self.leader = leader
        self.cities = cities
        self.land_area = land_area
        self.provinces = provinces
        self.capitol = capitol
        self.google_doc = google_doc

        # Military
        self.tanks = string_to_int(tanks)
        self.artilary = string_to_int(artilary)
        self.planes = string_to_int(planes)
        self.military_population = string_to_int(military_pop)
        self.military_specialty = military_specialty
        self.nukes = string_to_int(nukes)
        self.bombs = string_to_int(bombs)
        self.ships = string_to_int(ships)
        self.cannons = string_to_int(cannons)
        self.armoured_vehicles = string_to_int(vehicles)
        self.aircraft_carriers = string_to_int(aircraft_carriers)
        self.submarines = string_to_int(submarines)
        self.destroyers = string_to_int(destroyers)
        self.missiles = string_to_int(missiles)
        self.machine_guns = string_to_int(machine_guns)


        self.scientists = string_to_int(scientists)
        self.miners = string_to_int(miners)
        self.landlocked = landlocked
        self.is_island = is_island
        self.is_un_partner = is_un_partner
        if alliances is None:
            alliances = []
        self.alliances = alliances
        self.flag = flag
    
    @property
    def population(self):
        """The population of this country"""
        return sum(c.population for c in self.cities)
    
    @property
    def total_power(self):
        """The total power of this country"""
        return sum(self.power_info.values())
    
    @property
    def power_info(self) -> dict[_power_info, int]:
        pwr = {
            'population':             self.population // 500000,
            'military population':    self.military_population // 1000,
            'ship':                   self.ships * 2 if not self.landlocked else 0, # Ships are useless for landlocked nations
            'plane':                  self.planes // 5,
            'nukes':                  self.nukes,
            'tank':                   self.tanks // 5,
            'cannon':                 self.cannons // 20,
            'missile':                self.missiles // 2,
            'submarines':             self.submarines * 12 if not self.landlocked else 0, # Submarines are useless for landlocked nations
            'aircraft carriers':      self.aircraft_carriers * 100 if not self.landlocked else 0, # Aircraft Carriers are useless for landlocked nations
            'destroyers':             self.destroyers * 15 if not self.landlocked else 0, # Destroyers are useless for landlocked nations
            'bombs':                  self.bombs // 2
        }
        if self.landlocked:
            pwr['landlocked'] = sum(pwr.values()) // -10

        return {k: v for k, v in pwr.items() if v != 0}
