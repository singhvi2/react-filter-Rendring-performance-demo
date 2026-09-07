# Phase 02 — useMemo: Memoizing Expensive Calculations

## 🎯 Phase Goal

Phase 02 builds on the **Naive Rendering** implementation from Phase 01.

The purpose of this phase is to understand one specific React performance problem:

> **A component can re-render even when an expensive calculation does not need to run again.**

We will use `useMemo` to memoize the result of product filtering and then measure whether it actually reduces unnecessary calculation work.

This phase is **not about blindly adding `useMemo`**.

The goal is to understand:

- what `useMemo` actually memoizes
- why an expensive calculation may run repeatedly
- how dependency arrays control recalculation
- what happens when dependencies change
- what happens when dependencies do not change
- why `useMemo` does **not** prevent a component from rendering
- when `useMemo` is useful
- when `useMemo` adds unnecessary complexity
- how to explain `useMemo` confidently in an interview

---

# 1. 🧠 Problem We Are Solving

In Phase 01, the filtering operation is performed directly during rendering.

Conceptually:

```jsx
function NaiveFilter() {
  const [search, setSearch] = useState("");

  const filteredProducts = filterProducts(products, {
    search,
    category,
    brand,
    price,
  });

  return (...);
}
```

Whenever state changes:

```text
User types
    ↓
setSearch()
    ↓
Component re-renders
    ↓
filterProducts()
    ↓
Filtering work happens again
```

For a small dataset this may not matter.

But our playground intentionally uses a large product dataset so that we can observe the cost of repeated calculations.

---

# 2. 🔥 The Performance Problem

Imagine:

```text
10,000 products
      ↓
filterProducts()
      ↓
search/category/brand/price checks
      ↓
new filtered array
```

Now the user types:

```text
R
Re
Rea
Reac
React
```

The calculation can execute repeatedly:

```text
R       → filterProducts()
Re      → filterProducts()
Rea     → filterProducts()
Reac    → filterProducts()
React   → filterProducts()
```

The important question is:

> **Does the filtering calculation need to run on every render?**

Not necessarily.

That is the problem Phase 02 investigates.

---

# 3. 💡 Proposed Solution — `useMemo`

React provides:

```jsx
useMemo();
```

to memoize the result of a calculation.

The basic idea is:

```jsx
const filteredProducts = useMemo(() => {
  return filterProducts(products, filters);
}, [products, filters]);
```

Conceptually:

```text
Render
  ↓
useMemo
  ↓
Did dependencies change?
  ├── YES → calculate again
  │
  └── NO  → reuse previous value
```

So instead of:

```text
render → calculate
render → calculate
render → calculate
```

we can get:

```text
render → calculate
render → reuse
render → reuse
render → calculate   ← dependency changed
```

---

# 4. ⚠️ Critical Concept

`useMemo` does **not** mean:

```text
"Don't render this component."
```

It means:

```text
"Don't recalculate this memoized value unless its dependencies changed."
```

Therefore:

```text
useMemo
   ↓
optimizes calculation/value creation
```

while:

```text
React.memo
   ↓
optimizes component rendering
```

This distinction will become extremely important in Phase 03.

---

# 5. 🏗️ What We Will Build

We will create a separate implementation:

```text
pages/
├── NaiveFilter.jsx
└── UseMemoFilter.jsx
```

The two pages will perform the **same filtering operation**.

The difference will be:

### Phase 01

```jsx
const filteredProducts = filterProducts(products, filters);
```

### Phase 02

```jsx
const filteredProducts = useMemo(
  () => {
    return filterProducts(products, filters);
  },
  [
    /* dependencies */
  ],
);
```

This gives us a controlled experiment.

---

# 6. 🔬 Measurement Strategy

We will not simply say:

> "`useMemo` is faster."

We will measure what changed.

The playground will track:

### Component Render Count

```text
How many times did UseMemoFilter render?
```

### Filter Execution Count

```text
How many times did filterProducts() execute?
```

### Filtering Time

```text
How long did the filtering calculation take?
```

### ProductList Render Count

```text
How many times did ProductList render?
```

### ProductCard Render Count

```text
How many ProductCards rendered?
```

This lets us distinguish between:

