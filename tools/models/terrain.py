from dataclasses import dataclass


@dataclass(kw_only=True, order=False)
class Terrain:
    """Represents a terrain which a pieace of land can have"""
    snowy: bool = False
    flat: bool = False
    mountainous: bool = False
    water: bool = False
    desert: bool = False
    arid: bool = False
    jungle: bool = False
    forest: bool = False
    city: bool = False
    grass_land: bool = False
