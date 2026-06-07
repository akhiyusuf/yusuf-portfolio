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
    const extendedArea = document.getElementById('extended-portfolio');
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

    // Active selection tracking
    let selectedPersona = null;

    // Divider coordinates for different states
    const dividerPaths = {
        intro: {
            line1: "M 360 -20 Q 330 275, 300 570",
            line2: "M 690 -20 Q 660 275, 630 570"
        },
        hover_expensive: {
            line1: "M 500 -20 Q 460 275, 420 570",
            line2: "M 750 -20 Q 730 275, 710 570"
        },
        hover_slow: {
            line1: "M 250 -20 Q 230 275, 210 570",
            line2: "M 750 -20 Q 770 275, 790 570"
        },
        hover_cheap: {
            line1: "M 250 -20 Q 230 275, 210 570",
            line2: "M 500 -20 Q 520 275, 540 570"
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
        selectedPersona = null;
        panels.forEach(p => p.classList.remove('active'));
        
        if (mangaSelector) {
            mangaSelector.className = 'split-screen-selector';
        }

        if (line1 && line2) {
            line1.setAttribute('d', dividerPaths.intro.line1);
            line2.setAttribute('d', dividerPaths.intro.line2);
        }

        // Collapse console and hide extended portfolio
        if (consoleArea) {
            consoleArea.classList.remove('active');
        }
        if (extendedArea) {
            extendedArea.classList.remove('active');
        }

        // Morph header text back to intro instructions
        updateHeroBranding('intro');

        // Reset accent color variables
        root.style.setProperty('--accent-color', 'hsl(45, 100%, 55%)'); // Gold default
    }

    panels.forEach(panel => {
        const personaId = panel.getAttribute('data-persona');
        const selectBtn = panel.querySelector('.select-persona-btn');

        // Desktop Hover triggers
        panel.addEventListener('mouseenter', () => {
            const isMobile = window.innerWidth <= 968;
            if (isMobile) return;
            
            if (mangaSelector) {
                mangaSelector.className = `split-screen-selector hover-${personaId}`;
            }
            if (line1 && line2 && dividerPaths[`hover_${personaId}`]) {
                line1.setAttribute('d', dividerPaths[`hover_${personaId}`].line1);
                line2.setAttribute('d', dividerPaths[`hover_${personaId}`].line2);
            }
        });

        panel.addEventListener('mouseleave', () => {
            const isMobile = window.innerWidth <= 968;
            if (isMobile) return;
            
            if (mangaSelector) {
                mangaSelector.className = 'split-screen-selector';
            }
            if (line1 && line2) {
                line1.setAttribute('d', dividerPaths.intro.line1);
                line2.setAttribute('d', dividerPaths.intro.line2);
            }
        });

        // Trigger locking and full selection
        const triggerSelection = (e) => {
            if (e) e.stopPropagation(); // Avoid event bubble loop
            const data = personas[personaId];

            if (!data) return;

            // If the user clicks the active locked panel, unlock it and reset to intro
            if (selectedPersona === personaId) {
                resetToIntro();
                return;
            }

            selectedPersona = personaId;

            // Update active panel class
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');

            const isMobile = window.innerWidth <= 968;

            // On mobile, set parent class to state-persona to expand active card
            // On desktop, do NOT warp layouts (keep className clean and SVG lines balanced)
            if (mangaSelector) {
                if (isMobile) {
                    mangaSelector.className = `split-screen-selector state-${personaId}`;
                } else {
                    mangaSelector.className = 'split-screen-selector';
                }
            }

            // On mobile, SVG is hidden anyway. On desktop, reset SVG lines to balanced intro state positions
            if (line1 && line2) {
                line1.setAttribute('d', dividerPaths.intro.line1);
                line2.setAttribute('d', dividerPaths.intro.line2);
            }

            // Apply selected accent colors to :root variables
            root.style.setProperty('--accent-color', `hsl(${data.accent})`);
            root.style.setProperty('--accent-glow', `hsla(${data.accent}, 0.15)`);

            // Morph header section text to match selected developer persona
            updateHeroBranding(personaId);

            // Populate and slide open details console & extended portfolio sections
            if (consoleArea) {
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
                    populateConsole(data);
                    consoleArea.classList.add('active');
                    if (extendedArea) {
                        extendedArea.classList.add('active');
                    }
                }

                // Smoothly slide down viewport focus to console details
                setTimeout(() => {
                    consoleArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        };

        // Desktop action: trigger selection only when clicking the action button
        if (selectBtn) {
            selectBtn.addEventListener('click', triggerSelection);
        }

        // Mobile action: tap anywhere on the panel cards since buttons can be tiny
        panel.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 968;
            if (!isMobile) return;

            // If the tap was directly on the select button, select immediately!
            if (e.target.classList.contains('select-persona-btn')) {
                triggerSelection(e);
                return;
            }

            if (selectedPersona) {
                // If already selected, clicking the active panel can reset it
                if (selectedPersona === personaId) {
                    resetToIntro();
                } else {
                    triggerSelection(e);
                }
                return;
            }

            // Preview state toggle for mobile (simulates hover)
            if (mangaSelector.classList.contains(`hover-${personaId}`)) {
                // Second tap on the same card triggers full selection
                triggerSelection(e);
            } else {
                // First tap: preview/expand this card, shrink others
                mangaSelector.className = `split-screen-selector hover-${personaId}`;
                // Set the SVG lines just in case (though hidden on mobile)
                if (line1 && line2 && dividerPaths[`hover_${personaId}`]) {
                    line1.setAttribute('d', dividerPaths[`hover_${personaId}`].line1);
                    line2.setAttribute('d', dividerPaths[`hover_${personaId}`].line2);
                }
                e.stopPropagation();
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
            if (mangaSelector && (mangaSelector.className !== 'split-screen-selector')) {
                e.preventDefault();
                resetToIntro();
            }
        });
    }
});