```text
Component rendering
```

and:

```text
Expensive calculation
```

---

# 7. 🧪 Experiment 1 — No Memoization

First we establish the baseline.

```jsx
const filteredProducts = filterProducts(products, filters);
```

Expected behavior:

```text
State update
    ↓
Parent renders
    ↓
filterProducts()
    ↓
ProductList receives result
```

We record:

```text
Render Count
Filter Count
Filter Time
```

This becomes our Phase 01 baseline.

---

# 8. 🧪 Experiment 2 — Add `useMemo`

Now we change only the calculation:

```jsx
const filteredProducts = useMemo(() => {
  return filterProducts(products, filters);
}, [filters]);
```

The goal is to see:

```text
Component may render
        ↓
useMemo checks dependencies
        ↓
Dependencies unchanged?
        ↓
Reuse previous filtered value
```

This demonstrates that memoization is about **reusing a previously calculated value**.

---

# 9. 🧪 Experiment 3 — Dependency Changes

We will intentionally change each filtering input:

```text
search
category
brand
price
```

When a relevant dependency changes:

```text
dependency changes
      ↓
useMemo invalidates previous value
      ↓
filterProducts()
      ↓
new result
```

This teaches why the dependency array is fundamental to `useMemo`.

---

# 10. 🧪 Experiment 4 — Unrelated State

We will introduce state that does not affect filtering.

For example:

```jsx
const [counter, setCounter] = useState(0);
```

Then:

```jsx
setCounter(counter + 1);
```

The component renders again:

```text
counter changes
     ↓
component renders
```

But if the filtering dependencies have not changed:

```text
useMemo
   ↓
dependencies unchanged
   ↓
filterProducts() is NOT executed
```

This is one of the most important demonstrations in this phase.

It proves:

> **`useMemo` does not stop rendering; it can stop an expensive calculation from being repeated during that rendering.**

---

# 11. 🧪 Experiment 5 — Incorrect Dependencies

We will deliberately create dependency mistakes.

For example, imagine filtering depends on:

```text
search
category
brand
price
```

but we forget:

```text
category
```

Then:

```jsx
useMemo(() => {
  return filterProducts(products, filters);
}, [search, brand, price]);
```

Now:

```text
category changes
      ↓
component renders
      ↓
useMemo sees unchanged dependencies
      ↓
old filtered value reused
      ↓
UI can become incorrect
```

This demonstrates why dependency arrays are not optional bookkeeping.

They describe:

> **Which values the memoized calculation depends on.**

---

# 12. 🧪 Experiment 6 — Unnecessary `useMemo`

We will also investigate the opposite problem.

Not every calculation needs memoization.

For example:

```jsx
const result = a + b;
```

Using:

```jsx
useMemo(() => a + b, [a, b]);
```

may add more complexity than value.

The lesson is:

> **Memoization has a cost. Use it when the calculation is expensive or when referential stability is important.**

---

# 13. 📊 Phase 01 vs Phase 02

We will eventually compare:

| Behavior                     | Phase 01 — Naive | Phase 02 — useMemo |
| ---------------------------- | ---------------- | ------------------ |
| Component can re-render      | ✅               | ✅                 |
| Filtering runs during render | ✅               | Conditionally      |
| Previous calculation reused  | ❌               | ✅                 |
| Dependency tracking          | ❌               | ✅                 |
| Prevents component render    | ❌               | ❌                 |
| Optimizes calculation        | ❌               | ✅                 |
| Optimizes child rendering    | ❌               | ❌                 |

The last two rows are especially important.

`useMemo` is **not** a replacement for:

```jsx
React.memo;
```

and:

```jsx
useCallback;
```

Those problems will be explored later.

---

# 14. 🔄 Mental Model

The mental model we want to remember is:

```text
Component renders
       ↓
useMemo executes
       ↓
Compare dependencies
       ↓
 ┌───────────────┐
 │ Changed?      │
 └───────────────┘
       ↓
   ┌───────┴───────┐
   ↓               ↓
  YES              NO
   ↓               ↓
Calculate        Reuse previous
again            calculated value
```

This is the core idea of Phase 02.

---

# 15. 🧩 Referential Equality

We will also begin introducing an important React concept:

