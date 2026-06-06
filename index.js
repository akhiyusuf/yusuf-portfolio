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

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.persona-card');
    const consoleTitle = document.getElementById('console-title');
    const consoleVibe = document.getElementById('console-vibe');
    const consoleQuote = document.getElementById('console-quote');
    const consoleDesc = document.getElementById('console-desc');
    const consolePrice = document.getElementById('console-price');
    const consoleCondition = document.getElementById('console-condition');
    const featureList = document.getElementById('feature-list');
    const root = document.documentElement;

    // Set transition delay for stat fills on initial load
    setTimeout(() => {
        document.querySelectorAll('.stat-fill').forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        });
    }, 150);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const personaId = card.getAttribute('data-persona');
            const data = personas[personaId];

            if (!data) return;

            // Update active card class
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Apply selected accent colors to :root
            root.style.setProperty('--accent-color', `hsl(${data.accent})`);
            root.style.setProperty('--accent-glow', `hsla(${data.accent}, 0.15)`);

            // Update details console content with fade effect
            const consoleArea = document.querySelector('.details-console');
            consoleArea.style.opacity = '0.3';
            consoleArea.style.transform = 'translateY(5px)';

            setTimeout(() => {
                consoleTitle.textContent = data.name;
                consoleVibe.textContent = data.title;
                consoleQuote.textContent = data.quote;
                consoleDesc.textContent = data.tagline;
                consolePrice.innerHTML = `${data.price}<span>/project</span>`;
                consoleCondition.textContent = data.condition;

                // Build feature list items dynamically
                featureList.innerHTML = '';
                data.features.forEach(feat => {
                    const li = document.createElement('li');
                    li.className = 'feature-item';
                    li.textContent = feat;
                    featureList.appendChild(li);
                });

                consoleArea.style.opacity = '1';
                consoleArea.style.transform = 'translateY(0)';
            }, 250);
        });
    });
});
