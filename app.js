// ===================================
// THEME MANAGER - Gestione Dark Mode
// ===================================
class ThemeManager {
    constructor() {
        this.root = document.documentElement;
        this.body = document.body;
        this.storageKey = 'theme';
        this.toggleBtn = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.observeSystemPreference();
    }

    toggle() {
        const isDark = this.body.classList.contains('dark');
        isDark ? this.setLight() : this.setDark();
    }

    setDark() {
        this.root.classList.add('dark');
        this.body.classList.add('dark');
        localStorage.setItem(this.storageKey, 'dark');
    }

    setLight() {
        this.root.classList.remove('dark');
        this.body.classList.remove('dark');
        localStorage.setItem(this.storageKey, 'light');
    }

    observeSystemPreference() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            const stored = localStorage.getItem(this.storageKey);
            // Applica solo se l'utente non ha fatto una scelta manuale
            if (!stored) {
                e.matches ? this.setDark() : this.setLight();
            }
        });
    }
}

// ===================================
// DATABASE LEZIONI
// ===================================
const lessonsDB = {
    1: {
        title: "01. Introduzione",
        subtitle: "Analisi Dimensionale",
        date: "10/11/2025",
        filename: "01_intro.txt",
        description: "Definizione del vocabolario della fisica, Sistema Internazionale (SI) e analisi dimensionale.",
        content: `
            <header class="mb-12 border-b-2 border-black dark:border-gray-400 pb-6">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black dark:text-gray-100">01. Introduzione</h1>
                <div class="text-sm text-gray-600 dark:text-gray-400">Data: 10/11/2025</div>
            </header>
            <article class="space-y-6 text-justify dark:text-gray-200">
                <p>In questa lezione introduttiva, definiamo le grandezze fisiche fondamentali e le loro unità di misura.</p>
                <h2 class="text-xl font-bold uppercase mt-8 mb-4 border-b border-gray-300 dark:border-gray-600 pb-1 text-black dark:text-gray-100">Analisi Dimensionale</h2>
                <p>Ogni grandezza fisica $G$ può essere espressa in termini di grandezze fondamentali:</p>
                <div class="formula-block py-2">$$ [G] = L^a M^b T^c $$</div>
                <p>Questa notazione è fondamentale per verificare la correttezza dimensionale delle formule fisiche.</p>
            </article>
        `
    },
    2: {
        title: "02. Cinematica",
        subtitle: "Del Punto Materiale",
        date: "12/11/2025",
        filename: "02_cinematica.txt",
        description: "Posizione, velocità e accelerazione. Moto rettilineo uniforme e uniformemente accelerato.",
        content: `
            <header class="mb-12 border-b-2 border-black dark:border-gray-400 pb-6">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black dark:text-gray-100">02. Cinematica</h1>
                <div class="text-sm text-gray-600 dark:text-gray-400">Data: 12/11/2025</div>
            </header>
            <article class="space-y-6 text-justify dark:text-gray-200">
                <p>Descriviamo il moto indipendentemente dalle cause. L'equazione oraria fondamentale per il moto uniformemente accelerato è:</p>
                <div class="formula-block py-2">$$ x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2 $$</div>
                <p>Da cui deriviamo la velocità come derivata della posizione rispetto al tempo: $v(t) = \\frac{dx}{dt}$.</p>
            </article>
        `
    },
    3: {
        title: "03. Dinamica",
        subtitle: "I Principi",
        date: "15/11/2025",
        filename: "03_dinamica.txt",
        description: "I tre principi di Newton, F=ma, diagrammi di corpo libero e piano inclinato.",
        content: `
            <header class="mb-12 border-b-2 border-black dark:border-gray-400 pb-6">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black dark:text-gray-100">03. I Principi della Dinamica</h1>
                <div class="text-sm text-gray-600 dark:text-gray-400">Data: 15/11/2025</div>
            </header>
            <article class="space-y-6 text-justify dark:text-gray-200">
                <p>La dinamica studia le cause del moto. Il secondo principio di Newton è la chiave di volta della meccanica classica:</p>
                <div class="formula-block py-2">$$ \\vec{F} = m \\cdot \\vec{a} $$</div>
                
                <h2 class="text-xl font-bold uppercase mt-10 mb-4 border-b border-gray-300 dark:border-gray-600 pb-1 text-black dark:text-gray-100">Esempio: Piano Inclinato</h2>
                <div class="my-8 border border-black dark:border-gray-400 p-4 flex justify-center bg-white dark:bg-gray-800">
                    <svg width="100%" height="250" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                            </marker>
                        </defs>
                        <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" stroke-width="2" />
                        <line x1="50" y1="200" x2="350" y2="50" stroke="currentColor" stroke-width="2" />
                        <path d="M 100 200 Q 110 190 120 187" stroke="currentColor" fill="none" />
                        <text x="130" y="195" font-family="Courier New" font-size="14" fill="currentColor">θ</text>
                        <rect x="180" y="115" width="40" height="40" transform="rotate(-26.5 200 135)" fill="white" stroke="currentColor" stroke-width="2"/>
                        <text x="195" y="140" font-family="Courier New" font-size="14" font-weight="bold" fill="currentColor">m</text>
                        <line x1="200" y1="135" x2="200" y2="210" stroke="currentColor" stroke-width="2" marker-end="url(#arrowhead)" />
                        <text x="205" y="225" font-family="Courier New" font-size="14" fill="currentColor">P</text>
                    </svg>
                </div>
                <p>L'accelerazione lungo il piano (senza attrito) è $a = g \\sin(\\theta)$.</p>
            </article>
        `
    },
    4: {
        title: "04. Energia",
        subtitle: "Lavoro e Potenza",
        date: "18/11/2025",
        filename: "04_energia.txt",
        description: "Lavoro, energia cinetica, forze conservative ed energia potenziale.",
        content: `
            <header class="mb-12 border-b-2 border-black dark:border-gray-400 pb-6">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black dark:text-gray-100">04. Lavoro ed Energia</h1>
                <div class="text-sm text-gray-600 dark:text-gray-400">Data: 18/11/2025</div>
            </header>
            <article class="space-y-6 text-justify dark:text-gray-200">
                <p>Il lavoro compiuto da una forza costante è il prodotto scalare tra forza e spostamento.</p>
                <div class="formula-block py-2">$$ W = \\vec{F} \\cdot \\vec{d} = F d \\cos(\\theta) $$</div>
                <p>Questo concetto ci porta al teorema dell'energia cinetica: $W = \\Delta K$.</p>
            </article>
        `
    }
};

