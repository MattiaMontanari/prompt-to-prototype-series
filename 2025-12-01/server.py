from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from agent import Agent

app = Flask(__name__)
CORS(app)

# Initialize the agent
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    from pathlib import Path
    api_key_path = Path.home() / "ANTHROPIC_API_KEY"
    try:
        with open(api_key_path, 'r') as f:
            api_key = f.read().strip()
    except FileNotFoundError:
        print("Warning: No API key found!")

agent = Agent(
    api_key=api_key,
    system_prompt="You are a helpful AI assistant with access to file system tools. "
                 "Use your tools to help users explore and read files in their directory. "
                 "Be friendly and conversational."
) if api_key else None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    if not agent:
        return jsonify({'error': 'Agent not initialized - API key missing'}), 500
    
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = agent.run(user_message)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear', methods=['POST'])
def clear():
    if agent:
        agent.clear_memory()
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print("\n🌐 Starting web server...")
    print("📱 Open your browser to: http://localhost:5001")
    print("🛑 Press CTRL+C to stop\n")
    app.run(debug=True, port=5001, host='0.0.0.0')

