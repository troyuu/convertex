#!/bin/bash
# Convertex Temp File Cleanup Script
# Removes all files in server/temp/ older than 30 minutes
# This is a safety net — the app also cleans up automatically

TEMP_DIR="${1:-./server/temp}"
MAX_AGE_MINUTES=30

echo "Cleaning up temp files older than ${MAX_AGE_MINUTES} minutes in ${TEMP_DIR}..."

if [ ! -d "$TEMP_DIR" ]; then
  echo "Temp directory not found: $TEMP_DIR"
  exit 1
fi

# Find and delete directories older than MAX_AGE_MINUTES
count=$(find "$TEMP_DIR" -mindepth 1 -maxdepth 1 -type d -mmin "+${MAX_AGE_MINUTES}" | wc -l | tr -d ' ')

if [ "$count" -gt 0 ]; then
  find "$TEMP_DIR" -mindepth 1 -maxdepth 1 -type d -mmin "+${MAX_AGE_MINUTES}" -exec rm -rf {} +
  echo "Cleaned up $count expired temp directories"
else
  echo "No expired temp directories found"
fi
