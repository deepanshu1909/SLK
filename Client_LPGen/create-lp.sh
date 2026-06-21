#!/usr/bin/env bash
# Generate a client LP and optionally deploy to zarklo.com/{slug}
#
#   ./create-lp.sh -w URL -i URL -s slug --deploy
#   ./create-lp.sh                                    # interactive

set -e
cd "$(dirname "$0")"

PYTHON="${PYTHON:-python3}"
VENV=".venv"

if [[ ! -d "$VENV" ]]; then
  echo "→ First-time setup: creating virtual environment…"
  "$PYTHON" -m venv "$VENV"
  source "$VENV/bin/activate"
  pip install -q -r requirements.txt
  echo "✓ Dependencies installed"
else
  source "$VENV/bin/activate"
fi

if [[ $# -eq 0 ]]; then
  echo ""
  echo "  Client LP Generator → zarklo.com"
  echo "  ─────────────────────────────────"
  read -r -p "Website URL (optional): " WEBSITE
  read -r -p "Instagram URL (optional): " INSTAGRAM
  read -r -p "URL slug (e.g. one-salon-nyc): " SLUG
  read -r -p "Deploy to zarklo.com? [Y/n]: " DEPLOY_ANS
  echo ""

  ARGS=()
  [[ -n "$WEBSITE" ]] && ARGS+=(-w "$WEBSITE")
  [[ -n "$INSTAGRAM" ]] && ARGS+=(-i "$INSTAGRAM")
  [[ -n "$SLUG" ]] && ARGS+=(-s "$SLUG")

  if [[ ${#ARGS[@]} -eq 0 ]]; then
    echo "Error: provide at least one URL."
    exit 1
  fi

  if [[ "$DEPLOY_ANS" != "n" && "$DEPLOY_ANS" != "N" ]]; then
    ARGS+=(--deploy)
  fi

  python generate_lp.py "${ARGS[@]}"
else
  python generate_lp.py "$@"
fi

LATEST=$(ls -t output/*.html 2>/dev/null | head -1)
if [[ -n "$LATEST" && "$*" != *"--deploy"* ]]; then
  if command -v open &>/dev/null; then
    open "$LATEST"
  fi
fi
