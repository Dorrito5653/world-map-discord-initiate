from __future__ import annotations
from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .terrain import Terrain
    from .country_province import CountryProvince
    from .country import Country


@dataclass(kw_only=True, order=False)
class City:
    """Represents a city"""
    name: str
    population: int
    terrain: Terrain
    economy: int # amount of money this city gives to the government
    province: CountryProvince
    country: Country
    
    @property
    def is_capitol_of_province(self):
        """Whether this city is the capitol of a province"""
        return self is self.province.capitol
    
    @property
    def is_capitol_of_country(self):
        """Whether this city is the capitol of a country"""
        return self is self.country.capitol