```text
Referential Equality
```

JavaScript objects and arrays are compared by reference.

For example:

```js
const a = { search: "" };
const b = { search: "" };

a === b; // false
```

Even though their contents are identical.

This matters because dependency arrays use equality checks to determine whether a dependency changed.

Therefore, this can become problematic:

```jsx
const filters = {
  search,
  category,
  brand,
};
```

If a new object is created on every render:

```text
render 1 → filters object A
render 2 → filters object B
render 3 → filters object C
```

then the reference changes.

We will use this phase to understand why dependency design matters.

---

# 16. 🛠️ Implementation Plan

### Step 1

Create:

```text
UseMemoFilter.jsx
```

### Step 2

Copy the behavior of the Naive implementation.

### Step 3

Add render instrumentation.

### Step 4

Add filter instrumentation.

### Step 5

Measure the baseline.

### Step 6

Add:

```jsx
useMemo();
```

### Step 7

Add the correct dependencies.

### Step 8

Introduce unrelated state.

### Step 9

Observe:

```text
Component renders
BUT
filterProducts() does not execute
```

### Step 10

Experiment with incorrect dependencies.

### Step 11

Experiment with unnecessary memoization.

### Step 12

Document the performance results.

---

# 17. 🎓 What We Should Be Able to Explain After Phase 02

By the end of this phase, we should be able to answer:

### Beginner

- What is `useMemo`?
- What does it return?
- What is the dependency array?
- When does the memoized calculation execute?

### Intermediate

- Does `useMemo` prevent component re-renders?
- What happens when a dependency changes?
- What happens when no dependency changes?
- Why can `useMemo` return a stale value?
- Why are dependency arrays important?

### Advanced

- What is referential equality?
- Why can object/array dependencies cause recalculation?
- When should `useMemo` be avoided?
- What is the difference between `useMemo` and `React.memo`?
- What is the difference between `useMemo` and `useCallback`?
- Does `useMemo` guarantee permanent caching?
- Why shouldn't every calculation be wrapped in `useMemo`?

---

# 18. 🚫 What Phase 02 Will NOT Solve

It is important not to claim that `useMemo` solves every performance problem.

It does **not** solve:

```text
❌ unnecessary component renders
❌ unnecessary ProductCard renders
❌ unstable callback references
❌ too many DOM nodes
❌ excessive events from typing
```

Those problems belong to later phases:

```text
React.memo
useCallback
Debounce
Virtualization
```

---

# 19. 🗺️ Where Phase 02 Fits

```text
PHASE 01
Naive Rendering
     │
     │
     ▼
Understand the problem
     │
     ▼
PHASE 02
useMemo
     │
     │
     ▼
Optimize expensive calculations
     │
     ▼
PHASE 03
React.memo
     │
     ▼
Optimize component rendering
     │
     ▼
PHASE 04
useCallback
     │
     ▼
Stabilize function references
     │
     ▼
PHASE 05
Debounce
     │
     ▼
Reduce frequency of expensive work
     │
     ▼
PHASE 06
Virtualization
     │
     ▼
Reduce mounted DOM elements
     │
     ▼
PHASE 07
Fully Optimized
```

---

# 20. 🏁 Definition of Done

Phase 02 is complete when:

- [ ] `UseMemoFilter` page is implemented
- [ ] Same filtering logic is used as Phase 01
- [ ] Render count is measurable
- [ ] Filter execution count is measurable
- [ ] Filtering time is measurable
- [ ] `useMemo` is implemented
- [ ] Dependencies are correctly defined
- [ ] Unrelated state experiment is completed
- [ ] Dependency-change experiment is completed
- [ ] Incorrect dependency experiment is understood
- [ ] Referential equality is understood
- [ ] `useMemo` vs `React.memo` is understood
- [ ] Performance results are documented
- [ ] Interview questions can be answered without memorizing definitions

---

# 🎯 Final Takeaway

The most important lesson of Phase 02 is:

> **`useMemo` is a performance optimization for expensive calculations. It memoizes a value and recomputes it when its dependencies change. It does not prevent the component itself from rendering.**

The entire phase exists to make that statement something we can **see, measure, experiment with, and explain**, rather than something we simply memorize.
