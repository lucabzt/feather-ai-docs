import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function Multimodal() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Multimodal"
        subtitle="Work with text, images, PDFs, and other document types"
      />

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">What is Multimodal AI?</h2>
        <p className="text-[#a0a0a3] mb-4">
          Multimodal AI allows your agents to understand and process multiple types of content beyond
          just text. With FeatherAI, your agents can analyze images, read PDFs, process screenshots,
          extract data from documents, and combine different media types in a single conversation.
        </p>
        <p className="text-[#a0a0a3] mb-4">
          FeatherAI provides two powerful classes for multimodal interactions: <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">Prompt</code> for
          composing rich messages and <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">Document</code> for loading various file types.
        </p>
      </section>

      {/* Basic Image Processing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Working with Images</h2>
        <p className="text-[#a0a0a3] mb-4">
          Send images to your agent using the Prompt class. The agent can analyze, describe, and
          extract information from images:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent, Prompt

agent = AIAgent(model="gpt-4")

# Create a prompt with an image
prompt = Prompt()
prompt.add_text("What objects do you see in this image?")
prompt.add_image("path/to/image.jpg")

# Send to the agent
response = agent.run(prompt)
print(response.content)

# Or use the shorthand method
prompt = Prompt.from_image(
    "path/to/screenshot.png",
    "Describe what's happening in this screenshot"
)
response = agent.run(prompt)
print(response.content)`}
          language="python"
          filename="image_processing.py"
        />
        <div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4 mt-4">
          <p className="text-[#a0a0a3] text-sm">
            <strong className="text-[#22c4e0]">Supported Formats:</strong> JPEG, PNG, GIF, WebP, and
            most common image formats are supported. Images are automatically resized if needed.
          </p>
        </div>
      </section>

      {/* The Prompt Class */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">The Prompt Class</h2>
        <p className="text-[#a0a0a3] mb-4">
          The Prompt class lets you compose rich, multimodal messages by combining text, images,
          and other content types:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent, Prompt

agent = AIAgent(model="claude-sonnet-4-5")

# Build a complex prompt
prompt = Prompt()
prompt.add_text("I need help analyzing these product images:")
prompt.add_image("product_front.jpg")
prompt.add_image("product_back.jpg")
prompt.add_text("Please provide:")
prompt.add_text("1. A description of the product")
prompt.add_text("2. Any visible defects or issues")
prompt.add_text("3. Estimated quality rating (1-10)")

response = agent.run(prompt)
print(response.content)

# Chain multiple additions
prompt = (Prompt()
    .add_text("Compare these two designs:")
    .add_image("design_v1.png")
    .add_image("design_v2.png")
    .add_text("Which one is more visually appealing and why?")
)

response = agent.run(prompt)
print(response.content)`}
          language="python"
          filename="prompt_class.py"
        />
      </section>

      {/* The Document Class */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">The Document Class</h2>
        <p className="text-[#a0a0a3] mb-4">
          The Document class handles loading and processing various file types, automatically
          converting them into a format that AI agents can understand:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent, Prompt, Document

agent = AIAgent(model="gpt-4")

# Load and analyze a PDF document
doc = Document.from_pdf("report.pdf")
prompt = Prompt()
prompt.add_text("Summarize the key points from this document:")
prompt.add_document(doc)

response = agent.run(prompt)
print(response.content)

# Load different document types
word_doc = Document.from_docx("proposal.docx")
text_doc = Document.from_text_file("notes.txt")
markdown_doc = Document.from_markdown("readme.md")

# Combine multiple documents
prompt = Prompt()
prompt.add_text("Compare these three documents and identify common themes:")
prompt.add_document(word_doc)
prompt.add_document(text_doc)
prompt.add_document(markdown_doc)

response = agent.run(prompt)
print(response.content)`}
          language="python"
          filename="document_class.py"
        />
        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] rounded-lg p-4 mt-4">
          <p className="text-[#a0a0a3] text-sm">
            <strong className="text-[#22c4e0]">Supported Document Types:</strong> PDF, DOCX, TXT, MD,
            HTML, CSV, JSON, XML, and more. The Document class automatically detects the file type and
            processes it appropriately.
          </p>
        </div>
      </section>

      {/* PDF Processing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Advanced PDF Processing</h2>
        <p className="text-[#a0a0a3] mb-4">
          Extract specific pages, tables, or sections from PDF documents:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent, Prompt, Document

agent = AIAgent(model="claude-haiku-4-5")

# Load specific pages from a PDF
doc = Document.from_pdf("invoice.pdf", pages=[0, 1])  # First two pages only

# Extract data with structured output
from pydantic import BaseModel
from typing import List

class InvoiceData(BaseModel):
    invoice_number: str
    date: str
    vendor: str
    items: List[dict]
    total: float

agent = AIAgent(
    model="gpt-4",
    output_schema=InvoiceData
)

prompt = Prompt()
prompt.add_text("Extract all invoice information from this document:")
prompt.add_document(doc)

response = agent.run(prompt)
invoice = response.parsed_output
print(f"Invoice #{invoice.invoice_number} - Total: ${invoice.total}")

# Process multi-page documents with page-specific queries
doc = Document.from_pdf("contract.pdf")
prompt = Prompt()
prompt.add_text("""
Analyze this contract and provide:
1. Party names (usually on page 1)
2. Key terms and conditions (throughout document)
3. Termination clauses (usually near the end)
4. Signature dates
""")
prompt.add_document(doc)

response = agent.run(prompt)
print(response.content)`}
          language="python"
          filename="pdf_processing.py"
        />
      </section>

      {/* Image URLs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Working with Image URLs</h2>
        <p className="text-[#a0a0a3] mb-4">
          You can also use images from URLs without downloading them first:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent, Prompt

agent = AIAgent(model="claude-sonnet-4-5")

# Use an image URL directly
prompt = Prompt()
prompt.add_text("What product is shown in this image?")
prompt.add_image_url("https://example.com/product-image.jpg")

response = agent.run(prompt)
print(response.content)

# Analyze multiple images from URLs
prompt = Prompt()
prompt.add_text("Compare these product photos and identify differences:")
prompt.add_image_url("https://example.com/photo1.jpg")
prompt.add_image_url("https://example.com/photo2.jpg")
prompt.add_image_url("https://example.com/photo3.jpg")

response = agent.run(prompt)
print(response.content)`}
          language="python"
          filename="image_urls.py"
        />
      </section>

      {/* Combining Modalities */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Combining Multiple Modalities</h2>
        <p className="text-[#a0a0a3] mb-4">
          Create sophisticated workflows by combining text, images, and documents:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent, Prompt, Document

agent = AIAgent(model="gpt-4")

# Complex multimodal analysis
specifications = Document.from_pdf("product_specs.pdf")
photo1 = "received_item_front.jpg"
photo2 = "received_item_back.jpg"

prompt = Prompt()
prompt.add_text("Quality Control Analysis")
prompt.add_text("\\nProduct Specifications:")
prompt.add_document(specifications)
prompt.add_text("\\nReceived Item Photos:")
prompt.add_image(photo1)
prompt.add_image(photo2)
prompt.add_text("""
Please verify:
1. Does the received item match the specifications?
2. Are there any visible defects or damage?
3. Are all specified features present?
4. What is your quality assessment (Pass/Fail)?
5. Provide detailed reasoning for your assessment.
""")

response = agent.run(prompt)
print(response.content)

# Use with structured output for automated processing
from pydantic import BaseModel, Field
from typing import Literal

class QualityReport(BaseModel):
    matches_specs: bool
    visible_defects: list[str]
    missing_features: list[str]
    assessment: Literal["Pass", "Fail"]
    confidence: float = Field(..., ge=0, le=1)
    reasoning: str

agent_structured = AIAgent(
    model="claude-sonnet-4-5",
    output_schema=QualityReport
)

response = agent_structured.run(prompt)
report = response.parsed_output

if report.assessment == "Fail":
    print(f"Quality check failed: {report.reasoning}")
    print(f"Defects found: {', '.join(report.visible_defects)}")`}
          language="python"
          filename="combining_modalities.py"
        />
      </section>

      {/* Real-World Use Cases */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Real-World Use Cases</h2>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">1. Document Processing Pipeline</h3>
          <CodeBlock
            code={`from feather_ai import AIAgent, Prompt, Document
from pydantic import BaseModel
from typing import List

class DocumentSummary(BaseModel):
    title: str
    document_type: str
    key_topics: List[str]
    summary: str
    action_items: List[str]

def process_document(file_path: str) -> DocumentSummary:
    """Process any document and extract structured information."""
    agent = AIAgent(
        model="gpt-4",
        output_schema=DocumentSummary
    )

    # Load the document (works with PDF, DOCX, etc.)
    doc = Document.from_file(file_path)

    prompt = Prompt()
    prompt.add_text("Analyze this document and extract key information:")
    prompt.add_document(doc)

    response = agent.run(prompt)
    return response.parsed_output

# Process multiple documents
documents = ["contract.pdf", "proposal.docx", "report.pdf"]
summaries = [process_document(doc) for doc in documents]

for summary in summaries:
    print(f"\\n{summary.title} ({summary.document_type})")
    print(f"Topics: {', '.join(summary.key_topics)}")
    print(f"Summary: {summary.summary}")`}
            language="python"
            filename="document_pipeline.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">2. Visual Content Moderation</h3>
          <CodeBlock
            code={`from feather_ai import AIAgent, Prompt
from pydantic import BaseModel
from typing import Literal

class ModerationResult(BaseModel):
    is_safe: bool
    categories_detected: list[str]
    risk_level: Literal["low", "medium", "high"]
    explanation: str
    recommended_action: Literal["approve", "review", "reject"]

def moderate_image(image_path: str) -> ModerationResult:
    """Automatically moderate user-uploaded images."""
    agent = AIAgent(
        model="claude-sonnet-4-5",
        output_schema=ModerationResult,
        instructions="""You are a content moderation AI. Analyze images for:
        - Inappropriate content
        - Violence or gore
        - Personal information
        - Copyright violations
        - Spam or misleading content
        """
    )

    prompt = Prompt()
    prompt.add_text("Moderate this user-uploaded image:")
    prompt.add_image(image_path)

    response = agent.run(prompt)
    return response.parsed_output

# Moderate user uploads
result = moderate_image("user_upload.jpg")

if result.recommended_action == "reject":
    print(f"Image rejected: {result.explanation}")
elif result.recommended_action == "review":
    print(f"Image flagged for manual review: {result.explanation}")
else:
    print("Image approved")`}
            language="python"
            filename="content_moderation.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">3. Receipt and Invoice Scanning</h3>
          <CodeBlock
            code={`from feather_ai import AIAgent, Prompt
from pydantic import BaseModel
from typing import List
from datetime import date

class LineItem(BaseModel):
    description: str
    quantity: int
    unit_price: float
    total: float

class Receipt(BaseModel):
    merchant_name: str
    date: str
    items: List[LineItem]
    subtotal: float
    tax: float
    total: float
    payment_method: str

def scan_receipt(image_path: str) -> Receipt:
    """Extract all data from a receipt photo."""
    agent = AIAgent(
        model="gpt-4",
        output_schema=Receipt
    )

    prompt = Prompt()
    prompt.add_text("Extract all information from this receipt:")
    prompt.add_image(image_path)

    response = agent.run(prompt)
    return response.parsed_output

# Process receipt photos
receipt = scan_receipt("receipt_photo.jpg")

print(f"Merchant: {receipt.merchant_name}")
print(f"Date: {receipt.date}")
print(f"Total: ${receipt.total}")
print(f"\\nItems:")
for item in receipt.items:
    print(f"  - {item.description}: ${item.total}")

# Integrate with expense tracking
# expense_tracker.add_expense(receipt)`}
            language="python"
            filename="receipt_scanning.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-4">4. Screenshot Analysis for UI Testing</h3>
          <CodeBlock
            code={`from feather_ai import AIAgent, Prompt
from pydantic import BaseModel
from typing import List

class UIIssue(BaseModel):
    severity: str
    element: str
    description: str
    recommendation: str

class UIAnalysis(BaseModel):
    overall_quality: int  # 1-10
    issues_found: List[UIIssue]
    accessibility_concerns: List[str]
    design_suggestions: List[str]

def analyze_ui_screenshot(screenshot_path: str) -> UIAnalysis:
    """Analyze a UI screenshot for issues and improvements."""
    agent = AIAgent(
        model="claude-sonnet-4-5",
        output_schema=UIAnalysis,
        instructions="""You are a UI/UX expert. Analyze screenshots for:
        - Layout issues
        - Accessibility problems
        - Visual hierarchy
        - Spacing and alignment
        - Color contrast
        - Text readability
        """
    )

    prompt = Prompt()
    prompt.add_text("Analyze this UI screenshot:")
    prompt.add_image(screenshot_path)

    response = agent.run(prompt)
    return response.parsed_output

# Automated UI testing
analysis = analyze_ui_screenshot("app_screenshot.png")

print(f"Overall Quality: {analysis.overall_quality}/10")
print(f"\\nIssues Found: {len(analysis.issues_found)}")
for issue in analysis.issues_found:
    print(f"  [{issue.severity}] {issue.element}: {issue.description}")

print(f"\\nAccessibility Concerns:")
for concern in analysis.accessibility_concerns:
    print(f"  - {concern}")`}
            language="python"
            filename="ui_testing.py"
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
                <strong className="text-white">Image Quality Matters:</strong> Use clear, well-lit
                images for best results. Higher resolution images generally produce better analysis,
                but they're automatically resized to optimal dimensions.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#be3389] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-white">Be Specific with Instructions:</strong> When analyzing
                images or documents, provide clear, specific questions or tasks. Instead of "analyze
                this image," say "identify all text visible in this image and its location."
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#0357c1] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-white">Optimize Document Length:</strong> For very long
                documents, consider extracting relevant sections first or using page ranges to focus
                the agent's attention on specific content.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#dfa987] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-white">Combine with Structured Output:</strong> For
                production applications, use multimodal input with structured output schemas to get
                reliable, parseable results.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#22c4e0] rounded-full flex items-center justify-center text-[#0a0a0b] text-sm font-bold flex-shrink-0 mt-0.5">5</span>
              <div>
                <strong className="text-white">Test Different Models:</strong> Some models excel at
                visual tasks while others are better at text extraction. Experiment with different
                models (GPT-4, Claude Sonnet, etc.) for your specific use case.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Supported Formats Summary */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Supported File Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-3">Images</h3>
            <ul className="space-y-2 text-[#a0a0a3] text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22c4e0] rounded-full"></span>
                JPEG / JPG
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22c4e0] rounded-full"></span>
                PNG
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22c4e0] rounded-full"></span>
                GIF
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22c4e0] rounded-full"></span>
                WebP
              </li>
            </ul>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#be3389] mb-3">Documents</h3>
            <ul className="space-y-2 text-[#a0a0a3] text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#be3389] rounded-full"></span>
                PDF
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#be3389] rounded-full"></span>
                DOCX (Word)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#be3389] rounded-full"></span>
                TXT
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#be3389] rounded-full"></span>
                Markdown (MD)
              </li>
            </ul>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#0357c1] mb-3">Data Formats</h3>
            <ul className="space-y-2 text-[#a0a0a3] text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0357c1] rounded-full"></span>
                CSV
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0357c1] rounded-full"></span>
                JSON
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0357c1] rounded-full"></span>
                XML
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0357c1] rounded-full"></span>
                YAML
              </li>
            </ul>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#dfa987] mb-3">Web Formats</h3>
            <ul className="space-y-2 text-[#a0a0a3] text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfa987] rounded-full"></span>
                HTML
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfa987] rounded-full"></span>
                URLs (via add_image_url)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfa987] rounded-full"></span>
                SVG
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
