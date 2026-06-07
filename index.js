// Complete Interactive Persona details matching Yusuf's developer states
const personas = {
    expensive: {
        name: "Yusuf: The Executive",
        title: "Kento Nanami Vibe",
        quote: "\"Freelance work is nothing but a set of transactions. Let's do this efficiently, with zero wasted motion, and go home on time.\"",
        tagline: "Immediate Delivery, Absolute Masterclass, Flawless Code.",
        price: "$15,000",
        condition: "FAST + HIGH QUALITY = EXPENSIVE",
        accent: "45, 100%, 55%", // Gold
        features: [
            "100% test coverage guaranteed",
            "Next.js App Router Architecture",
            "Sleek custom micro-interactions",
            "Premium SEO & automated setups",
            "Delivered inside 72 business hours",
            "Surgical clean vanilla code"
        ]
    },
    slow: {
        name: "Yusuf: The Titan",
        title: "Murasakibara/Aomine Vibe",
        quote: "\"Writing clean code is too easy. I'll build you a system that scales to millions of users... whenever I wake up from my nap.\"",
        tagline: "Unmatched Technical Genius, Masterful Execution, Heavy Delay.",
        price: "$2,500",
        condition: "HIGH QUALITY + CHEAP = SLOW",
        accent: "275, 100%, 60%", // Purple
        features: [
            "Advanced system architecture",
            "Distributed tracing & O11y setup",
            "Multi-tenant database schema",
            "Unbeatable code optimization",
            "Delivery time: When it's ready",
            "Nap-friendly deadlines"
        ]
    },
    cheap: {
        name: "Yusuf: The Underdog",
        title: "Yamcha Vibe",
        quote: "\"Yeah, I can build that entire Web App in 6 hours! Don't look too closely at the database schema, but hey, it runs!\"",
        tagline: "Blazing Fast Delivery, Comically Cheap, Extremely Fragile.",
        price: "$350",
        condition: "FAST + CHEAP = LOW QUALITY",
        accent: "145, 100%, 50%", // Green
        features: [
            "Fully working interface",
            "Ready-made templates",
            "Basic Tailwind utility classes",
            "Deployed immediately on Vercel",
            "Breaks at first high-volume contact",
            "No test files included (we vibe)"
        ]
    }
};

