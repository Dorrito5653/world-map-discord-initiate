from __future__ import annotations
from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .city import City
    from .country import Country


@dataclass(kw_only=True, order=False)
class CountryProvince:
    """Represents a province of a country"""
    name: str
    land_area: int # in kilometers squared
    cities: list[City]
    capitol: City
    county: Country

    id: int # store an ID for each province so that there can be multiple
    # provinces with the same name across different countries

    @property
    def population(self):
        return sum(c.population for c in self.cities)
    
    @property
    def economy(self):
        return sum(c.economy for c in self.cities)
