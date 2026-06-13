# 🌪️ Hurricane Festival 2026 — Prep Playlists

**Festival:** Hurricane Festival 2026 · Eichenring, Scheeßel (Germany) · **19–21 June 2026** (+ Thu 18 June warm-up). 30th anniversary edition, 81 artists.

These playlists exist so we can walk into the festival actually knowing the songs. For every act on the bill I picked their **recent live setlist staples + biggest/newest songs**, then split them into four genre playlists. The bigger the artist, the more songs they get (see tiers below).

---

## 📂 The four playlists

| File | Playlist | Acts |
|------|----------|------|
| [`01_rock_punk_alt.md`](01_rock_punk_alt.md) | **Rock · Punk · Alt-Metal** | Twenty One Pilots, The Offspring, Papa Roach, Billy Talent, A Day To Remember, Yungblud, Nothing But Thieves, Alexisonfire, All Time Low, Skindred, Pennywise … |
| [`02_indie_altpop.md`](02_indie_altpop.md) | **Indie · Alt-Pop · Singer-Songwriter** | Florence + The Machine, Halsey, Wolf Alice, Empire Of The Sun, The Beaches, Royel Otis, Orville Peck, Natasha Bedingfield … |
| [`03_deutsch_rap_rock_pop.md`](03_deutsch_rap_rock_pop.md) | **Deutsch — Rap · Rock · Pop** | Kraftklub, Provinz, Clueso, Roy Bianco & Die Abbrunzati Boys, Sondaschule, OG Keemo, SSIO, Bosse, Juli … |
| [`04_electronic_dance.md`](04_electronic_dance.md) | **Electronic · Dance** | Boys Noize, Modeselektor, Modestep, Drunken Masters, Tinlicker, David Puentez |

Each `.md` file lists every act with its day, fame tier, and song picks (with a Spotify search link). Each one also has a matching plain-text import file:

- `import_01_rock_punk_alt.txt`
- `import_02_indie_altpop.txt`
- `import_03_deutsch_rap_rock_pop.txt`
- `import_04_electronic_dance.txt`

---

## ▶️ How to turn these into real Spotify playlists

This environment has **no Spotify API connection**, so I can't push the playlist straight into your account. Two easy ways to do it yourself (each takes ~1 minute per playlist):

**Option A — Spotlistr (fastest):**
1. Go to <https://www.spotlistr.com/search/textbox>
2. Open one of the `import_*.txt` files, copy everything, paste it into the textbox.
3. It matches each `Artist - Title` line to a Spotify track → review → **"Export to Spotify"** → name it e.g. *Hurricane 2026 — Rock*.

**Option B — TuneMyMusic:**
1. <https://www.tunemymusic.com> → *Let's Start* → source **"Paste text / file"**.
2. Paste an `import_*.txt`, pick Spotify as destination, log in, convert.

**Option C — CLI script (`create_playlists.py`):** a tiny Python/`spotipy` script that opens your browser for a one-time Spotify login, then builds all four playlists automatically from the `import_*.txt` files (fuzzy-matches each line, reports anything it couldn't find). Needs a one-time free Spotify "app" registration for a client ID — full setup steps are in the script's header. Run `python3 create_playlists.py` (or pass `01 03` to do just some).

**Option D — by hand:** every artist in the `.md` files has a 🔍 Spotify search link; click it, drag the songs into a new playlist.

---

## ⭐ Fame tiers → how many songs each act gets

| Tier | Songs | Who |
|------|-------|-----|
| **Headliner** | 7 | Twenty One Pilots, The Offspring, Florence + The Machine, Halsey, Kraftklub |
| **Major** | 5–6 | Papa Roach, Billy Talent, Yungblud, A Day To Remember, Nothing But Thieves, Alexisonfire, All Time Low, Wolf Alice, Empire Of The Sun, Natasha Bedingfield, Provinz, Clueso |
| **Well-known** | 3–4 | Skindred, Pennywise, Donots, Zebrahead, Royel Otis, Orville Peck, OG Keemo, SSIO, Bosse, Boys Noize, Modeselektor … |
| **Newcomer / buzz** | 1–3 (or 🔍 link only) | The long tail of newer/local acts. Where I couldn't confidently name current tracks I left a search link with a note instead of inventing titles. |

---

## ⚠️ Honesty notes
- Song picks for the **headliners and major acts are grounded in their actual 2025/2026 tour setlists** (verified via web search of setlist.fm tour summaries), then topped up with their best-known tracks.
- For very new or local acts I only listed songs I'm confident exist; otherwise I left a Spotify search link and a "grab their top 3" note rather than guess a title.
- Non-musical acts on the bill (e.g. **Siegfried & Joy**, a magic/comedy duo; the **#HurricaneSwimTeam** community slot) are intentionally skipped.
- Setlists rotate show to show — treat these as "know-before-you-go", not a guaranteed running order.

*Built 2026-06-06. Lineup source: official Hurricane Festival line-up + Music Festival Wizard.*
