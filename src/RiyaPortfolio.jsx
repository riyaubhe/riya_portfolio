import { useEffect, useRef } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Caveat:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #f0ece3; --cream2: #e8e2d6; --dark: #1a1a1a;
    --charcoal: #3a3530; --muted: #8a8278; --accent: ##e879a0; --accent2: #e879a0;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--cream); color: var(--dark); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  .section-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .serif-heading { font-family: 'Playfair Display', serif; font-weight: 900; line-height: 0.95; letter-spacing: -1px; }
  .nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: var(--dark); color: var(--cream); font-size: 12px; letter-spacing: 0.06em; position: sticky; top: 0; z-index: 100; }
  .nav-side { opacity: 0.5; font-size: 11px; letter-spacing: 0.05em; }
  .nav-center-group { display: flex; align-items: center; }
  .nav-center-text { font-family: 'Playfair Display', serif; font-size: 14px; letter-spacing: 0.05em; opacity: 0.9; }
  .nav-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 24px; }
  .hero { background: var(--dark); min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 60px 60px 80px; position: relative; overflow: hidden; }
  .hero-top-label { position: absolute; top: 60px; right: 60px; font-family: 'Caveat', cursive; font-size: 22px; color: rgba(255,255,255,0.55); transform: rotate(-2deg); pointer-events: none; }
  .hero-badge { display: inline-block; border: 1px solid rgba(255,255,255,0.2); border-radius: 100px; padding: 8px 20px; font-size: 12px; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; text-transform: uppercase; width: fit-content; margin-bottom: 28px; animation: fadeUp 0.6s 0.1s both; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(80px, 14vw, 180px); font-weight: 900; line-height: 0.9; color: var(--cream); letter-spacing: -3px; animation: fadeUp 0.7s 0.25s both; }
  .hero-title-italic { font-style: italic; color: rgba(240,236,227,0.45); }
  .hero-subtitle-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 32px; animation: fadeUp 0.7s 0.4s both; }
  .hero-role { font-family: 'Playfair Display', serif; font-size: clamp(14px, 2vw, 20px); color: rgba(255,255,255,0.5); font-style: italic; max-width: 380px; line-height: 1.5; }
  .hero-cta { display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.25); border-radius: 100px; padding: 12px 28px; font-size: 12px; color: var(--cream); text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; transition: background 0.2s, border-color 0.2s; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .hero-cta:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }
  .spark { position: absolute; color: rgba(255,255,255,0.15); font-size: 22px; pointer-events: none; animation: twinkle 3s ease-in-out infinite; }

  @keyframes twinkle { 0%,100%{ opacity:0.15 } 50%{ opacity:0.5 } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .about { background: var(--cream2); padding: 100px 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-hello { font-family: 'Playfair Display', serif; font-size: clamp(56px, 8vw, 96px); font-weight: 900; line-height: 1; margin-bottom: 28px; }
  .about-text { font-size: 15px; line-height: 1.9; color: var(--charcoal); max-width: 460px; }
  .about-text strong { font-weight: 500; border-bottom: 1px solid var(--dark); }
  .about-annotation { font-family: 'Caveat', cursive; font-size: 18px; color: var(--accent); margin-top: 28px; transform: rotate(-1.5deg); display: inline-block; }
  .about-right { display: flex; flex-direction: column; gap: 28px; }
  .stats-row { display: flex; border: 1px solid rgba(0,0,0,0.1); }
  .stat-box { flex: 1; padding: 24px 20px; border-right: 1px solid rgba(0,0,0,0.1); transition: background 0.2s; cursor: default; }
  .stat-box:last-child { border-right: none; }
  .stat-box:hover { background: var(--cream); }
  .stat-big { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 6px; }
  .stat-sm { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
  .skills-section { background: var(--cream); padding: 100px 60px; }
  .skills-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 64px; gap: 40px; }
  .skills-heading { font-size: clamp(48px, 7vw, 88px); }
  .skills-note { font-family: 'Caveat', cursive; font-size: 17px; color: var(--muted); max-width: 200px; line-height: 1.5; margin-top: 16px; transform: rotate(1deg); }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.1); }
  .skill-card { background: var(--cream); padding: 40px 32px; transition: background 0.2s; }
  .skill-card:hover { background: var(--cream2); }
  .skill-num { font-family: 'Playfair Display', serif; font-size: 11px; color: var(--muted); letter-spacing: 0.1em; margin-bottom: 24px; }
  .skill-icon-big { font-size: 32px; margin-bottom: 16px; display: block; }
  .skill-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 12px; }
  .skill-body { font-size: 13px; color: var(--muted); line-height: 1.8; }
  .skill-pill-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
  .pill { border: 1px solid rgba(0,0,0,0.12); padding: 4px 11px; border-radius: 100px; font-size: 11px; color: var(--charcoal); letter-spacing: 0.05em; }
  .projects-section { background: var(--dark); padding: 100px 60px; color: var(--cream); }
  .projects-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 80px; }
  .projects-heading { font-size: clamp(56px, 9vw, 110px); color: var(--cream); }
  .projects-dot { color: var(--accent2); }
  .projects-subline { font-family: 'Caveat', cursive; font-size: 18px; color: rgba(255,255,255,0.4); max-width: 200px; text-align: right; line-height: 1.5; }
  .project-item { border-top: 1px solid rgba(255,255,255,0.1); padding: 56px 0; display: grid; grid-template-columns: 80px 1fr 1fr; gap: 40px; align-items: start; transition: background 0.2s, padding 0.2s; cursor: default; }
  .project-item:last-child { border-bottom: 1px solid rgba(255,255,255,0.1); }
  .project-item:hover { padding-left: 12px; padding-right: 12px; background: rgba(255,255,255,0.03); border-radius: 4px; }
  .proj-num { font-family: 'Playfair Display', serif; font-size: 13px; color: rgba(255,255,255,0.25); font-style: italic; padding-top: 6px; }
  .proj-category { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
  .proj-name { font-family: 'Playfair Display', serif; font-size: clamp(22px, 3vw, 34px); font-weight: 700; color: var(--cream); line-height: 1.15; margin-bottom: 20px; }
  .proj-bullets { list-style: none; }
  .proj-bullets li { font-size: 13px; color: rgba(240,236,227,0.55); line-height: 1.85; padding-left: 16px; position: relative; margin-bottom: 6px; }
  .proj-bullets li::before { content: "•"; position: absolute; left: 0; color: var(--accent2); }
  .proj-right { display: flex; flex-direction: column; gap: 20px; align-items: flex-end; padding-top: 6px; }
  .proj-tech { display: flex; flex-wrap: wrap; gap: 7px; justify-content: flex-end; }
  .proj-tag { border: 1px solid #e879a0; padding: 4px 12px; border-radius: 100px; font-size: 11px; color: #e879a0; }
  .proj-arrow-btn { width: 48px; height: 48px; border: 1px solid #e879a0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #e879a0; font-size: 20px; transition: all 0.2s; flex-shrink: 0; }
  .project-item:hover .proj-arrow-btn { border-color: var(--accent2); color: var(--accent2); }
  .education-section { background: var(--cream2); padding: 100px 60px; }
  .edu-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: start; }
  .edu-heading { font-size: clamp(52px, 8vw, 96px); margin-bottom: 28px; }
  .edu-intro { font-size: 14px; color: var(--charcoal); line-height: 1.85; max-width: 440px; margin-bottom: 28px; }
  .edu-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
  .edu-list li { display: flex; gap: 12px; font-size: 15px; color: var(--charcoal); line-height: 1.6; }
  .edu-bullet { color: var(--accent); font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .edu-muted { color: var(--muted); }
  .edu-right { display: flex; flex-direction: column; gap: 48px; }
  .edu-connect-block { background: var(--cream); border: 1px solid rgba(0,0,0,0.08); padding: 32px; }
  .edu-connect-label { font-family: 'Caveat', cursive; font-size: 16px; color: var(--accent); margin-bottom: 14px; }
  .edu-social-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .edu-social-link { display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(0,0,0,0.12); padding: 8px 18px; border-radius: 100px; font-size: 12px; color: var(--charcoal); text-decoration: none; letter-spacing: 0.05em; transition: all 0.2s; }
  .edu-social-link:hover { border-color: var(--accent); color: var(--accent); }
  .edu-portfolio-note { font-family: 'Caveat', cursive; font-size: 17px; color: var(--muted); margin-top: 20px; transform: rotate(1deg); display: inline-block; }
  .edu-langs-heading { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; margin-bottom: 20px; }
  .lang-row { display: flex; gap: 32px; padding: 14px 0; border-bottom: 1px solid rgba(0,0,0,0.08); font-size: 14px; }
  .lang-label { color: var(--muted); min-width: 70px; }
  .lang-val { color: var(--charcoal); }
  .lang-accent { color: var(--accent); }
  .contact-section { position: relative; overflow: hidden; }
  .contact-quote-page { background: var(--cream); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 60px; text-align: center; position: relative; overflow: hidden; }
  .contact-bottom-page { background: var(--cream); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 60px; gap: 28px; text-align: center; position: relative; overflow: hidden; }
  .contact-quote-block { font-family: 'Caveat', cursive; font-size: clamp(24px, 2.8vw, 34px); color: #e879a0; line-height: 1.9; max-width: 720px; text-align: center; }
  .contact-sig { font-family: 'Caveat', cursive; font-size: 32px; color: #e879a0; text-align: center; margin-top: 24px; }
  .contact-bottom { display: flex; flex-direction: column; align-items: center; gap: 20px; }
  .contact-photo-wrap { position: relative; width: 200px; height: 200px; }
  .contact-photo { width: 200px; height: 200px; border-radius: 50%; object-fit: cover; object-position: top; filter: grayscale(100%); display: block; }
  .contact-planet-ring { position: absolute; top: -18px; left: -18px; width: 236px; height: 236px; border: 2px solid #e879a0; border-radius: 50%; pointer-events: none; }
  .contact-spark1 { position: absolute; top: -10px; right: -16px; color: #e879a0; font-size: 18px; }
  .contact-spark2 { position: absolute; bottom: 8px; left: -20px; color: #e879a0; font-size: 14px; }
  .contact-thankyou { font-family: 'Playfair Display', serif; font-size: clamp(64px, 10vw, 130px); font-weight: 900; line-height: 0.95; letter-spacing: -3px; }
  .contact-getintouch { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .contact-bg-spark { position: absolute; color: #e879a0; pointer-events: none; animation: twinkle 3s ease-in-out infinite; opacity: 0.3; }
  .btn-dark:hover { background: transparent; color: var(--dark); }
  .btn-outline { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--dark); border: 1px solid rgba(0,0,0,0.2); padding: 13px 30px; border-radius: 100px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .btn-outline:hover { border-color: var(--dark); }
  .footer { background: var(--dark); padding: 28px 60px; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 0.08em; }
  @media (max-width: 900px) {
    .nav { padding: 16px 24px; }
    .hero { padding: 60px 24px 64px; }
    .about { grid-template-columns: 1fr; padding: 72px 24px; gap: 48px; }
    .skills-section { padding: 72px 24px; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .projects-section { padding: 72px 24px; }
    .project-item { grid-template-columns: 48px 1fr; }
    .proj-right { display: none; }
    .education-section { padding: 72px 24px; }
    .edu-grid { grid-template-columns: 1fr; gap: 48px; }
    .contact-section { padding: 80px 24px 100px; }
    .footer { flex-direction: column; gap: 10px; text-align: center; padding: 24px; }
  }
  @media (max-width: 600px) {
    .skills-grid { grid-template-columns: 1fr; }
    .hero-title { letter-spacing: -2px; }
    .hero-subtitle-row { flex-direction: column; gap: 24px; align-items: flex-start; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}



const PROJECTS = [
  {
    num: "01",
    category: "Data Analytics · SQL · Tableau",
    name: "Starbucks US Market\nExpansion Analysis",
    bullets: [
      "Analyzed 13,000+ US Starbucks locations against US Census demographic data using SQL to identify underserved high-income markets.",
      "Built and published an interactive Tableau dashboard visualizing store density, city concentration, and ownership patterns across all 50 states.",
      "Identified Delaware, Rhode Island, and New Hampshire as top expansion opportunities — avg income $61–69k with under 300 stores each.",
    ],
    tech: ["SQL", "Tableau", "Data Analysis"],
    link: "https://public.tableau.com/views/StarbucksUSMarketExpansionAnalysis/Dashboard1",
  },
  {
    num: "02",
    category: "Machine Learning",
    name: "Air Quality Risk Prediction\n& Trend Analysis",
    bullets: [
      "Built an end-to-end ML pipeline on real-world air quality data.",
      "Designed a normalized multi-pollutant risk score; evaluated models using ROC-AUC and F1 Score to identify high-risk periods and generate location-level insights.",
      "Implemented data preprocessing and feature engineering using scikit-learn pipelines for reproducible model training.",
    ],
    tech: ["Python", "Pandas", "NumPy", "scikit-learn"],
    link: null,
  },
  {
    num: "03",
    category: "Machine Learning · Data Analytics",
    name: "Student Dropout\nRisk Prediction",
    bullets: [
      "Built a binary classification model on 4,400+ student records to predict dropout risk, comparing Logistic Regression and Random Forest (0.93 ROC-AUC).",
      "Identified first-year academic performance as the dominant predictor of dropout — far more influential than demographics or intake-time features.",
      "Framed around proactive early-intervention insight, directly tied to experience as a CSE 205 TA and PULSE Tutoring Center Shift Lead.",
    ],
    tech: ["Python", "Scikit-Learn", "Pandas"],
    link: "https://github.com/riyaubhe/student-dropout-risk-prediction",
  }, 
  {
    num: "04",
    category: "AI / Full-Stack",
    name: "Brev\nAI Learning Assistant",
    bullets: [
      "AI-powered tool that auto-generates concise cheat sheets and adaptive quizzes from study material.",
      "Engineered an engaging React.js front-end, optimizing UX and visual flow for quick knowledge recall.",
    ],
    tech: ["React.js", "AI / LLM", "Full-Stack"],
    link: null,
  },
  {
    num: "05",
    category: "Java / Software Engineering",
    name: "Reviewer\nManagement System",
    bullets: [
      "Java-based platform managing student questions, reviews, and instructor feedback across multiple user roles.",
      "Integrated reviewer rating and profile features; developed JUnit tests covering review operations and rating calculations.",
      "Applied OOP concepts — encapsulation, classes, methods — to support robust multi-role functionality.",
    ],
    tech: ["Java", "OOP", "JUnit"],
    link: null,
  },
];
 

const EDU_LIST = [
    { text: "B.S. Computer Science, Arizona State University, Tempe", meta: "— Minor in Engineering Management" },
    { text: "Dean's List, Arizona State University", meta: "— Fall 2023 – Fall 2025" },
    { text: "NAMU Scholarship Recipient, Arizona State University", meta: "" },
    { text: "Relevant Coursework: Data Structures and Algorithms, Operating Systems, Database Management Systems, Software Engineering, Assembly Language Programming", meta: "" },
  ];


// Navigation
function Nav() {
  return (
    <nav className="nav">
      <span className="nav-side">2025</span>
      <div className="nav-center-group">
       
      </div>
      <span className="nav-side">Riya Shekhar Ubhe</span>
    </nav>
  );
}

//PAGE 1: portfolio

function Hero() {
    return (
      <section className="hero" id="hero">
        <span className="spark" style={{ top: "18%", left: "12%" }}>✦</span>
        <span className="spark" style={{ top: "30%", left: "55%", fontSize: 14, animationDelay: "0.7s" }}>✦</span>
        <span className="spark" style={{ top: "60%", left: "80%", animationDelay: "1.2s" }}>✦</span>
        <span className="spark" style={{ top: "75%", left: "25%", fontSize: 14, animationDelay: "0.4s" }}>✦</span>
        <span className="spark" style={{ top: "12%", left: "82%", animationDelay: "1.8s" }}>✦</span>
        <div style={{ flex: 1 }} />
        <div style={{ paddingLeft: "60px", paddingBottom: "80px" }}>
          <div style={{ position: "relative", marginBottom: "16px", height: "100px" }}>
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none" style={{ position: "absolute", left: "480px", top: "0px" }}>
  <path d="M 120 12 C 90 12, 45 35, 22 78" stroke="#e879a0" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  <path d="M 22 78 L 14 60" stroke="#e879a0" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  <path d="M 22 78 L 36 72" stroke="#e879a0" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
</svg>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "26px", color: "#e879a0", position: "absolute", left: "605px", top: "-15px", whiteSpace: "nowrap" }}>Riya Shekhar Ubhe</span>
          </div>
          <h1 className="hero-title" style={{ marginBottom: "24px" }}>
            Port<span className="hero-title-italic">folio</span>
          </h1>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e879a0", border: "1.5px solid #e879a0", borderRadius: "100px", padding: "8px 22px", display: "inline-block" }}>
            Computer Science + Engineering Management
          </span>
        </div>
      </section>
    );
  }
// PAGE 2: About
function About() {
    return (
      <section className="about" id="about">
        <div className="reveal" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", width: "380px", height: "480px" }}>
            <img
              src="/riya.jpeg"
              alt="Riya Shekhar Ubhe"
              style={{ width: "340px", height: "420px", objectFit: "cover", objectPosition: "top", borderRadius: "160px", filter: "grayscale(100%)", display: "block", margin: "0 auto" }}
            />
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "#e879a0", position: "absolute", top: "30px", left: "-10px", transform: "rotate(-10deg)" }}>curious ✦</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "#e879a0", position: "absolute", top: "15px", right: "-20px", transform: "rotate(8deg)" }}>detail-oriented</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "#e879a0", position: "absolute", top: "45%", left: "-50px", transform: "rotate(-5deg)" }}>motivated ✦</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "#e879a0", position: "absolute", top: "50%", right: "-40px", transform: "rotate(6deg)" }}>fast learner</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "17px", color: "#e879a0", position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%) rotate(-3deg)" }}>builder ✦</span>
            <svg style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", width: "340px", height: "450px", pointerEvents: "none" }} viewBox="0 0 340 450" fill="none">
  <ellipse cx="170" cy="225" rx="165" ry="218" stroke="#e879a0" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6"/>
</svg>
          </div>
        </div>
        <div className="reveal">
          <h2 className="about-hello">
            Hello<span style={{ color: "#e879a0" }}>.</span>
          </h2>
          <p className="about-text">
  I'm <strong>Riya Shekhar Ubhe</strong>, a junior studying{" "}
  <strong>Computer Science</strong> at Arizona State University with a minor in{" "}
  <strong>Engineering Management</strong>. I'm someone who learns best by building — trying
  things out, breaking them, fixing them, and understanding how everything works under the hood.
</p>
<p className="about-text" style={{ marginTop: 16 }}>
  Right now I'm exploring different parts of software development, from working with machine
  learning models on real datasets to building full-stack applications that people can actually
  interact with. What excites me most is seeing how an idea slowly turns into something real —
  a feature, a tool, or even a small system that solves a problem.
</p>

<p className="about-annotation" style={{ color: "#e879a0" }}>...always trying to learn something new </p>
        </div>
      </section>
    );
  }
//PAGE 3: Education
function Education() {
    return (
      <section
        className="education-section"
        id="education"
        style={{
          display: "flex",
          justifyContent: "center",  
          paddingTop: "140px",
          paddingBottom: "140px"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1500px",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "80px",
            alignItems: "start"
          }}
        >
          <div className="reveal" style={{ paddingTop: "0px" }}>
            <h2 className="serif-heading edu-heading">Education</h2>
            <p className="edu-intro">
              I'm currently a Computer Science student at <strong>Arizona State University</strong> and
              expect to graduate in 2027. Most of my coursework focuses on building a strong foundation
              in software systems, programming, and data-driven problem solving.
            </p>
  
            <ul className="edu-list">
              {EDU_LIST.map((item) => (
                <li key={item.text}>
                  <span
                    style={{
                      color: "#e879a0",
                      fontSize: "18px",
                      flexShrink: 0,
                      marginTop: "1px"
                    }}
                  >
                    •
                  </span>
                  <span>
                    {item.text} <span className="edu-muted">{item.meta}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
  
          <div
            className="reveal"
            style={{
              position: "relative",
              paddingLeft: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "48px",
              paddingTop: "16px"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "-20px",
                bottom: "-20px",
                width: "2px",
                background: "#e879a0"
              }}
            />
  
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                padding: "28px",
                background: "var(--cream)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://github.com/YOUR_USERNAME"
                  alt="GitHub QR"
                  style={{ width: "140px", height: "140px", display: "block" }}
                />
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "20px",
                    color: "#e879a0",
                    marginTop: "10px"
                  }}
                >
                  GitHub
                </p>
              </div>
  
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://linkedin.com/in/YOUR_USERNAME"
                  alt="LinkedIn QR"
                  style={{ width: "140px", height: "140px", display: "block" }}
                />
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "20px",
                    color: "#e879a0",
                    marginTop: "10px"
                  }}
                >
                  LinkedIn
                </p>
              </div>
            </div>
  
            <div>
              <h3 className="edu-langs-heading">Languages</h3>
              <div className="lang-row">
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "22px",
                    color: "#e879a0"
                  }}
                >
                  English, Hindi, Marathi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
