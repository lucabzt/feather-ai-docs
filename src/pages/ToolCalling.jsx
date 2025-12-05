import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function ToolCalling() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Tool Calling"
        subtitle="Extend your agents with custom functions and external APIs"
      />

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">What is Tool Calling?</h2>
        <p className="text-[#a0a0a3] mb-4">
          Tool calling allows your AI agents to interact with external functions, APIs, and services.
          Instead of just generating text, your agents can perform actions like fetching data from databases,
          calling web APIs, executing calculations, or interacting with any custom Python function you define.
        </p>
        <p className="text-[#a0a0a3] mb-4">
          With FeatherAI's intuitive tool system, you can give your agents superpowers in just a few lines of code.
        </p>
      </section>

      {/* Basic Tool Definition */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Defining a Simple Tool</h2>
        <p className="text-[#a0a0a3] mb-4">
          Create a tool by defining a Python function with type hints and a docstring:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent

def get_weather(city: str) -> str:
    """Get the current weather for a city.

    Args:
        city: The name of the city to get weather for

    Returns:
        A string describing the current weather
    """
    # In a real app, you'd call a weather API here
    return f"The weather in {city} is sunny and 72°F"

# Create an agent with the tool
agent = AIAgent(
    model="claude-haiku-4-5",
    tools=[get_weather]
)

# The agent can now call the tool
response = agent.run("What's the weather like in Paris?")
print(response.content)
# Output: Based on the current data, the weather in Paris is sunny and 72°F`}
          language="python"
          filename="simple_tool.py"
        />
        <div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4 mt-4">
          <p className="text-[#a0a0a3] text-sm">
            <strong className="text-[#22c4e0]">Important:</strong> The docstring is crucial! It tells the AI
            what the function does and when to use it. Always include clear descriptions of parameters and return values.
          </p>
        </div>
      </section>

      {/* Multiple Tools */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Using Multiple Tools</h2>
        <p className="text-[#a0a0a3] mb-4">
          You can provide multiple tools to your agent. The AI will intelligently choose which tools
          to use based on the user's request:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from datetime import datetime

def get_current_time() -> str:
    """Get the current time.

    Returns:
        The current time in HH:MM:SS format
    """
    return datetime.now().strftime("%H:%M:%S")

def calculate_age(birth_year: int) -> int:
    """Calculate a person's age based on their birth year.

    Args:
        birth_year: The year the person was born

    Returns:
        The person's current age in years
    """
    current_year = datetime.now().year
    return current_year - birth_year

def add_numbers(a: float, b: float) -> float:
    """Add two numbers together.

    Args:
        a: The first number
        b: The second number

    Returns:
        The sum of a and b
    """
    return a + b

# Create agent with multiple tools
agent = AIAgent(
    model="gpt-4",
    tools=[get_current_time, calculate_age, add_numbers]
)

# The agent will choose the right tool(s) for each task
response = agent.run("What time is it and how old is someone born in 1990?")
print(response.content)
# The agent will call both get_current_time() and calculate_age(1990)`}
          language="python"
          filename="multiple_tools.py"
        />
      </section>

      {/* Complex Tools with API Calls */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Real-World Example: API Integration</h2>
        <p className="text-[#a0a0a3] mb-4">
          Here's how to integrate real external APIs into your agent:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
import requests

def search_web(query: str) -> str:
    """Search the web for information about a topic.

    Args:
        query: The search query

    Returns:
        A summary of search results
    """
    # Using a hypothetical search API
    api_key = "your_api_key"
    response = requests.get(
        "https://api.searchengine.com/search",
        params={"q": query, "key": api_key}
    )
    results = response.json()
    return results.get("summary", "No results found")

def get_stock_price(symbol: str) -> dict:
    """Get the current stock price for a given ticker symbol.

    Args:
        symbol: The stock ticker symbol (e.g., AAPL, GOOGL)

    Returns:
        A dictionary with price information
    """
    # Using a hypothetical stock API
    response = requests.get(
        f"https://api.stocks.com/quote/{symbol}"
    )
    data = response.json()
    return {
        "symbol": symbol,
        "price": data["price"],
        "change": data["change"]
    }

def send_email(to: str, subject: str, body: str) -> str:
    """Send an email to someone.

    Args:
        to: Email address of the recipient
        subject: Email subject line
        body: Email body content

    Returns:
        Confirmation message
    """
    # Integration with email service
    # In production, use a proper email library
    return f"Email sent to {to} with subject: {subject}"

# Create a powerful agent with API tools
agent = AIAgent(
    model="claude-sonnet-4-5",
    tools=[search_web, get_stock_price, send_email],
    instructions="You are a helpful assistant with access to web search, stock data, and email."
)

# Complex multi-tool task
response = agent.run(
    "Look up the current price of Apple stock and email a summary to john@example.com"
)
print(response.content)`}
          language="python"
          filename="api_integration.py"
        />
      </section>

      {/* Tool with Complex Parameters */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Tools with Complex Parameters</h2>
        <p className="text-[#a0a0a3] mb-4">
          Tools can accept complex types like lists, dictionaries, and optional parameters:
        </p>
        <CodeBlock
          code={`from typing import List, Optional
from feather_ai import AIAgent

def filter_data(
    items: List[str],
    keyword: str,
    case_sensitive: bool = False
) -> List[str]:
    """Filter a list of items based on a keyword.

    Args:
        items: List of strings to filter
        keyword: The keyword to search for
        case_sensitive: Whether to do case-sensitive matching (default: False)

    Returns:
        Filtered list of items containing the keyword
    """
    if not case_sensitive:
        keyword = keyword.lower()
        return [item for item in items if keyword in item.lower()]
    return [item for item in items if keyword in item]

def create_report(
    title: str,
    data: dict,
    include_charts: bool = True,
    format: str = "pdf"
) -> str:
    """Create a report from data.

    Args:
        title: Report title
        data: Dictionary containing the report data
        include_charts: Whether to include charts (default: True)
        format: Output format - 'pdf', 'html', or 'markdown' (default: 'pdf')

    Returns:
        Path to the generated report
    """
    # Report generation logic
    return f"Report '{title}' created in {format} format"

agent = AIAgent(
    model="gpt-4",
    tools=[filter_data, create_report]
)

response = agent.run(
    "Filter these items: ['apple', 'banana', 'Apple Pie', 'orange'] "
    "to find ones containing 'apple' (case insensitive)"
)
print(response.content)`}
          language="python"
          filename="complex_parameters.py"
        />
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Error Handling in Tools</h2>
        <p className="text-[#a0a0a3] mb-4">
          Always handle errors gracefully in your tools. The agent will use error messages to
          retry or inform the user:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
import requests

def fetch_user_data(user_id: int) -> dict:
    """Fetch user data from the database.

    Args:
        user_id: The ID of the user to fetch

    Returns:
        Dictionary containing user information

    Raises:
        ValueError: If user_id is invalid
        ConnectionError: If the API is unavailable
    """
    try:
        if user_id < 1:
            raise ValueError("User ID must be a positive integer")

        response = requests.get(
            f"https://api.example.com/users/{user_id}",
            timeout=5
        )
        response.raise_for_status()

        return response.json()

    except requests.exceptions.Timeout:
        return {"error": "Request timed out. Please try again."}
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            return {"error": f"User {user_id} not found"}
        return {"error": f"API error: {str(e)}"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}

agent = AIAgent(
    model="claude-haiku-4-5",
    tools=[fetch_user_data]
)

# The agent will handle errors gracefully
response = agent.run("Get information for user 999999")
print(response.content)`}
          language="python"
          filename="error_handling.py"
        />
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Best Practices</h2>
        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <ul className="space-y-3 text-[#a0a0a3]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#22c4e0] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-white">Clear Docstrings:</strong> Write detailed docstrings
                that explain what the tool does, all parameters, and return values. The AI uses this to
                understand when and how to use your tool.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#be3389] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-white">Type Hints:</strong> Always use Python type hints.
                They help FeatherAI understand what data types your tools expect and return.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#0357c1] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-white">Keep Tools Focused:</strong> Each tool should do one
                thing well. Instead of a giant "do_everything" function, create multiple smaller, focused tools.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#dfa987] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-white">Handle Errors:</strong> Always include proper error
                handling. Return meaningful error messages that the AI can use to inform the user or retry.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#22c4e0] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">5</span>
              <div>
                <strong className="text-white">Test Your Tools:</strong> Test tools independently
                before integrating them with your agent to ensure they work correctly.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Native Tools */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Built-in Native Tools</h2>
        <p className="text-[#a0a0a3] mb-4">
          FeatherAI comes with powerful built-in tools that you can use immediately. These tools
          provide common functionality like web search, file operations, and more:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from feather_ai.tools.native import web_search, code_interpreter

# Use built-in tools alongside your custom tools
agent = AIAgent(
    model="claude-sonnet-4-5",
    tools=[web_search, code_interpreter]
)

response = agent.run("Search for the latest Python best practices and summarize them")
print(response.content)`}
          language="python"
          filename="native_tools.py"
        />
        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] rounded-lg p-4 mt-4">
          <p className="text-[#a0a0a3] text-sm">
            Learn more about all available native tools in the{' '}
            <a href="/native-tools" className="text-[#22c4e0] hover:underline">Native Tools documentation</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
