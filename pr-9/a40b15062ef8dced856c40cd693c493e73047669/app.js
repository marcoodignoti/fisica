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
        this.loadSavedTheme();
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.observeSystemPreference();
    }

    loadSavedTheme() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored === 'dark') {
            this.setDark();
        } else if (stored === 'light') {
            this.setLight();
        } else {
            // If no preference is stored, use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            prefersDark ? this.setDark() : this.setLight();
        }
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
// MARKDOWN LOADER - Dynamic Content Loading
// ===================================
class MarkdownLoader {
    constructor() {
        this.lessonsManifest = null;
        this.lessonsDB = {};
        this.cache = new Map();
    }

    async loadManifest() {
        if (this.lessonsManifest) return this.lessonsManifest;
        
        try {
            const response = await fetch('lessons/lessons.json');
            if (!response.ok) throw new Error('Failed to load lessons manifest');
            this.lessonsManifest = await response.json();
            
            // Build lessonsDB from manifest
            this.lessonsManifest.forEach(lesson => {
                this.lessonsDB[lesson.id] = {
                    title: lesson.title,
                    subtitle: lesson.subtitle,
                    date: lesson.date,
                    filename: lesson.filename,
                    description: lesson.description
                };
            });
            
            return this.lessonsManifest;
        } catch (error) {
            console.error('Error loading lessons manifest:', error);
            return [];
        }
    }

    parseFrontmatter(markdown) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = markdown.match(frontmatterRegex);
        
        if (!match) {
            return { metadata: {}, content: markdown };
        }
        
        const [, frontmatter, content] = match;
        const metadata = {};
        
        frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                metadata[key.trim()] = value;
            }
        });
        
        return { metadata, content };
    }

    async loadLesson(id) {
        const lesson = this.lessonsDB[id];
        if (!lesson) return null;
        
        // Check cache first
        const cacheKey = `lesson-${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            const response = await fetch(`lessons/${lesson.filename}`);
            if (!response.ok) throw new Error(`Failed to load lesson ${id}`);
            
            const markdown = await response.text();
            const { metadata, content } = this.parseFrontmatter(markdown);
            
            // Configure marked with custom renderer
            marked.setOptions({
                breaks: true,
                gfm: true
            });
            
            // Parse markdown to HTML
            const htmlContent = marked.parse(content);
            
            // Wrap content in proper structure
            const wrappedContent = `
                <header class="mb-12 border-b-2 border-black dark:border-gray-400 pb-6">
                    <h1 class="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black dark:text-gray-100">${metadata.title || lesson.title}</h1>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Data: ${metadata.date || lesson.date}</div>
                </header>
                <article class="space-y-6 text-justify dark:text-gray-200">
                    ${htmlContent}
                </article>
            `;
            
            const result = {
                ...lesson,
                content: wrappedContent,
                metadata
            };
            
            // Cache the result
            this.cache.set(cacheKey, result);
            
            return result;
        } catch (error) {
            console.error(`Error loading lesson ${id}:`, error);
            return null;
        }
    }

    getLessonsDB() {
        return this.lessonsDB;
    }
}

// Global instance
const markdownLoader = new MarkdownLoader();

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
        this.lessonsDB = {};
    }

    async init() {
        await markdownLoader.loadManifest();
        this.lessonsDB = markdownLoader.getLessonsDB();
        await this.populateIndex();
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

    async populateIndex() {
        const container = document.getElementById('lessons-list-container');
        let html = '';

        for (const id in this.lessonsDB) {
            const lesson = this.lessonsDB[id];
            html += `
                <article class="group" role="listitem">
                    <header>
                        <h3 class="text-2xl font-bold mb-1">
                            <button class="nav-btn standard-link" data-route="lesson" data-lesson-id="${id}" aria-label="Vai alla lezione: ${lesson.title}">
                                ${lesson.title}
                            </button>
                        </h3>
                        <div class="arrow-deco text-lg mb-2" aria-hidden="true">▼</div>
                        <div class="text-gray-500 dark:text-gray-400 text-sm mb-4 font-medium">Pubblicato il: ${lesson.date}</div>
                    </header>
                    <div class="mb-3 dark:text-gray-300"><p>${lesson.description}</p></div>
                    <footer>
                        <button class="nav-btn text-sm font-bold uppercase tracking-wide standard-link" data-route="lesson" data-lesson-id="${id}" aria-label="Leggi la lezione ${lesson.title}">
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

    async goToLesson(idInput) {
        const id = parseInt(idInput);
        
        // Show loading state
        const container = document.getElementById('lesson-content-container');
        container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500 dark:text-gray-400">Caricamento in corso...</p></div>';
        
        this.hideAll();
        this.views.lesson.classList.add('active');
        window.scrollTo(0, 0);
        
        // Load lesson dynamically from markdown file
        const lesson = await markdownLoader.loadLesson(id);

        if (!lesson) {
            container.innerHTML = '<div class="text-center py-12"><p class="text-red-500">Errore: lezione non trovata</p></div>';
            console.warn(`Lezione ${id} non trovata`);
            return;
        }

        this.currentLessonId = id;

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
    }

    renderNavigation(id) {
        const prevContainer = document.getElementById('nav-prev-container');
        const nextContainer = document.getElementById('nav-next-container');
        const prevId = id - 1;
        const nextId = id + 1;

        if (this.lessonsDB[prevId]) {
            prevContainer.innerHTML = `
                <span class="block text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Precedente</span>
                <button class="nav-btn standard-link font-bold text-sm md:text-base" data-route="lesson" data-lesson-id="${prevId}">
                    ← ${this.lessonsDB[prevId].title}
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

        if (this.lessonsDB[nextId]) {
            nextContainer.innerHTML = `
                <span class="block text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Successiva</span>
                <button class="nav-btn standard-link font-bold text-sm md:text-base" data-route="lesson" data-lesson-id="${nextId}">
                    ${this.lessonsDB[nextId].title} →
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
document.addEventListener('DOMContentLoaded', async () => {
    new ThemeManager();
    const router = new Router();
    await router.init();
});
