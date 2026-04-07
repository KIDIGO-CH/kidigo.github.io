# Full-Output Enforcement Policy — output-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/output-skill
# Note: Copie locale pour usage offline et contrôle des données

## Core Principle

"Treat every task as production-critical. A partial output is a broken output."

Deliver every requested item in full — no abbreviations, no sketches, no deferred sections.

## Prohibited Output Forms

**In code:**
- `// ...` or `// rest of code`
- `// TODO: implement`
- `// Similar to above`
- `/* ... */` as placeholder
- Bare `...` representing omitted code

**In prose:**
- "for brevity..."
- "the rest follows the same pattern"
- "let me know if you want me to continue"
- "I omitted X to keep the example short"
- References to sections not yet written

**Structurally:**
- Showing one example + "the others follow the same structure"
- Skeleton implementations when full implementation was requested

## Execution Process (3 Steps)

1. **Scope** — Identify ALL distinct deliverables requested before writing the first line
2. **Generate** — Produce each deliverable in full, without compression
3. **Verify** — Compare what was delivered against the initial scope before responding

## Token Limit Handling

When approaching context limits:
- Do NOT compress remaining content
- Do NOT summarize sections not yet written
- Stop at a clean natural boundary (end of function, end of file)
- End with a structured pause marker:

```
---
[PAUSED — X of Y complete. Send 'continue' to resume from: <next section name>]
---
```

## Pre-Submission Checklist

- [ ] No banned patterns present (no `// ...`, no ellipses)
- [ ] All requested items are present and complete
- [ ] Code contains executable logic, not descriptions
- [ ] Nothing was shortened for token efficiency
