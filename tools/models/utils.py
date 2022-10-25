"""Utility functions"""
from typing import Literal, overload


@overload
def string_to_int(string: Literal['inf']) -> float:
    ...


@overload
def string_to_int(string: str) -> int:
    ...


def string_to_int(string: str):
    """
    Takes a string like "1.2K" and turns it into `1200`
    """
    if string == 'inf':
        return float(string)
    else:
        multipliers = {
            'K': 1_000,
            'M': 1_000_000,
            'B': 1_000_000_000,
            'T': 1_000_000_000_000
        }
        if string[-1].isdigit():  # check if no suffix
            return int(string)
        mult = multipliers[string[-1]]  # look up suffix to get multiplier
        # convert number to float, multiply by multiplier, then make int
        return int(float(string[:-1]) * mult)
