import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function StructuredOutput() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Structured Output"
        subtitle="Get type-safe, validated responses with Pydantic schemas"
      />

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">What is Structured Output?</h2>
        <p className="text-[#a0a0a3] mb-4">
          Structured output ensures that your AI agent's responses conform to a specific schema.
          Instead of getting free-form text, you receive validated, type-safe data structures
          that your application can reliably process. FeatherAI uses Pydantic models to define
          and validate these schemas.
        </p>
        <p className="text-[#a0a0a3] mb-4">
          This is perfect for building production applications where you need predictable,
          machine-readable output from your AI agents.
        </p>
      </section>

      {/* Basic Schema */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Basic Schema Definition</h2>
        <p className="text-[#a0a0a3] mb-4">
          Define a Pydantic model to specify the structure of your agent's output:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from pydantic import BaseModel

class PersonInfo(BaseModel):
    name: str
    age: int
    occupation: str
    email: str

agent = AIAgent(
    model="gpt-4",
    output_schema=PersonInfo
)

# The agent will return structured data matching the schema
response = agent.run(
    "Extract information about: John Smith, 32 years old, software engineer at TechCorp, john@example.com"
)

# Access the structured data
person = response.parsed_output
print(f"Name: {person.name}")
print(f"Age: {person.age}")
print(f"Occupation: {person.occupation}")
print(f"Email: {person.email}")

# Output:
# Name: John Smith
# Age: 32
# Occupation: Software Engineer
# Email: john@example.com`}
          language="python"
          filename="basic_schema.py"
        />
        <div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4 mt-4">
          <p className="text-[#a0a0a3] text-sm">
            <strong className="text-[#22c4e0]">Type Safety:</strong> The output is automatically
            validated. If the AI tries to return data that doesn't match the schema, FeatherAI
            will retry or raise a validation error.
          </p>
        </div>
      </section>

      {/* Complex Schemas */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Complex Nested Schemas</h2>
        <p className="text-[#a0a0a3] mb-4">
          Create sophisticated schemas with nested models, lists, and optional fields:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Address(BaseModel):
    street: str
    city: str
    country: str
    postal_code: str

class Experience(BaseModel):
    company: str
    position: str
    start_date: str
    end_date: Optional[str] = None
    description: str

class Resume(BaseModel):
    full_name: str
    email: str
    phone: str
    address: Address
    summary: str
    work_experience: List[Experience]
    skills: List[str]
    education: List[str]

agent = AIAgent(
    model="claude-sonnet-4-5",
    output_schema=Resume,
    instructions="Extract and structure resume information from the provided text."
)

# Parse a resume from text
resume_text = """
Jane Doe
Email: jane.doe@email.com | Phone: (555) 123-4567
123 Main St, San Francisco, CA 94102

Experienced software engineer with 8 years in full-stack development.

Work Experience:
- Senior Engineer at TechCorp (2020-present): Led development of microservices
- Software Developer at StartupXYZ (2016-2020): Built mobile applications

Skills: Python, JavaScript, React, Docker, AWS
Education: BS Computer Science, MIT 2016
"""

response = agent.run(resume_text)
resume = response.parsed_output

print(f"Candidate: {resume.full_name}")
print(f"Location: {resume.address.city}, {resume.address.country}")
print(f"Experience: {len(resume.work_experience)} positions")
print(f"Skills: {', '.join(resume.skills)}")`}
          language="python"
          filename="complex_schema.py"
        />
      </section>

      {/* Field Validation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Field Validation and Constraints</h2>
        <p className="text-[#a0a0a3] mb-4">
          Add validation rules to ensure data quality using Pydantic's Field constraints:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from pydantic import BaseModel, Field, EmailStr, validator
from typing import Literal

class ProductReview(BaseModel):
    product_name: str = Field(..., min_length=1, max_length=200)
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    review_text: str = Field(..., min_length=10, max_length=1000)
    reviewer_email: EmailStr
    sentiment: Literal["positive", "neutral", "negative"]
    would_recommend: bool

    @validator('review_text')
    def review_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Review cannot be empty')
        return v

agent = AIAgent(
    model="gpt-4",
    output_schema=ProductReview,
    instructions="Analyze the customer review and extract structured information."
)

review_text = """
I bought the UltraWidget Pro and it's amazing! The build quality is excellent
and it works exactly as advertised. Definitely worth the price. I'd recommend
it to anyone looking for a reliable widget. Contact me at john@example.com
"""

response = agent.run(review_text)
review = response.parsed_output

print(f"Product: {review.product_name}")
print(f"Rating: {review.rating}/5")
print(f"Sentiment: {review.sentiment}")
print(f"Would recommend: {review.would_recommend}")

# All fields are validated:
# - rating is guaranteed to be 1-5
# - email is validated as a proper email address
# - sentiment is one of the three allowed values`}
          language="python"
          filename="field_validation.py"
        />
      </section>

      {/* Lists and Collections */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Extracting Lists and Collections</h2>
        <p className="text-[#a0a0a3] mb-4">
          Perfect for extracting multiple items from text, like analyzing meeting notes or
          extracting entities:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from pydantic import BaseModel
from typing import List
from datetime import date

class Task(BaseModel):
    title: str
    assignee: str
    due_date: str
    priority: str
    status: str

class MeetingNotes(BaseModel):
    meeting_title: str
    date: str
    attendees: List[str]
    key_points: List[str]
    action_items: List[Task]
    next_meeting: str

agent = AIAgent(
    model="claude-haiku-4-5",
    output_schema=MeetingNotes
)

notes = """
Product Planning Meeting - December 5, 2025
Attendees: Sarah (PM), Mike (Engineering), Lisa (Design), Tom (Marketing)

We discussed the Q1 roadmap and agreed on the following:
- Launch new mobile app by end of January
- Redesign homepage to improve conversion
- Increase marketing budget for Q1 campaign

Action items:
1. Mike to finalize API specifications by Dec 15 - High priority
2. Lisa to create mockups for homepage by Dec 20 - High priority
3. Tom to draft marketing plan by Jan 5 - Medium priority
4. Sarah to schedule user testing sessions by Dec 18 - Medium priority

Next meeting: December 19, 2025 at 2 PM
"""

response = agent.run(f"Parse these meeting notes: {notes}")
meeting = response.parsed_output

print(f"Meeting: {meeting.meeting_title}")
print(f"Attendees: {', '.join(meeting.attendees)}")
print(f"\\nAction Items:")
for task in meeting.action_items:
    print(f"  - {task.title} ({task.assignee}) - {task.priority} - Due: {task.due_date}")`}
          language="python"
          filename="lists_collections.py"
        />
      </section>

      {/* Enum and Literal Types */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Using Enums and Literal Types</h2>
        <p className="text-[#a0a0a3] mb-4">
          Restrict fields to specific allowed values for better type safety:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from pydantic import BaseModel
from typing import Literal
from enum import Enum

class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class TicketCategory(str, Enum):
    BUG = "bug"
    FEATURE = "feature"
    DOCUMENTATION = "documentation"
    QUESTION = "question"

class SupportTicket(BaseModel):
    title: str
    description: str
    category: TicketCategory
    priority: Priority
    status: Literal["open", "in_progress", "closed"]
    affected_users: int

agent = AIAgent(
    model="gpt-4",
    output_schema=SupportTicket,
    instructions="Parse support ticket information and categorize it."
)

ticket_text = """
Subject: Login page not working for mobile users

Users on mobile devices are unable to log in. They get an error message
saying "Invalid credentials" even with correct passwords. This is affecting
approximately 50 users. This is urgent as it's blocking access.
"""

response = agent.run(ticket_text)
ticket = response.parsed_output

print(f"Title: {ticket.title}")
print(f"Category: {ticket.category.value}")
print(f"Priority: {ticket.priority.value}")
print(f"Affected users: {ticket.affected_users}")

# Values are guaranteed to be valid enum members`}
          language="python"
          filename="enums_literals.py"
        />
      </section>

      {/* Real-world Use Cases */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Real-World Use Cases</h2>
        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">1. Invoice Processing</h3>
          <CodeBlock
            code={`from pydantic import BaseModel
from typing import List
from decimal import Decimal

class LineItem(BaseModel):
    description: str
    quantity: int
    unit_price: float
    total: float

class Invoice(BaseModel):
    invoice_number: str
    date: str
    vendor_name: str
    vendor_address: str
    customer_name: str
    items: List[LineItem]
    subtotal: float
    tax: float
    total: float

agent = AIAgent(
    model="claude-sonnet-4-5",
    output_schema=Invoice,
    instructions="Extract all invoice data from the document."
)

# Process scanned invoices automatically
invoice_text = "..."  # From OCR or PDF
response = agent.run(invoice_text)
invoice_data = response.parsed_output

# Now you have structured, validated invoice data ready for your accounting system`}
            language="python"
            filename="invoice_processing.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">2. Content Classification</h3>
          <CodeBlock
            code={`from pydantic import BaseModel, Field
from typing import List

class ContentAnalysis(BaseModel):
    main_topic: str
    subtopics: List[str]
    sentiment: Literal["positive", "negative", "neutral"]
    target_audience: str
    reading_level: Literal["beginner", "intermediate", "advanced"]
    key_entities: List[str]
    keywords: List[str] = Field(..., max_items=10)
    summary: str = Field(..., max_length=200)

agent = AIAgent(
    model="gpt-4",
    output_schema=ContentAnalysis
)

# Automatically classify and tag content
article = "..."  # Your article text
response = agent.run(f"Analyze this article: {article}")
analysis = response.parsed_output

# Use for content management, SEO, recommendations, etc.`}
            language="python"
            filename="content_classification.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">3. Data Extraction from Forms</h3>
          <CodeBlock
            code={`from pydantic import BaseModel, EmailStr
from typing import Optional

class JobApplication(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    position_applied: str
    years_experience: int
    current_company: Optional[str] = None
    linkedin_url: Optional[str] = None
    resume_summary: str
    why_interested: str

agent = AIAgent(
    model="claude-haiku-4-5",
    output_schema=JobApplication
)

# Extract structured data from free-form applications
application_text = "..."  # From email, form, or PDF
response = agent.run(application_text)
application = response.parsed_output

# Insert directly into your database or ATS`}
            language="python"
            filename="form_extraction.py"
          />
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Best Practices</h2>
        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <ul className="space-y-3 text-[#a0a0a3]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#22c4e0] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-white">Use Field Descriptions:</strong> Add descriptions
                to fields using Pydantic's Field() to help the AI understand what data to extract.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#be3389] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-white">Start Simple:</strong> Begin with basic schemas and
                add complexity gradually. Test each field to ensure the AI extracts it correctly.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#0357c1] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-white">Use Appropriate Types:</strong> Choose the most
                specific type possible. Use EmailStr for emails, enums for categories, and Literal
                for fixed choices.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#dfa987] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-white">Handle Optional Fields:</strong> Use Optional[] for
                fields that might not always be present in the input data.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#22c4e0] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">5</span>
              <div>
                <strong className="text-white">Test Validation:</strong> Test your schemas with
                edge cases to ensure validation rules work as expected.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Combining with Tools */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Combining Structured Output with Tools</h2>
        <p className="text-[#a0a0a3] mb-4">
          You can use structured output together with tool calling for powerful workflows:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from pydantic import BaseModel
from typing import List

class ResearchReport(BaseModel):
    topic: str
    key_findings: List[str]
    sources: List[str]
    conclusion: str

def search_web(query: str) -> str:
    """Search the web for information."""
    # Web search implementation
    return "search results..."

def fetch_article(url: str) -> str:
    """Fetch content from a URL."""
    # Article fetching implementation
    return "article content..."

agent = AIAgent(
    model="claude-sonnet-4-5",
    tools=[search_web, fetch_article],
    output_schema=ResearchReport,
    instructions="Research the topic using available tools, then provide a structured report."
)

# The agent will use tools to gather info, then return structured output
response = agent.run("Research the latest developments in quantum computing")
report = response.parsed_output

print(f"Topic: {report.topic}")
print(f"Key Findings: {len(report.key_findings)}")
print(f"Sources: {', '.join(report.sources)}")
print(f"\\nConclusion: {report.conclusion}")`}
          language="python"
          filename="structured_with_tools.py"
        />
      </section>
    </div>
  );
}
