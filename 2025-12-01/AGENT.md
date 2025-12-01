# Building Your Own AI Agent - A Beginner's Guide

Welcome! This guide will help you understand and build your own AI agent, even if you've never programmed before.

## 🤔 What is an AI Agent?

Think of an AI agent as a smart assistant that can:
- **Think**: Understand what you're asking
- **Act**: Use tools to help you (like reading files or listing folders)
- **Remember**: Keep track of your conversation
- **Decide**: Choose which tools to use on its own

It's like having a helpful friend who can explore your computer files and answer questions about them!

## 🏗️ How Does This Agent Work?

### The Simple Picture

```
You ask a question → Agent thinks → Agent uses tools → Agent answers
                          ↑______________|
                       (Repeats until done)
```

### The Three Parts

1. **The Brain (Claude AI)**: Makes decisions about what to do
2. **The Tools**: Actions the agent can perform
   - `list_directory`: See what files are in a folder
   - `read_file`: Read what's inside a file
3. **The Memory**: Remembers your entire conversation

## 📚 Understanding the Code (No Experience Needed!)

### Main File: `agent.py`

This file has everything the agent needs. Let's break it down:

#### 1. The Agent's Brain
```python
class Agent:
    def __init__(self, api_key: str, system_prompt: str = None):
```
- This creates a new agent
- `api_key`: Your secret password to use Claude AI
- `system_prompt`: Instructions that tell the agent how to behave

#### 2. The Tools
```python
def list_directory(self, path: str = ".") -> str:
    # Shows you files in a folder
```
```python
def read_file(self, file_path: str) -> str:
    # Reads what's in a file
```

#### 3. The Agentic Loop
```python
def run(self, user_message: str, max_iterations: int = 10) -> str:
```
This is the "magic" that makes it work:
1. Takes your question
2. Sends it to Claude AI
3. If Claude wants to use a tool, it uses it
4. Claude thinks about the tool's result
5. Repeats until Claude has an answer
6. Gives you the answer

## 🎯 How to Use This Project

### Option 1: Command Line (Terminal)
For typing commands directly:
```bash
python agent.py
```
Then type questions like:
- "What files are here?"
- "Read the README.md file"

### Option 2: Web Interface (Pretty Version)
For using a web page with buttons:
```bash
python server.py
```
Then open your browser to: `http://localhost:5001`

## 🛠️ How to Build Your Own Agent

### Step 1: Get an API Key
1. Go to https://console.anthropic.com/
2. Sign up (it's free to start!)
3. Get your API key
4. Save it in a file:
```bash
echo "your-api-key-here" > ~/ANTHROPIC_API_KEY
```

### Step 2: Set Up Your Environment
```bash
# Create a virtual environment (like a clean workspace)
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install required libraries
pip install anthropic flask flask-cors
```

### Step 3: Start Simple
Copy the `agent.py` file and try changing:

**Change the system prompt** (line 190):
```python
system_prompt="You are a helpful AI assistant..."
```
Try making it funny, formal, or anything you want!

**Change what the agent says** (line 194):
```python
print("🤖 Agent initialized! Type 'quit' to exit...")
```

### Step 4: Add Your Own Tools

Want to add a new tool? Here's the pattern:

```python
# 1. Add tool definition to self.tools list
{
    "name": "my_new_tool",
    "description": "What it does",
    "input_schema": {
        "type": "object",
        "properties": {
            "parameter_name": {
                "type": "string",
                "description": "What this parameter is for"
            }
        },
        "required": ["parameter_name"]
    }
}

# 2. Create the tool function
def my_new_tool(self, parameter_name: str) -> str:
    """Do something cool here"""
    return f"Result of doing something with {parameter_name}"

# 3. Add it to execute_tool function
def execute_tool(self, tool_name: str, tool_input: Dict[str, Any]) -> str:
    if tool_name == "my_new_tool":
        return self.my_new_tool(tool_input["parameter_name"])
```

## 💡 Ideas for Your Own Agent

### Easy Ideas (Great for Beginners)
1. **Weather Agent**: Add a tool to check the weather
2. **Calculator Agent**: Add math operations
3. **Reminder Agent**: Create and list reminders
4. **Note Taker**: Save and read notes

### Medium Ideas (After You're Comfortable)
1. **Email Agent**: Check and send emails
2. **Calendar Agent**: Manage your schedule
3. **Task Manager**: Create to-do lists with priorities
4. **File Organizer**: Sort files by type or date

### Advanced Ideas (For When You're Ready)
1. **Code Helper**: Write and run code snippets
2. **Research Agent**: Search the web and summarize
3. **Data Analyzer**: Read CSV files and create charts
4. **Personal Assistant**: Combine multiple tools

## 🎓 Learning Resources

### Understanding AI Agents
- Search YouTube for "AI Agents explained"
- Look up "Anthropic Claude API tutorial"
- Read about "function calling" or "tool use" in AI

### Learning Python (What This Is Written In)
- Python.org tutorials (free!)
- Codecademy Python course
- "Python for Everybody" course (free)

### Understanding APIs
- "What is an API" on YouTube
- FreeCodeCamp API courses
- Try making API calls in your browser

## 🚨 Common Questions

**Q: Do I need to know programming?**
A: Not to start! You can experiment by changing text in the code. But learning Python basics will help you customize more.

**Q: How much does this cost?**
A: Claude API has a free tier to start. Most simple experiments cost pennies!

**Q: What if I break something?**
A: You can't really "break" anything! Just restore the original file from this repository.

**Q: Where do I get help?**
A: Check out:
- Anthropic's documentation: https://docs.anthropic.com/
- Python community forums
- GitHub discussions for this project

## 🎉 Your First Steps

1. **Run the agent** as-is to see how it works
2. **Change the system prompt** to make it talk differently
3. **Add a simple tool** (like a calculator)
4. **Share what you built!**

## 🌟 Remember

- Start small - even tiny changes are progress!
- Experiment - try things and see what happens
- Ask questions - the programming community is friendly
- Have fun - building AI agents is exciting!

## 📖 Next Steps

Once you're comfortable with this agent:
1. Learn more Python basics
2. Explore other Claude models (Opus, Sonnet)
3. Add more complex tools
4. Build a custom interface
5. Share your agent with others!

---

**Built with ❤️ using Claude AI**

Want to see what others have built? Search for "Claude AI agents" or "Anthropic tool use examples" online!

