#!/bin/bash

# Auto-push script that watches for file changes and automatically commits/pushes
# Usage: ./auto-push.sh
# Press Ctrl+C to stop watching

echo "🔄 Starting auto-push watcher..."
echo "This will automatically commit and push changes when files are modified."
echo "Press Ctrl+C to stop."
echo ""

# Function to commit and push changes
push_changes() {
    if [ -n "$(git status --porcelain)" ]; then
        echo "📝 Changes detected, committing..."
        git add .
        git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
        git push origin main
        echo "✅ Changes pushed to GitHub!"
        echo ""
    fi
}

# Initial check
push_changes

# Watch for changes using fswatch (install with: brew install fswatch)
if command -v fswatch >/dev/null 2>&1; then
    echo "Using fswatch for file monitoring..."
    fswatch -o . --exclude='.git' --exclude='node_modules' --exclude='*.log' | while read num; do
        sleep 2  # Wait a bit to avoid multiple rapid commits
        push_changes
    done
else
    echo "⚠️  fswatch not found. Install it with: brew install fswatch"
    echo "Falling back to periodic checking every 30 seconds..."
    
    # Fallback: check every 30 seconds
    while true; do
        sleep 30
        push_changes
    done
fi
