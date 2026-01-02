#!/bin/bash
# EPHRAIM CARE - Test Notification Script
# Usage: ./scripts/test-notify.sh [whatsapp|telegram|sms|all]

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
API_URL="http://localhost:3000/api/notify"
# DEV/TEST: Shamal's number
WHATSAPP_TO="61406764585"
# PRODUCTION: Uncomment below when going live
# WHATSAPP_TO="61451918884"  # Meshach's number

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   EPHRAIM CARE - NOTIFICATION TEST    ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

TYPE=${1:-"telegram"}
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
MESSAGE="🧪 TEST NOTIFICATION

Ephraim Care Website
Test sent at: $TIMESTAMP

If you received this, notifications are working!"

echo -e "${YELLOW}Sending $TYPE notification...${NC}"
echo ""

case $TYPE in
  "whatsapp")
    curl -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"type\": \"whatsapp\", \"to\": \"$WHATSAPP_TO\", \"message\": \"$MESSAGE\"}"
    ;;
  "telegram")
    curl -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"type\": \"telegram\", \"message\": \"$MESSAGE\"}"
    ;;
  "sms")
    curl -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"type\": \"sms\", \"to\": \"+61451918884\", \"message\": \"$MESSAGE\"}"
    ;;
  "all")
    curl -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"type\": \"all\", \"to\": \"$WHATSAPP_TO\", \"message\": \"$MESSAGE\"}"
    ;;
  *)
    echo "Usage: $0 [whatsapp|telegram|sms|all]"
    exit 1
    ;;
esac

echo ""
echo ""
echo -e "${GREEN}✓ Request sent!${NC}"
echo ""
echo "Check your:"
case $TYPE in
  "whatsapp") echo "  - WhatsApp for message" ;;
  "telegram") echo "  - Telegram for message" ;;
  "sms") echo "  - Phone for SMS" ;;
  "all") echo "  - WhatsApp, Telegram, and SMS" ;;
esac
