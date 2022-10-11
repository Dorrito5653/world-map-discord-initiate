from __future__ import annotations
from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .city import City
    from .country import Country


@dataclass(kw_only=True, order=False)
class CountryProvince:
    """Represents a province of a country"""
    land_area: int # in kilometers squared
    population: int
    jobs: int
    economy: int
    cities: list[City]
    capitol: City
    county: Country
