import { useEffect, useState } from "react";
import {
  Sparkles,
  Zap,
  MapPin,
  ChevronDown,
  Search,
  Utensils,
  House,
  UsersRound,
  Music,
  MessageSquare,
} from "lucide-react";
import "./Hero.css";

const categories = [
  { label: "Eat & Drink", Icon: Utensils },
  { label: "Apartments", Icon: House },
  { label: "Services", Icon: UsersRound },
  { label: "Events", Icon: Music },
];

export default function Hero() {
  const fullText = "Find Nearby Coffee Spots";
  const [headline, setHeadline] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  // Typewriter text animation
  useEffect(() => {
    let index = 0;
    let deleting = false;
    let timer;

    function typeText() {
      if (!deleting) {
        index++;
        setHeadline(fullText.slice(0, index));

        if (index >= fullText.length) {
          deleting = true;
          timer = setTimeout(typeText, 2200);
          return;
        }

        timer = setTimeout(typeText, 85);
      } else {
        index--;
        setHeadline(fullText.slice(0, index));

        if (index <= 0) {
          deleting = false;
          timer = setTimeout(typeText, 450);
          return;
        }

        timer = setTimeout(typeText, 35);
      }
    }

    timer = setTimeout(typeText, 300);

    return () => clearTimeout(timer);
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    const searchTerms = [keyword.trim(), location.trim(), category].filter(
      Boolean,
    );

    setMessage(
      searchTerms.length
        ? `Searching for: ${searchTerms.join(" · ")}`
        : "Please enter a keyword, location, or category.",
    );
  }

  function selectCategory(name) {
    setCategory(name);
    setMessage(`${name} category selected.`);
  }

  return (
    <main className="hero-section">
      <div className="hero-dark-overlay" />

      <div className="hero-container">
        <div className="hero-title-wrap">
          <h1 className="hero-title">
            {headline}
            <span className="typing-cursor">|</span>
          </h1>
        </div>

        <p className="hero-subtitle">
          Explore top-rated attractions, activities and more!
        </p>

        <form className="hero-search-bar" onSubmit={handleSearch}>
          <div className="hero-search-field ai-search-field">
            <Sparkles className="sparkles-icon" size={23} />

            <input
              type="text"
              placeholder="AI Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              aria-label="AI Search"
            />

            <span className="ai-zap">
              <Zap size={18} fill="white" />
            </span>
          </div>

          <div className="hero-search-field location-search-field">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Location"
            />

            <MapPin
              className="search-field-icon"
              size={20}
              fill="currentColor"
            />
          </div>

          <div className="hero-search-field category-search-field">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Category"
            >
              <option value="">Category</option>
              <option value="Eat & Drink">Eat & Drink</option>
              <option value="Apartments">Apartments</option>
              <option value="Services">Services</option>
              <option value="Events">Events</option>
            </select>

            <ChevronDown className="category-chevron" size={20} />
          </div>

          <button type="submit" className="hero-search-button">
            <Search className="mobile-search-icon" size={19} />
            Search
          </button>
        </form>

        {message && (
          <div className="hero-search-message" role="status">
            {message}
          </div>
        )}

        <div className="featured-categories">
          <p className="featured-title">Or browse featured categories:</p>

          <div className="featured-pills">
            {categories.map(({ label, Icon }) => (
              <button
                type="button"
                className={`featured-pill ${
                  category === label ? "featured-pill-selected" : ""
                }`}
                key={label}
                onClick={() => selectCategory(label)}
              >
                <Icon size={25} strokeWidth={1.5} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="floating-chat-button"
        aria-label="Open chat"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <MessageSquare size={35} strokeWidth={1.8} />
        <span className="chat-lines">
          <span />
          <span />
        </span>
      </button>

      {chatOpen && (
        <div className="chat-popup">
          <strong>Welcome to Listeo!</strong>
          <p>How can we help you today?</p>
          <button onClick={() => setChatOpen(false)}>Close chat</button>
        </div>
      )}
    </main>
  );
}
