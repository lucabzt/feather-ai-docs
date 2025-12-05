import PageHeader from '../components/PageHeader';

export default function FeaturedProjects() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Featured Projects"
        subtitle="Real-world applications built with FeatherAI"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Piatto Cooks */}
        <a
          href="https://piatto-cooks.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#1a1a1c] border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg overflow-hidden transition-all hover:scale-[1.02] group"
        >
          {/* Image */}
          <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-[#be3389]/20 to-[#0357c1]/20">
            <img
              src="/feather-ai-docs/piatto.png"
              alt="Piatto Cooks"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#be3389]/20 rounded-lg flex items-center justify-center text-2xl">
                🍝
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white m-0">Piatto Cooks</h2>
                <p className="text-sm text-[#22c4e0] m-0">piatto-cooks.com →</p>
              </div>
            </div>
            <p className="text-[#a0a0a3] mb-4 leading-relaxed">
              An AI-powered cooking platform that transforms your culinary experience. Piatto uses
              FeatherAI to generate personalized recipes, provide step-by-step cooking guidance,
              and help you discover new dishes based on your preferences, dietary restrictions,
              and available ingredients.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Recipe Generation
              </span>
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Meal Planning
              </span>
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Dietary Preferences
              </span>
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Smart Ingredient Matching
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2a2a2c]">
              <p className="text-xs text-[#a0a0a3]">
                <strong className="text-white">Tech Stack:</strong> FeatherAI, GPT-4, Claude, Recipe APIs
              </p>
            </div>
          </div>
        </a>

        {/* Nexora AI */}
        <a
          href="https://nexora-ai.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#1a1a1c] border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg overflow-hidden transition-all hover:scale-[1.02] group"
        >
          {/* Image */}
          <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-[#0357c1]/20 to-[#22c4e0]/20">
            <img
              src="/feather-ai-docs/nexora-course.png"
              alt="Nexora AI"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#0357c1]/20 rounded-lg flex items-center justify-center text-2xl">
                🎓
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white m-0">Nexora AI</h2>
                <p className="text-sm text-[#22c4e0] m-0">nexora-ai.de →</p>
              </div>
            </div>
            <p className="text-[#a0a0a3] mb-4 leading-relaxed">
              An intelligent AI education platform that creates personalized learning experiences.
              Nexora leverages FeatherAI to build interactive courses, provide real-time tutoring,
              assess student understanding, and adapt content to individual learning styles and pace.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Interactive Courses
              </span>
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                AI Tutoring
              </span>
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Adaptive Learning
              </span>
              <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
                Progress Tracking
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2a2a2c]">
              <p className="text-xs text-[#a0a0a3]">
                <strong className="text-white">Tech Stack:</strong> FeatherAI, Claude, Structured Output, Multimodal AI
              </p>
            </div>
          </div>
        </a>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-[#be3389]/5 to-[#0357c1]/5 border border-[#2a2a2c] rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Built Something Cool?</h2>
        <p className="text-[#a0a0a3] mb-6 max-w-2xl mx-auto">
          If you've built a project with FeatherAI and would like to showcase it here, we'd love to hear from you!
          Share your innovation with the community and inspire others.
        </p>
        <a
          href="https://github.com/lucabzt/feather-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#be3389] to-[#0357c1] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Submit Your Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
