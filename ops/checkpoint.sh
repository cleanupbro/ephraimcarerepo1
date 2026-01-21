#!/bin/bash
# USAGE: ./ops/checkpoint.sh "Commit message"
if [ -z "$1" ]; then echo "Error: Message required"; exit 1; fi
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
echo "$TIMESTAMP | CHECKPOINT | $1" >> LOG.md
git add .
git commit -m "$1"
echo "✅ Checkpoint saved."