// ===================================
// ROUTER - Gestione Navigazione SPA
// ===================================
class Router {
    constructor() {
        this.views = {
            landing: document.getElementById('view-landing'),
            index: document.getElementById('view-index'),
            lesson: document.getElementById('view-lesson')
        };
        this.currentLessonId = null;
        this.init();
    }

    init() {
        this.populateIndex();
        this.setupEventDelegation();
    }

    setupEventDelegation() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.nav-btn');
            if (!btn) return;

            const route = btn.dataset.route;
            const lessonId = btn.dataset.lessonId;

            if (route === 'landing') this.goToLanding();
            else if (route === 'index') this.goToIndex();
            else if (route === 'lesson') this.goToLesson(lessonId);
        });
    }

    populateIndex() {
        const container = document.getElementById('lessons-list-container');
        let html = '';

        for (const id in lessonsDB) {
            const lesson = lessonsDB[id];
            html += `
                <article class="group">
                    <header>
                        <h3 class="text-2xl font-bold mb-1">
                            <button class="nav-btn standard-link" data-route="lesson" data-lesson-id="${id}">
                                ${lesson.title}
                            </button>
                        </h3>
                        <div class="arrow-deco text-lg mb-2">▼</div>
                        <div class="text-gray-500 dark:text-gray-400 text-sm mb-4 font-medium">Pubblicato il: ${lesson.date}</div>
                    </header>
                    <div class="mb-3 dark:text-gray-300"><p>${lesson.description}</p></div>
                    <footer>
                        <button class="nav-btn text-sm font-bold uppercase tracking-wide standard-link" data-route="lesson" data-lesson-id="${id}">
                            [ Leggi ]
                        </button>
                    </footer>
                </article>
            `;
        }

        container.innerHTML = html;
    }

    hideAll() {
        Object.values(this.views).forEach(view => {
            view.classList.remove('active');
        });
    }

    goToLanding() {
        this.hideAll();
        this.views.landing.classList.add('active');
        window.scrollTo(0, 0);
    }

    goToIndex() {
        this.hideAll();
        this.views.index.classList.add('active');
        window.scrollTo(0, 0);
    }

    goToLesson(idInput) {
        const id = parseInt(idInput);
        const lesson = lessonsDB[id];

        if (!lesson) {
            console.warn(`Lezione ${id} non trovata`);
            return;
        }

        this.currentLessonId = id;

        const container = document.getElementById('lesson-content-container');
        container.innerHTML = lesson.content;
        document.getElementById('lesson-breadcrumbs-id').textContent = lesson.filename;

        // Renderizza KaTeX
        if (window.renderMathInElement) {
            renderMathInElement(container, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ],
                throwOnError: false
            });
        }

        this.renderNavigation(id);
        this.hideAll();
        this.views.lesson.classList.add('active');
        window.scrollTo(0, 0);
    }

    renderNavigation(id) {
        const prevContainer = document.getElementById('nav-prev-container');
        const nextContainer = document.getElementById('nav-next-container');
        const prevId = id - 1;
        const nextId = id + 1;

        if (lessonsDB[prevId]) {
            prevContainer.innerHTML = `
                <span class="block text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Precedente</span>
                <button class="nav-btn standard-link font-bold text-sm md:text-base" data-route="lesson" data-lesson-id="${prevId}">
                    ← ${lessonsDB[prevId].title}
                </button>
            `;
        } else {
            prevContainer.innerHTML = `
                <span class="block text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Indice</span>
                <button class="nav-btn standard-link font-bold text-sm md:text-base" data-route="index">
                    ← Torna all'Indice
                </button>
            `;
        }

        if (lessonsDB[nextId]) {
            nextContainer.innerHTML = `
                <span class="block text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Successiva</span>
                <button class="nav-btn standard-link font-bold text-sm md:text-base" data-route="lesson" data-lesson-id="${nextId}">
                    ${lessonsDB[nextId].title} →
                </button>
            `;
        } else {
            nextContainer.innerHTML = `
                <span class="block text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">Fine Corso</span>
                <span class="text-gray-300 dark:text-gray-600 cursor-not-allowed font-bold text-sm md:text-base">
                    Nessuna lezione successiva
                </span>
            `;
        }
    }
}

// ===================================
// INIZIALIZZAZIONE APP
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new Router();
});
