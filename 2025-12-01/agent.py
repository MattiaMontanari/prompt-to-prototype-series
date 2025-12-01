import anthropic
import json
import os
from pathlib import Path
from typing import List, Dict, Any

class Agent:
    def __init__(self, api_key: str, system_prompt: str = None):
        """Initialize the agent with Anthropic API and memory."""
        self.client = anthropic.Anthropic(api_key=api_key)
        self.memory: List[Dict[str, Any]] = []  # Conversation history
        self.system_prompt = system_prompt or "You are a helpful AI assistant with access to file system tools."
        
        # Define available tools
        self.tools = [
            {
                "name": "list_directory",
                "description": "Lists all files and directories in the specified path. If no path is provided, lists the current directory.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "path": {
                            "type": "string",
                            "description": "The directory path to list. Defaults to current directory if not provided."
                        }
                    },
                    "required": []
                }
            },
            {
                "name": "read_file",
                "description": "Reads the contents of a file at the specified path.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "file_path": {
                            "type": "string",
                            "description": "The path to the file to read."
                        }
                    },
                    "required": ["file_path"]
                }
            }
        ]
    
    def list_directory(self, path: str = ".") -> str:
        """Tool: List files and directories in a given path."""
        try:
            path_obj = Path(path)
            if not path_obj.exists():
                return f"Error: Path '{path}' does not exist."
            
            if not path_obj.is_dir():
                return f"Error: Path '{path}' is not a directory."
            
            items = []
            for item in sorted(path_obj.iterdir()):
                item_type = "📁" if item.is_dir() else "📄"
                items.append(f"{item_type} {item.name}")
            
            return f"Contents of '{path}':\n" + "\n".join(items)
        except Exception as e:
            return f"Error listing directory: {str(e)}"
    
    def read_file(self, file_path: str) -> str:
        """Tool: Read the contents of a file."""
        try:
            path_obj = Path(file_path)
            if not path_obj.exists():
                return f"Error: File '{file_path}' does not exist."
            
            if not path_obj.is_file():
                return f"Error: '{file_path}' is not a file."
            
            with open(path_obj, 'r', encoding='utf-8') as f:
                content = f.read()
            
            return f"Contents of '{file_path}':\n\n{content}"
        except Exception as e:
            return f"Error reading file: {str(e)}"
    
    def execute_tool(self, tool_name: str, tool_input: Dict[str, Any]) -> str:
        """Execute a tool by name with given inputs."""
        if tool_name == "list_directory":
            return self.list_directory(tool_input.get("path", "."))
        elif tool_name == "read_file":
            return self.read_file(tool_input["file_path"])
        else:
            return f"Error: Unknown tool '{tool_name}'"
    
    def run(self, user_message: str, max_iterations: int = 10) -> str:
        """
        Run the agent with a user message.
        This implements the agentic loop: LLM → Tools → LLM → ... → END
        """
        # Add user message to memory
        self.memory.append({
            "role": "user",
            "content": user_message
        })
        
        iteration = 0
        
        while iteration < max_iterations:
            iteration += 1
            
            # Call Claude with current memory and tools
            response = self.client.messages.create(
                model="claude-haiku-4-5",
                max_tokens=4096,
                system=self.system_prompt,
                messages=self.memory,
                tools=self.tools
            )
            
            # Add assistant response to memory
            self.memory.append({
                "role": "assistant",
                "content": response.content
            })
            
            # Check if we're done (no tool use)
            if response.stop_reason == "end_turn":
                # Extract text response
                text_response = ""
                for block in response.content:
                    if block.type == "text":
                        text_response += block.text
                return text_response
            
            # Process tool uses
            if response.stop_reason == "tool_use":
                tool_results = []
                
                for block in response.content:
                    if block.type == "tool_use":
                        # Execute the tool
                        tool_result = self.execute_tool(block.name, block.input)
                        
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": tool_result
                        })
                
                # Add tool results to memory
                self.memory.append({
                    "role": "user",
                    "content": tool_results
                })
                
                # Continue the loop to let Claude process tool results
                continue
        
        return "Error: Maximum iterations reached"
    
    def clear_memory(self):
        """Clear the conversation memory."""
        self.memory = []
    
    def get_memory(self) -> List[Dict[str, Any]]:
        """Get the current conversation memory."""
        return self.memory


def main():
    # Load API key from environment variable or file
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    
    if not api_key:
        # Try loading from file in home directory
        api_key_path = Path.home() / "ANTHROPIC_API_KEY"
        try:
            with open(api_key_path, 'r') as f:
                api_key = f.read().strip()
        except FileNotFoundError:
            print(f"Error: API key not found!")
            print(f"Please set ANTHROPIC_API_KEY environment variable or")
            print(f"create {api_key_path} with your Anthropic API key.")
            print(f"\nGet an API key at: https://console.anthropic.com/")
            return
    
    if not api_key:
        print("Error: API key is empty!")
        return
    
    # Initialize agent
    agent = Agent(
        api_key=api_key,
        system_prompt="You are a helpful AI assistant with access to file system tools. "
                     "Use your tools to help users explore and read files in their directory."
    )
    
    print("🤖 Agent initialized! Type 'quit' to exit, 'clear' to clear memory.\n")
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() == 'quit':
            print("Goodbye!")
            break
        
        if user_input.lower() == 'clear':
            agent.clear_memory()
            print("Memory cleared!\n")
            continue
        
        if not user_input:
            continue
        
        print("\n🤖 Agent: ", end="", flush=True)
        response = agent.run(user_input)
        print(response)
        print()


if __name__ == "__main__":
    main()
