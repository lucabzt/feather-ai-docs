import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TableOfContents() {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Wait for content to render, then extract all h2 headings
    const timer = setTimeout(() => {
      const mainContent = document.querySelector('main');
      if (!mainContent) return;

      const headings = mainContent.querySelectorAll('h2');
      const sectionData = Array.from(headings).map((heading, index) => {
        // Create an ID from the heading text if it doesn't have one
        if (!heading.id) {
          heading.id = heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }

        return {
          id: heading.id,
          text: heading.textContent,
          offsetTop: heading.offsetTop
        };
      });

      setSections(sectionData);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Track active section on scroll
  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Don't render if there are no sections or only one section
  if (sections.length <= 1) return null;

  return (
    <div className="hidden xl:block sticky top-24 w-64 self-start shrink-0">
      <div className="bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#2a2a2c] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
          On This Page
        </h3>
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left w-full text-sm transition-colors duration-200 hover:text-[#22c4e0] ${
                    activeSection === section.id
                      ? 'text-[#22c4e0] font-medium'
                      : 'text-[#a0a0a3]'
                  }`}
                >
                  {section.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
