---
title: "03. Dinamica"
subtitle: "I Principi"
date: "15/11/2025"
description: "I tre principi di Newton, F=ma, diagrammi di corpo libero e piano inclinato."
---

# 03. I Principi della Dinamica

La dinamica studia le cause del moto. Il secondo principio di Newton è la chiave di volta della meccanica classica:

$$ \vec{F} = m \cdot \vec{a} $$

## Esempio: Piano Inclinato

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

L'accelerazione lungo il piano (senza attrito) è $a = g \sin(\theta)$.