// Hero branding text overlays for the intro and persona states
const heroBranding = {
    intro: {
        badge: "The Freelance Iron Triangle",
        title: "Choose Your Developer",
        subtitle: "Select one of my three active developer states. Balancing Speed, Cost, and Difficulty is an iron law of engineering. Pick your build to review rates and deployment parameters."
    },
    expensive: {
        badge: "Fast + High Quality = Expensive",
        title: "Yusuf: The Executive",
        subtitle: "The ultimate elite developer state. Delivers exceptional, production-grade, bulletproof systems inside 72 hours. Built with clinical precision for high-stakes projects."
    },
    slow: {
        badge: "High Quality + Cheap = Slow",
        title: "Yusuf: The Titan",
        subtitle: "Unmatched system architecture and raw engineering power, executed completely at his own pace. Best for long-term strategic systems where bulletproof scaling is essential."
    },
    cheap: {
        badge: "Fast + Cheap = Budget",
        title: "Yusuf: The Underdog",
        subtitle: "Blazing fast, raw development on a shoestring budget. Ideal for validating minimum viable products, immediate Vercel prototypes, and rapid interactive concept demos."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.split-panel');
    const mangaSelector = document.getElementById('manga-selector');
    const consoleArea = document.getElementById('details-console');
    const consoleTitle = document.getElementById('console-title');
    const consoleVibe = document.getElementById('console-vibe');
    const consoleQuote = document.getElementById('console-quote');
    const consoleDesc = document.getElementById('console-desc');
    const consolePrice = document.getElementById('console-price');
    const consoleCondition = document.getElementById('console-condition');
    const featureList = document.getElementById('feature-list');
    const root = document.documentElement;

    const line1 = document.getElementById('brush-line-1');
    const line2 = document.getElementById('brush-line-2');

    // Header elements to morph
    const heroBadge = document.querySelector('.hero-title-area .badge');
    const heroH1 = document.querySelector('.hero-title-area h1');
    const heroSubtitle = document.querySelector('.hero-title-area .hero-subtitle');

    // Divider coordinates for different states
    const dividerPaths = {
        intro: {
            line1: "M 360 -20 Q 330 275, 300 570",
            line2: "M 690 -20 Q 660 275, 630 570"
        },
        expensive: {
            line1: "M 600 -20 Q 560 275, 520 570",
            line2: "M 800 -20 Q 780 275, 760 570"
        },
        slow: {
            line1: "M 200 -20 Q 180 275, 160 570",
            line2: "M 800 -20 Q 820 275, 840 570"
        },
        cheap: {
            line1: "M 200 -20 Q 180 275, 160 570",
            line2: "M 400 -20 Q 420 275, 440 570"
        }
    };

    // Helper to fade & transition the hero heading text
    function updateHeroBranding(state) {
        const branding = heroBranding[state];
        const heroSection = document.querySelector('.hero-title-area');
        if (!branding || !heroSection) return;

        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(-5px)';

        setTimeout(() => {
            if (heroBadge) heroBadge.textContent = branding.badge;
            if (heroH1) heroH1.textContent = branding.title;
            if (heroSubtitle) heroSubtitle.textContent = branding.subtitle;

            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
    }

    // Helper to collapse and reset selectors back to neutral balanced split
    function resetToIntro() {
        panels.forEach(p => p.classList.remove('active'));
        
        if (mangaSelector) {
            mangaSelector.className = 'split-screen-selector';
        }

        if (line1 && line2) {
            line1.setAttribute('d', dividerPaths.intro.line1);
            line2.setAttribute('d', dividerPaths.intro.line2);
        }

        // Collapse console
        if (consoleArea) {
            consoleArea.classList.remove('active');
        }

        // Morph header text back to intro instructions
        updateHeroBranding('intro');

        // Reset accent color variables
        root.style.setProperty('--accent-color', 'hsl(45, 100%, 55%)'); // Gold default
    }

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const personaId = panel.getAttribute('data-persona');
            const data = personas[personaId];

            if (!data) return;

            // If the user clicks on the already active panel, reset to intro state
            if (panel.classList.contains('active')) {
                resetToIntro();
                return;
            }

            // Update active panel class
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');

            // Set parent container state class
            if (mangaSelector) {
                mangaSelector.className = `split-screen-selector state-${personaId}`;
            }

            // Update SVG dividers
            if (line1 && line2 && dividerPaths[personaId]) {
                line1.setAttribute('d', dividerPaths[personaId].line1);
                line2.setAttribute('d', dividerPaths[personaId].line2);
            }

            // Apply selected accent colors to :root
            root.style.setProperty('--accent-color', `hsl(${data.accent})`);
            root.style.setProperty('--accent-glow', `hsla(${data.accent}, 0.15)`);

            // Morph header section text to match selected developer persona
            updateHeroBranding(personaId);

            // Populate and slide open details console
            if (consoleArea) {
                // If it's already open, do a content cross-fade transition
                if (consoleArea.classList.contains('active')) {
                    const consoleLeft = document.querySelector('.console-left');
                    const consoleRight = document.querySelector('.console-right');
                    
                    if (consoleLeft) consoleLeft.style.opacity = '0';
                    if (consoleRight) consoleRight.style.opacity = '0';

                    setTimeout(() => {
                        populateConsole(data);
                        if (consoleLeft) consoleLeft.style.opacity = '1';
                        if (consoleRight) consoleRight.style.opacity = '1';
                    }, 250);
                } else {
                    // Populate and trigger slide-down expansion
                    populateConsole(data);
                    consoleArea.classList.add('active');
                }
            }
        });
    });

    // Sub-helper to populate console values
    function populateConsole(data) {
        if (consoleTitle) consoleTitle.textContent = data.name;
        if (consoleVibe) consoleVibe.textContent = data.title;
        if (consoleQuote) consoleQuote.textContent = data.quote;
        if (consoleDesc) consoleDesc.textContent = data.tagline;
        if (consolePrice) consolePrice.innerHTML = `${data.price}<span>/project</span>`;
        if (consoleCondition) consoleCondition.textContent = data.condition;

        if (featureList) {
            featureList.innerHTML = '';
            data.features.forEach(feat => {
                const li = document.createElement('li');
                li.className = 'feature-item';
                li.textContent = feat;
                featureList.appendChild(li);
            });
        }
    }

    // Connect navigation link "Choose Persona" to act as a layout reset trigger
    const choosePersonaNavBtn = document.querySelector('nav a');
    if (choosePersonaNavBtn) {
        choosePersonaNavBtn.addEventListener('click', (e) => {
            // Only reset if we are on the main landing or not linking elsewhere
            if (mangaSelector && (mangaSelector.className !== 'split-screen-selector')) {
                e.preventDefault();
                resetToIntro();
            }
        });
    }
});
