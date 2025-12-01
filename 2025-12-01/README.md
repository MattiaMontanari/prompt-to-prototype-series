# AI Agent with Memory and File Tools

**Session Date:** December 1, 2025  
**Course:** From Prompt to Prototype  
**Topic:** LLMs vs Agents

## Overview

In this session, we explored the fundamental differences between Large Language Models and AI Agents through live coding. We built a functional AI agent with memory, file system tools, and an agentic loop that demonstrates how agents autonomously decide when to use tools, maintain conversation history, and interact with environments beyond simple text generation.

## What We Built

- AI agent with autonomous tool selection
- File system interaction tools (list_directory, read_file)
- Persistent conversation memory across interactions
- Agentic loop implementation with Claude

## Key Concepts

### LLMs vs Agents

**LLMs (Large Language Models):**
- Generate text based on prompts
- Stateless - no memory between calls
- Single input → single output

**Agents:**
- Use LLMs as the "brain" to make decisions
- Can use tools to interact with the environment
- Maintain memory and state
- Autonomous multi-step reasoning

### Architecture

```
Prompt → [Agent (LLM) ↔ Tools] ↔ Environment (Memory)
                ↓
              END
```

The agent implements an agentic loop where:
- **LLM**: Claude processes requests and decides which tools to use
- **Tools**: `list_directory` and `read_file` interact with your filesystem
- **Memory**: Full conversation history is maintained across interactions
- **Environment**: Your local file system

### Agentic Loop

1. You send a message
2. Claude analyzes your request
3. If needed, Claude calls tools (list_directory, read_file)
4. Claude processes the tool results
5. Claude responds with the answer (or calls more tools)
6. All interactions are stored in memory

## Setup

### 1. API Key Setup

You need to create an API key file in your home directory:

```bash
echo "your-anthropic-api-key-here" > ~/ANTHROPIC_API_KEY
```

Replace `your-anthropic-api-key-here` with your actual Anthropic API key.

**Don't have an API key?** Get one at: https://console.anthropic.com/

### 2. Activate Virtual Environment

The virtual environment is already created. Just activate it:

```bash
source venv/bin/activate
```

## Running the Agent

```bash
# Make sure you're in the project directory
cd /Users/mattiamontanari/repos/ox-prompt-to-prototype-series/2025-12-01

# Activate the virtual environment
source venv/bin/activate

# Run the agent
python agent.py
```

## Usage

Once running, you'll see:
```
Agent initialized! Type 'quit' to exit, 'clear' to clear memory.

You: 
```

### Example Commands

Try these commands:

```
You: What files are in my current directory?
You: Read the agent.py file
You: Can you show me what's in the deleteme folder?
You: Summarize what you've learned about this project
```

### Special Commands

- `quit` - Exit the agent
- `clear` - Clear conversation memory (start fresh)

## Features

**Persistent Memory**: The agent remembers your entire conversation  
**File System Tools**: List directories and read files  
**Agentic Loop**: Claude autonomously decides when to use tools  
**Multi-step Reasoning**: Can use multiple tools in sequence  

## Extending the Agent

Want to add more tools? Edit `agent.py` and add to the `self.tools` list:

```python
{
    "name": "your_tool_name",
    "description": "What your tool does",
    "input_schema": {
        "type": "object",
        "properties": {
            "param_name": {
                "type": "string",
                "description": "Parameter description"
            }
        },
        "required": ["param_name"]
    }
}
```

Then implement the tool method and add it to `execute_tool()`.

## Project Structure

```
.
├── agent.py          # Main agent implementation
├── README.md         # This file
├── venv/            # Virtual environment (don't commit this)
└── deleteme/        # Sample directory
```

## Troubleshooting

**Error: API key file not found**
- Make sure you created `~/ANTHROPIC_API_KEY` with your actual API key

**Error: Module 'anthropic' not found**
- Activate the virtual environment: `source venv/bin/activate`
- If that doesn't work, reinstall: `pip install anthropic`

**Permission errors**
- Make sure you're running from the correct directory
- Ensure the virtual environment is activated

---

## Session Outcome

Functional AI agent with memory and autonomous tool usage:

![Session Outcome](lesson/p2p-course-01-12-2025-create-agent.gif)

---

<div align="center">

**[← Back to Course Home](../README.md)**

*Part of the "From Prompt to Prototype" series*  
*University of Oxford | Digital Capabilities*

---

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

</div>
