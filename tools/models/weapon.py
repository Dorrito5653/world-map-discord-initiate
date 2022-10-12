from __future__ import annotations
from typing import TYPE_CHECKING
from dataclasses import dataclass
from enum import IntEnum

if TYPE_CHECKING:
    from .country import Country


class WeaponType(IntEnum):
    tank = 1
    artillary = 2
    infantry = 3
    submarine = 4
    aircraft_carrier = 5
    cannon = 6
    nuke = 7
    bomb = 8
    missile = 9
    destroyer = 10
    plane = 11


@dataclass
class Weapon:
    """Represents a millitary group of forces.
    Each force consists of forces of one type."""
    name: str
    type: WeaponType
    time_created: int
    height: int # in meters
    current_location: tuple[float, float] # coordinates
    country_created: Country
    country_owned: Country
