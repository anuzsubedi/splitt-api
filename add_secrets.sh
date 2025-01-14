REPO="anuzsubedi/splitt-api"

# Debug: Print total number of lines
echo "Total lines in .env: $(wc -l < .env)"

# Loop through each line in .env file
while IFS='=' read -r key value || [ -n "$key" ]; do  # Added || [ -n "$key" ] to handle last line
  # Skip empty lines and comments
  if [[ -z "$key" || "$key" == \#* ]]; then
    continue
  fi
  
  # Trim leading/trailing whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)
  
  # Debug: Print current key being processed
  echo "Processing: $key"
  
  # Set the secret in GitHub Actions
  echo "Setting $key..."
  gh secret set "$key" --body "$value" --repo "$REPO"
done < .env

echo "Script completed"