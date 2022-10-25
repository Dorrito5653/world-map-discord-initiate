from __future__ import annotations
from dataclasses import dataclass
from typing import TYPE_CHECKING
from datetime import datetime, timedelta

if TYPE_CHECKING:
    from .country import Country


@dataclass
class CountryAlliance:
    countries: list[Country]
    is_trade_deal: bool = False
    is_military: bool = False
    expires_at: datetime | None = None

    # Doc strings
    is_trade_deal.__doc__ = \
        """Whether this alliance is a trade alliance/deal"""
    is_military.__doc__ = \
        """Whether this alliance is a military alliance"""
    expires_at.__doc__ = \
        """When this alliance will expire, if it does."""
    
    @property
    def is_temporary(self):
        """Whether this alliance is temporary"""
        return self.expires_at is not None
    
    @property
    def expires_in(self) -> timedelta | None:
        """
        The amount of time in which this alliance will expire
        Returns `None` if the alliance is not temporary
        """
        if self.is_temporary:
            return datetime.now() - self.expires_at
