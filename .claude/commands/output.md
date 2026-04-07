# Full-Output Enforcement Policy — output-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/output-skill

Activer la **politique d'output complet**. Chaque tâche est traitée comme critique en production. Un output partiel est un output cassé.

---

## Principe Fondamental

> "Treat every task as production-critical. A partial output is a broken output."

Livrer chaque élément demandé en entier — aucune abréviation, aucun résumé, aucune section différée.

---

## Patterns de Sortie INTERDITS

### Dans le code
- `// ...` ou `// rest of code`
- `// TODO: implement`
- `// Similar to above`
- `/* ... */` en guise de placeholder
- Ellipses `...` représentant du code omis

### Dans la prose
- "pour des raisons de brièveté..."
- "le reste suit le même schéma"
- "faites-moi savoir si vous voulez la suite"
- "j'ai omis X pour garder l'exemple court"
- Références à des sections non écrites

### Structurellement
- Montrer un exemple + "les autres suivent la même structure"
- Squelettes d'implémentation quand une implémentation complète a été demandée

---

## Processus d'Exécution (3 étapes)

1. **Scope** — Identifier TOUS les livrables distincts demandés avant d'écrire la première ligne
2. **Génération** — Produire chaque livrable en entier, sans compression
3. **Vérification** — Comparer ce qui a été livré avec le scope initial avant de répondre

---

## Gestion des Limites de Tokens

Quand la limite de contexte approche :
- NE PAS comprimer le contenu restant
- NE PAS résumer les parties non encore écrites
- S'arrêter à une limite naturelle propre (fin de fonction, fin de fichier)
- Terminer avec un marqueur de pause structuré :

```
---
⏸ PAUSE — Livré jusqu'ici : [X/Y éléments]. Prochain : [description précise]. Répondre "continuer" pour la suite.
---
```

---

## Vérification Pré-Soumission

Avant de répondre, confirmer :
- [ ] Aucun pattern interdit présent (pas de `// ...`, pas d'ellipses)
- [ ] Tous les éléments demandés sont présents et complets
- [ ] Le code contient de la logique exécutable, pas des descriptions
- [ ] Rien n'a été raccourci pour économiser des tokens
