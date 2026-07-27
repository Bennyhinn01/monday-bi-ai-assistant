import time
from monday_client import get_monday_data

CACHE_DURATION = 300  # 5 minutes

_cache = None
_last_updated = 0


def get_cached_data():
    global _cache, _last_updated

    current_time = time.time()

    if _cache is None or (current_time - _last_updated) > CACHE_DURATION:
        print("Refreshing Monday cache...")
        _cache = get_monday_data()
        _last_updated = current_time

    return _cache