#!/bin/bash

# Setup script for AI Agent

echo "🤖 AI Agent Setup"
echo "=================="
echo ""

# Check if API key file already exists
if [ -f ~/ANTHROPIC_API_KEY ]; then
    echo "✓ API key file already exists at ~/ANTHROPIC_API_KEY"
    read -p "Do you want to update it? (y/N): " update
    if [[ ! $update =~ ^[Yy]$ ]]; then
        echo "Keeping existing API key."
    else
        read -p "Enter your Anthropic API key: " api_key
        echo "$api_key" > ~/ANTHROPIC_API_KEY
        echo "✓ API key updated!"
    fi
else
    echo "✗ API key file not found."
    echo ""
    echo "You need an Anthropic API key to use this agent."
    echo "Get one at: https://console.anthropic.com/"
    echo ""
    read -p "Enter your Anthropic API key: " api_key
    
    if [ -z "$api_key" ]; then
        echo "✗ No API key provided. Exiting."
        exit 1
    fi
    
    echo "$api_key" > ~/ANTHROPIC_API_KEY
    echo "✓ API key saved to ~/ANTHROPIC_API_KEY"
fi

echo ""
echo "✓ Setup complete!"
echo ""
echo "To run the agent:"
echo "  1. source venv/bin/activate"
echo "  2. python agent.py"
echo ""

