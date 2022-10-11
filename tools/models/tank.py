from dataclasses import dataclass


@dataclass
class TankGun:
    length: int # in meters
    width: int # in meters


@dataclass
class Tank:
    name: str
    year_created: int
    height: int # in meters
    current_location: tuple[float, float] # coordinates
