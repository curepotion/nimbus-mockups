#!/bin/bash

# Simple script to commit and push changes to GitHub
# Usage: ./push-updates.sh "Your commit message"

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Please provide a commit message:"
    echo "Usage: ./push-updates.sh \"Your commit message\""
    exit 1
fi

# Add all changes
echo "Adding all changes..."
git add .

# Commit with the provided message
echo "Committing changes..."
git commit -m "$1"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "✅ Changes successfully pushed to GitHub!"