//PAGE 4: Skills
function Skills() {
    return (
      <section className="skills-section" id="skills">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
  
          {/* LEFT */}
          <div>
            <div className="reveal">
              <h2 className="serif-heading skills-heading">Skills</h2>
            </div>
  
            <div className="reveal" style={{ marginTop: "32px", position: "relative", display: "block" }}>
              <svg style={{ position: "absolute", top: "-16px", left: "0", width: "420px", height: "110px", pointerEvents: "none" }} viewBox="0 0 420 110" fill="none">
                <ellipse cx="210" cy="55" rx="205" ry="50" stroke="#e879a0" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
              </svg>
              <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", padding: "16px 30px", alignItems: "center", justifyContent: "flex-start" }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style={{ width: 38, height: 38 }} alt="Python"/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" style={{ width: 38, height: 38 }} alt="Java"/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style={{ width: 38, height: 38 }} alt="React"/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" style={{ width: 38, height: 38 }} alt="C++"/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style={{ width: 38, height: 38 }} alt="GitHub"/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" style={{ width: 38, height: 38 }} alt="Figma"/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" style={{ width: 38, height: 38 }} alt="MATLAB"/>
              </div>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "#e879a0", position: "absolute", top: "-34px", right: "0px", transform: "rotate(3deg)", whiteSpace: "nowrap" }}>always learning ✦</p>
            </div>
  
            <div className="reveal" style={{ marginTop: "32px" }}>
              <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.9", marginBottom: "8px" }}>• Fluent in Python for data engineering, ML pipelines, and reproducible analysis</p>
              <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.9", marginBottom: "8px" }}>• Strong in object-oriented design, multi-role systems, and unit testing in Java</p>
              <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.9", marginBottom: "8px" }}>• Solid grasp of data structures and algorithms for efficient problem solving</p>
              <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.9", marginBottom: "8px" }}>• Classification models, feature engineering, and ML evaluation metrics</p>
              <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.9" }}>• Building user-friendly interfaces with React.js and modern web technologies</p>
            </div>
  
            <div className="reveal" style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
              <div>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "#e879a0", marginBottom: "12px" }}>Languages</p>
                {["Python", "Java", "C", "C++", "MATLAB"].map((s) => (
                  <p key={s} style={{ fontSize: "14px", color: "var(--charcoal)", marginBottom: "6px" }}>• {s}</p>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "#e879a0", marginBottom: "12px" }}>Frameworks</p>
                {["Pandas", "NumPy", "Scikit-Learn", "React.js"].map((s) => (
                  <p key={s} style={{ fontSize: "14px", color: "var(--charcoal)", marginBottom: "6px" }}>• {s}</p>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "#e879a0", marginBottom: "12px" }}>Tools</p>
                {["GitHub", "Figma", "Notion", "Canva", "CapCut"].map((s) => (
                  <p key={s} style={{ fontSize: "14px", color: "var(--charcoal)", marginBottom: "6px" }}>• {s}</p>
                ))}
              </div>
            </div>
          </div>
  
          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0" }}>
            <div className="reveal" style={{ background: "var(--cream2)", border: "1px solid rgba(0,0,0,0.06)", padding: "40px 36px", borderRadius: "4px" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "700", color: "var(--dark)", marginBottom: "32px" }}>Experience</p>
              <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
                <div style={{ width: "2px", background: "#e879a0", minHeight: "60px", flexShrink: 0 }}/>
                <div>
                  <p style={{ fontSize: "13px", color: "#e879a0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Teaching Assistant</p>
                  <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.7" }}>CSE 205: OOP & Data Structures</p>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>Arizona State University</p>
                  <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>Jan 2025 – May 2026</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ width: "2px", background: "#e879a0", minHeight: "60px", flexShrink: 0 }}/>
                <div>
                  <p style={{ fontSize: "13px", color: "#e879a0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Software Engineering Intern</p>
                  <p style={{ fontSize: "14px", color: "var(--charcoal)", lineHeight: "1.7" }}>Align Technology</p>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>Pune, India</p>
                  <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>Aug – Oct 2022</p>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </section>
    );
  }
//PAGE 5: Projects 
function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header reveal">
        <div>
          <div className="section-label" style={{ color: "rgba(240,236,227,0.35)" }}>
          
          </div>
          <h2 className="serif-heading projects-heading">
            Projects<span className="projects-dot">.</span>
          </h2>
        </div>
        
      </div>
      {PROJECTS.map((proj) => (
        <div className="project-item reveal" key={proj.num}>
          <div className="proj-num">{proj.num}</div>
          <div className="proj-left">
            <div className="proj-category">{proj.category}</div>
            <div className="proj-name">
              {proj.name.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </div>
            <ul className="proj-bullets">
              {proj.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="proj-right">
            <div className="proj-tech">
              {proj.tech.map((t) => (
                <span className="proj-tag" key={t}>{t}</span>
              ))}
            </div>
           {proj.link ? (
  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-arrow-btn" style={{ textDecoration: "none" }}>↗</a>
) : (
  <div className="proj-arrow-btn">↗</div>
)}
          </div>
        </div>
      ))}
    </section>
  );
}



//PAGE 5: Contact
function Contact() {
    const sparks = [
      { top: "8%",  left: "5%",  size: 40, delay: "0s"   },
      { top: "20%", left: "3%",  size: 24, delay: "0.5s" },
      { top: "45%", left: "7%",  size: 52, delay: "1s"   },
      { top: "70%", left: "4%",  size: 30, delay: "0.3s" },
      { top: "85%", left: "8%",  size: 20, delay: "1.5s" },
      { top: "10%", right: "5%", size: 36, delay: "0.8s" },
      { top: "30%", right: "3%", size: 48, delay: "0.2s" },
      { top: "60%", right: "6%", size: 28, delay: "1.2s" },
      { top: "80%", right: "4%", size: 44, delay: "0.6s" },
      { top: "92%", right: "8%", size: 22, delay: "1.8s" },
    ];
  
    return (
      <section className="contact-section" id="contact">
  
        {/* PAGE 1 — Quote */}
        <div className="contact-quote-page">
          {sparks.map((s, i) => (
            <span key={i} className="contact-bg-spark"
              style={{ top: s.top, left: s.left, right: s.right, fontSize: s.size, animationDelay: s.delay }}>
              ✦
            </span>
          ))}
          <div className="contact-quote-block reveal">
            <p>While I may be a junior with limited experience, I'm overflowing with passion for building and a drive to learn and grow. I'm not afraid to bring fresh perspectives and creativity to the table, and I'm committed to constantly improving my skills.</p>
            <br />
            <p>I know it may be a challenge to take a chance on me, but I believe that with my potential and dedication, I can become the best engineer you could hire.</p>
          </div>
          <div className="contact-sig reveal">Riya Shekhar Ubhe</div>
        </div>
  
        {/* PAGE 2 — Thank you */}
        <div className="contact-bottom-page">
          {sparks.map((s, i) => (
            <span key={`b${i}`} className="contact-bg-spark"
              style={{ top: s.top, left: s.left, right: s.right, fontSize: s.size, animationDelay: s.delay }}>
              ✦
            </span>
          ))}
          <div className="contact-bottom reveal">
            <div className="contact-photo-wrap">
              <img src="/pic.jpeg" alt="Riya" className="contact-photo" />
              <div className="contact-planet-ring" />
              <span className="contact-spark1">✦</span>
              <span className="contact-spark2">✦</span>
            </div>
            <div className="contact-thankyou">Thank you</div>
            <div>
              <div className="contact-getintouch">Get in touch:</div>
              <a href="mailto:riyaubhe@gmail.com" style={{ fontSize: "14px", color: "var(--charcoal)", textDecoration: "none", borderBottom: "1px solid var(--charcoal)" }}>
                riyaubhe@gmail.com
              </a>
            </div>
          </div>
        </div>
  
      </section>
    );
  }
// Footer
function Footer() {
    return (
      <footer className="footer">
        <span>Riya Shekhar Ubhe</span>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", color: "#e879a0" }}>
          built with curiosity ✦
        </span>
        <span>Portfolio</span>
      </footer>
    );
  }
// ROOT: App
export default function App() {
  useReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <Nav />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
