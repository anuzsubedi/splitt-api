#!/bin/bash

# Ensure you are authenticated with `gh` and specify your repo
REPO="anuzsubedi/splitt-api"

# Loop through each line in .env file
while IFS='=' read -r key value; do
  # Skip empty lines and comments
  if [[ -z "$key" || "$key" == \#* ]]; then
    continue
  fi
  
  # Trim leading/trailing whitespace (if any)
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)
  
  # Set the secret in GitHub Actions
  echo "Setting $key..."
  gh secret set "$key" --body "$value" --repo "$REPO"
done < .env

echo "All secrets have been added!"
