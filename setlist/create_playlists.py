#!/usr/bin/env python3
"""
Create Hurricane 2026 Spotify playlists from the import_*.txt files.

This uses the Authorization Code flow: when you run it, it opens your browser,
you log into Spotify and click "Agree" once, and it then creates one playlist
per import file and adds the matched tracks to your account.

--- ONE-TIME SETUP (≈2 min) ---
1. Go to https://developer.spotify.com/dashboard -> "Create app".
     - App name: anything (e.g. "hurricane-playlists")
     - Redirect URI: http://127.0.0.1:8888/callback   (add exactly this)
     - APIs: tick "Web API"
2. Copy the Client ID and Client secret from the app's Settings.
3. Install the dependency:   pip install spotipy
4. Export your credentials (or paste them when prompted):
     export SPOTIPY_CLIENT_ID=xxxxxxxx
     export SPOTIPY_CLIENT_SECRET=xxxxxxxx
     export SPOTIPY_REDIRECT_URI=http://127.0.0.1:8888/callback

--- RUN ---
   python3 create_playlists.py            # creates all four playlists
   python3 create_playlists.py 01 03      # only the rock + deutsch lists
"""

import glob
import os
import sys

try:
    import spotipy
    from spotipy.oauth2 import SpotifyOAuth
except ImportError:
    sys.exit("Missing dependency. Run:  pip install spotipy")

HERE = os.path.dirname(os.path.abspath(__file__))

PLAYLIST_NAMES = {
    "01": "Hurricane 2026 — Rock · Punk · Alt-Metal",
    "02": "Hurricane 2026 — Indie · Alt-Pop",
    "03": "Hurricane 2026 — Deutsch: Rap · Rock · Pop",
    "04": "Hurricane 2026 — Electronic · Dance",
}

# Creating/modifying private playlists needs these scopes.
SCOPE = "playlist-modify-private playlist-modify-public"


def import_files(selectors):
    files = sorted(glob.glob(os.path.join(HERE, "import_*.txt")))
    if selectors:
        files = [f for f in files if any(s in os.path.basename(f) for s in selectors)]
    return files


def key_for(path):
    name = os.path.basename(path)  # import_01_rock_punk_alt.txt
    return name.split("_")[1]      # -> "01"


def find_track(sp, line):
    """Best-effort match for an 'Artist - Title' line. Returns a track URI or None."""
    artist, _, title = line.partition(" - ")
    if not title:
        artist, title = "", line
    # Field-scoped query first, then a loose fallback.
    for query in (f'track:{title.strip()} artist:{artist.strip()}', line):
        res = sp.search(q=query, type="track", limit=1)
        items = res.get("tracks", {}).get("items", [])
        if items:
            return items[0]["uri"], items[0]["name"], items[0]["artists"][0]["name"]
    return None


def main():
    selectors = [a.zfill(2) for a in sys.argv[1:]]
    files = import_files(selectors)
    if not files:
        sys.exit("No matching import_*.txt files found.")

    auth = SpotifyOAuth(scope=SCOPE, open_browser=True, cache_path=os.path.join(HERE, ".spotify_cache"))
    sp = spotipy.Spotify(auth_manager=auth)
    me = sp.current_user()
    print(f"Logged in as: {me['display_name']} ({me['id']})\n")

    for path in files:
        name = PLAYLIST_NAMES.get(key_for(path), os.path.basename(path))
        with open(path, encoding="utf-8") as fh:
            lines = [ln.strip() for ln in fh if ln.strip()]

        print(f"== {name}  ({len(lines)} lines) ==")
        uris, misses = [], []
        for line in lines:
            hit = find_track(sp, line)
            if hit:
                uris.append(hit[0])
            else:
                misses.append(line)

        playlist = sp.user_playlist_create(
            me["id"], name, public=False,
            description="Hurricane Festival 2026 prep — generated from setlist/ import lists.",
        )
        # Spotify caps adds at 100 URIs per request.
        for i in range(0, len(uris), 100):
            sp.playlist_add_items(playlist["id"], uris[i:i + 100])

        print(f"   added {len(uris)} tracks -> {playlist['external_urls']['spotify']}")
        if misses:
            print(f"   {len(misses)} not matched (add by hand): " + "; ".join(misses))
        print()


if __name__ == "__main__":
    main()
