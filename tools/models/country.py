from __future__ import annotations
from typing import TYPE_CHECKING
from typing import TypeAlias, Literal
from utils import string_to_int

if TYPE_CHECKING:
    from .terrain import Terrain
    from .country_alliance import CountryAlliance
    from .city import City
    from .country_province import CountryProvince

countries_obj: TypeAlias = Literal[
    'Nukeistan',
    'Abdullistan',
    'Dangerstan',
    'Deez',
    'Nuts',
    'Laggystan',
    'United Congo',
    'Eggystan',
    'Gamerstan',
    'Pingistan',
    'Nukeistan',
    'Prussia',
    'Greenistan'
]

_military_info: TypeAlias = Literal[
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
    'machine guns'
]

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
        name: countries_obj,
        leader: str,
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
        self.leader: str = leader
        self.cities = cities
        self.land_area = land_area
        self.provinces = provinces
        self.capitol = capitol
        self.google_doc = google_doc
        self.military_info: dict[_military_info, int] = {
            'tanks': string_to_int(tanks),
            'artilary': string_to_int(artilary),
            'planes': string_to_int(planes),
            'military population': string_to_int(military_pop),
            'military specialty': military_specialty,
            'nukes': string_to_int(nukes),
            'bombs': string_to_int(bombs),
            'ships': string_to_int(ships),
            'cannons': string_to_int(cannons),
            'armoured vehicles': string_to_int(vehicles),
            'aircraft carriers': string_to_int(aircraft_carriers),
            'submarines': string_to_int(submarines),
            'destroyers': string_to_int(destroyers),
            'missiles': string_to_int(missiles),
            'machine guns': string_to_int(machine_guns)
        }
        self.scientists = string_to_int(scientists)
        self.miners = string_to_int(miners)
        self.landlocked = landlocked
        self.is_island = is_island
        self.is_un_partner = is_un_partner
        if alliances is None:
            alliances = []
        self.alliances = alliances

        self.power_info: dict[_power_info, int] = {
            'population':             self.population // 500000,
            'military population':    self.military_info['military population'] // 1000,
            'ship':                   self.military_info['ships'] * 2 if not landlocked else 0, # Ships are useless for landlocked nations
            'plane':                  self.military_info['planes'] // 5,
            'nukes':                  self.military_info['nukes'],
            'tank':                   self.military_info['tanks'] // 5,
            'cannon':                 self.military_info['cannons'] // 20,
            'missile':                self.military_info['missiles'] // 2,
            'submarines':             self.military_info['submarines'] * 12 if not landlocked else 0, # Submarines are useless for landlocked nations
            'aircraft carriers':      self.military_info['aircraft carriers'] * 100 if not landlocked else 0, # Aircraft Carriers are useless for landlocked nations
            'destroyers':             self.military_info['destroyers'] * 15 if not landlocked else 0, # Destroyers are useless for landlocked nations
            'bombs':                  self.military_info['bombs'] // 2
        }

        if landlocked:
            self.power_info['landlocked'] = sum(self.power_info.values()) // -10

        self.power_info = {k: v for k, v in self.power_info.items() if v != 0}

        self.power = sum(self.power_info.values())
        self.flag = flag
    
    @property
    def population(self):
        """The population of this country"""
        return sum(c.population for c in self.cities)
    
    @property
    def total_power(self):
        """The total power of this country"""
        return sum(self.power_info.values())
