from __future__ import annotations
from typing import TYPE_CHECKING
from dataclasses import dataclass

if TYPE_CHECKING:
    from .city import City
    from .country import Country
    from .country_province import CountryProvince
    from .terrain import Terrain


@dataclass
class Land:
    """Represents one km² of land"""
    value: int # the money the land is worth in dollars
    population: int
    terrain: Terrain
    city: City | None = None
    country: Country | None = None
    province: CountryProvince | None = None
