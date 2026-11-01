#!/usr/bin/env bash
# Records the homepage demo flows as asciinema casts from the real crona TUI.
#
#   scripts/record-demos/record.sh            # every flow
#   scripts/record-demos/record.sh bulk-add   # one flow
#   SIZES="60x44:.narrow" scripts/record-demos/record.sh   # one size
#
# Each flow is a script in flows/ that drives the TUI with the helpers below. Before every
# flow the dev database is cleared and re-seeded so recordings are repeatable.
# Needs: tmux, asciinema 3, and a crona checkout with dev binaries built (make install-tui install-cli)
# and the dev daemon running.

set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="$(cd "$HERE/../.." && pwd)"
CRONA_REPO="${CRONA_REPO:-$HOME/Projects/crona/crona}"
OUT="${OUT:-$SITE/public/demos}"
# Each flow is recorded at every size: "cols x rows : file suffix". 160 columns is the narrowest
# width where Today shows the task detail pane; 60 columns stays readable on a phone.
SIZES="${SIZES:-160x40: 60x44:.narrow}"
SESSION="crona-demo-rec"
TUI="PATH='$CRONA_REPO/bin:$PATH' CRONA_ENV=Dev"

mkdir -p "$OUT"

# --- helpers used by flows -------------------------------------------------------------

# key <tmux key>... : press keys, with a short beat after each.
key() {
  for k in "$@"; do
    tmux send-keys -t "$SESSION" "$k"
    sleep "${KEY_BEAT:-0.45}"
  done
}

# type <text> : type like a person, one character at a time.
type_text() {
  local text="$1" i
  for ((i = 0; i < ${#text}; i++)); do
    tmux send-keys -t "$SESSION" -l -- "${text:i:1}"
    sleep "${TYPE_BEAT:-0.045}"
  done
  sleep 0.3
}

# pause <seconds> : hold on the current screen so viewers can read it.
pause() { sleep "$1"; }

# wait_for <text> : block until the screen shows text (up to 10s).
wait_for() {
  local i
  for ((i = 0; i < 100; i++)); do
    tmux capture-pane -p -t "$SESSION" | grep -qF -- "$1" && return 0
    sleep 0.1
  done
  echo "timed out waiting for: $1" >&2
  tmux capture-pane -p -t "$SESSION" >&2
  return 1
}

# select <text> : press Down until the row starting with text is selected (up to 20 rows).
select_row() {
  local i
  for ((i = 0; i < 20; i++)); do
    tmux capture-pane -p -t "$SESSION" | grep -qF -- "▶ $1" && return 0
    key Down
  done
  echo "could not select: $1" >&2
  return 1
}

# --- recording ---------------------------------------------------------------------------

reseed() {
  CRONA_ENV=Dev "$CRONA_REPO/bin/crona-dev" dev clear >/dev/null
  # Seeding outlasts the CLI's 10s socket timeout but finishes in the daemon, so poll for it.
  CRONA_ENV=Dev "$CRONA_REPO/bin/crona-dev" dev seed >/dev/null 2>&1 || true
  local i
  for ((i = 0; i < 60; i++)); do
    CRONA_ENV=Dev "$CRONA_REPO/bin/crona-dev" summary 2>/dev/null | grep -q "Draft carry-over" && return 0
    sleep 1
  done
  echo "dev seed did not finish" >&2
  return 1
}

# A cleared database brings back first-run setup, default rest days (sat/sun) and a single
# repo context. Walk through those off camera so every recording opens on a full Today view.
prepare() {
  tmux kill-session -t "$SESSION" 2>/dev/null || true
  # Always full width: first-run setup does not reflow for narrow terminals.
  tmux new-session -d -s "$SESSION" -x 160 -y 40 "$TUI crona-tui-dev"
  KEY_BEAT=0.25
  wait_for "Let's get things set up."
  key Right Right Right
  wait_for "Start Crona"
  key Enter
  wait_for "[5] System"
  key 5
  wait_for "Rest & Streak Protection"
  for _ in $(seq 19); do tmux send-keys -t "$SESSION" Down; done
  sleep 0.3
  tmux capture-pane -p -t "$SESSION" | grep -q "▶ Rest & Streak Protection" || {
    echo "could not select rest days setting" >&2
    return 1
  }
  key Enter Tab
  wait_for "Select default rest weekdays"
  key c Tab Tab
  wait_for "Weekdays  None"
  key C-s 1 c
  wait_for "Stream"
  key c
  wait_for "All ·"
  tmux send-keys -t "$SESSION" C-c
  sleep 1
  tmux kill-session -t "$SESSION" 2>/dev/null || true
  unset KEY_BEAT
}

record_flow() {
  local name="$1" cast="$OUT/$1$2.cast"
  echo "recording $name at ${COLS}x${ROWS}"
  reseed
  prepare
  tmux kill-session -t "$SESSION" 2>/dev/null || true
  tmux new-session -d -s "$SESSION" -x "$COLS" -y "$ROWS" \
    "$TUI asciinema rec --quiet --overwrite \
      --output-format asciicast-v2 --idle-time-limit 2 --command crona-tui-dev '$cast'"
  tmux set-option -t "$SESSION" status off
  wait_for "[1] Today"
  pause 1.2

  # shellcheck source=/dev/null
  source "$HERE/flows/$name.sh"

  pause 1.5
  tmux send-keys -t "$SESSION" C-c
  for _ in $(seq 50); do tmux has-session -t "$SESSION" 2>/dev/null || break; sleep 0.1; done
  tmux kill-session -t "$SESSION" 2>/dev/null || true
  echo "  -> ${cast#"$SITE/"}"
}

if [ $# -gt 0 ]; then
  flows=("$@")
else
  flows=()
  for f in "$HERE"/flows/*.sh; do flows+=("$(basename "$f" .sh)"); done
fi

for flow in "${flows[@]}"; do
  for size in $SIZES; do
    dims="${size%%:*}"
    COLS="${dims%x*}"
    ROWS="${dims#*x}"
    record_flow "$flow" "${size#*:}"
  done
done
