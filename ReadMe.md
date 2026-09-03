# React Rendering & Performance Playground

A hands-on React learning project focused on understanding **how React rendering works**, where unnecessary work comes from, and how different optimization techniques improve application performance.

Instead of learning `useMemo`, `React.memo`, `useCallback`, debouncing, and virtualization in isolation, this project introduces them **progressively through separate phases**.

Each phase starts from a working implementation, introduces a specific rendering or performance approach, measures the result, and documents what changed.

---

## 🎯 Project Motive

React performance optimization is often taught as a collection of APIs:

- `useMemo`
- `useCallback`
- `React.memo`
- Debouncing
- Virtualization

But knowing how to use these APIs is different from understanding **why they exist**.

This project is built around a simple question:

> **What exactly happens when a React application renders, and how can we avoid unnecessary work?**

The project uses a product filtering application as a practical example.

A large dataset is generated and progressively optimized so that the impact of each technique can be observed and measured.

The goal is not simply to make the application faster.

The goal is to understand:

- Why unnecessary re-renders happen
- What causes a component to render
- How parent and child renders are related
- Why expensive calculations can hurt performance
- When memoization is useful
- When memoization does not help
- Why function references matter
- Why debouncing is different from memoization
- Why rendering thousands of DOM elements is expensive
- How virtualization solves large-list rendering problems
- When optimization becomes premature
- How multiple optimization techniques work together

---




# 📚 Phase Comparison

| Phase  | Main Focus      | Primary Question                        | Progress       |
| :----- | :-------------- | :-------------------------------------- | :------------- |
| **01** | Naive Rendering | What is happening?                      | ✅ Done        |
| **02** | `useMemo`       | Can we avoid repeated calculations?     | ⏳ In Progress |
| **03** | `React.memo`    | Can we avoid unnecessary child renders? | ⭕ Todo        |
| **04** | `useCallback`   | Why are function props causing renders? | ⭕ Todo        |
| **05** | Debounce        | Can we reduce how often work starts?    | ⭕ Todo        |
| **06** | Virtualization  | Can we reduce how much UI we render?    | ⭕ Todo        |
| **07** | Optimized       | How do these techniques work together?  | ⭕ Todo        |



# 🧠 Learning Approach

This repository follows a **phase-based learning approach**.

Each phase demonstrates one specific rendering or optimization approach.

```text
Phase 01
Naive Rendering
      ↓
Measure the baseline
      ↓
Phase 02
useMemo
      ↓
Measure the improvement
      ↓
Phase 03
React.memo
      ↓
Measure the improvement
      ↓
Phase 04
useCallback
      ↓
Measure the improvement
      ↓
Phase 05
Debounce
      ↓
Measure the improvement
      ↓
Phase 06
Virtualization
      ↓
Measure the improvement
      ↓
Phase 07
Fully Optimized
```

The important principle is:

> **Change one major optimization at a time and observe its effect.**

This makes each phase a controlled experiment rather than simply creating different versions of the same application.

---

# 🚀 Project Structure

```text
React-Rendering-filter/
│
├── README.md
│
├── phase01_Naive/
│   ├── README.md
│   ├── react-filter-performance-demo/
│   │   ├── public/
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   │
│   └── screenshots/
│
├── phase02_UseMemo/
│   ├── README.md
│   ├── react-filter-performance-demo/
│   └── screenshots/
│
├── phase03_ReactMemo/
│   ├── README.md
│   ├── react-filter-performance-demo/
│   └── screenshots/
│
├── phase04_UseCallback/
│   ├── README.md
│   ├── react-filter-performance-demo/
│   └── screenshots/
│
├── phase05_Debounce/
│   ├── README.md
│   ├── react-filter-performance-demo/
│   └── screenshots/
│
├── phase06_Virtualization/
│   ├── README.md
│   ├── react-filter-performance-demo/
│   └── screenshots/
│
└── phase07_Optimized/
    ├── README.md
    ├── react-filter-performance-demo/
    └── screenshots/
```

Each phase contains three important parts:

### `README.md`

Explains:

- What the phase demonstrates
- What changed from the previous phase
- How rendering behaves
- Performance observations
- Key learnings

### `react-filter-performance-demo/`

The actual React implementation for that phase.

### `screenshots/`

Evidence collected while running the application.

Screenshots can include:

- Component render logs
- Render counts
- Filter execution counts
- Processing time
- DOM/rendering behavior
- Before/after comparisons

---

# 🛣️ Learning Journey

## Phase 01 — Naive Rendering

**Goal:** Establish the baseline.

The application performs filtering directly during rendering.

```js
const filteredProducts = filterProducts(products, filters);
```

The calculation can therefore execute whenever the component renders.

This phase intentionally contains **no performance optimization**.

### We investigate

- What causes the parent component to render?
- What happens to child components?
- How often does filtering execute?
- How many product cards render?
- How expensive is the filtering operation?

### Outcome

Create a measurable baseline that every later phase can be compared against.

[Phase 01 →](./phase01_Naive/)

---

## Phase 02 — `useMemo`

**Goal:** Understand expensive calculation memoization.

We introduce:

```js
useMemo();
```

The filtering calculation is memoized so that React can reuse the previously calculated result when its dependencies have not changed.

### We investigate

- Does the component still render?
- Does the filtering calculation still execute?
- What happens when unrelated state changes?
- What is the difference between rendering and recalculating?

### Key concept

> `useMemo` memoizes a **calculated value**. It does not prevent a component from rendering.

[Phase 02 →](./phase02_UseMemo/)

---

## Phase 03 — `React.memo`

**Goal:** Understand child component rendering.

We introduce:

```js
React.memo();
```

to prevent child components from rendering when their props have not changed.

### We investigate

- Does the parent still render?
- Does `ProductList` render?
- Do individual `ProductCard` components render?
- How does prop comparison affect rendering?

### Key concept

> `React.memo` can allow a component to skip rendering when its props are unchanged.

[Phase 03 →](./phase03_ReactMemo/)

---

## Phase 04 — `useCallback`

**Goal:** Understand function identity and stable references.

We introduce:

```js
useCallback();
```

to maintain stable function references when passing callbacks to memoized child components.

### We investigate

- Why does a new function cause props to change?
- Why might `React.memo` fail to prevent a child render?
- What does function identity have to do with rendering?
- How does `useCallback` interact with `React.memo`?

### Key concept

> `useCallback` is often useful when function references are passed to memoized components.

[Phase 04 →](./phase04_UseCallback/)

---

## Phase 05 — Debounced Search

**Goal:** Reduce unnecessary work while users type.

Without debouncing:

```text
R
 ↓
filter

Re
 ↓
filter

Rea
 ↓
filter

Reac
 ↓
filter

React
 ↓
filter
```

With debouncing:

```text
R
Re
Rea
Reac
React
 ↓
wait
 ↓
filter
```

### We investigate

- How frequently does filtering happen while typing?
- Can we delay expensive work?
- How does debouncing differ from memoization?
- What impact does it have on user experience?

### Key concept

> Debouncing controls **when work happens**, while memoization controls whether previously calculated work can be reused.

[Phase 05 →](./phase05_Debounce/)

---

## Phase 06 — Virtualization

**Goal:** Understand large-list rendering.

A large dataset may contain thousands of products.

Rendering all of them creates a large number of DOM nodes.

Virtualization changes the approach:

```text
10,000 products
       ↓
Only visible products rendered
       ↓
Small number of DOM nodes
```

### We investigate

- How many products exist?
- How many DOM elements are actually rendered?
- What happens while scrolling?
- Why does a large list become expensive?
- How does virtualization reduce rendering work?

### Key concept

> Virtualization reduces the number of list items that need to be rendered at a given time.

[Phase 06 →](./phase06_Virtualization/)

---

## Phase 07 — Fully Optimized

**Goal:** Combine the techniques learned throughout the project.

The final implementation combines the appropriate techniques:

```text
                 ┌── useMemo
                 │
                 ├── React.memo
                 │
Products ────────┼── useCallback
                 │
                 ├── Debounce
                 │
                 └── Virtualization
```

The goal is not to blindly use every optimization.

Instead, the final phase demonstrates how different techniques address **different performance problems**.

### We investigate

- Which optimizations actually helped?
- Which optimizations solve different problems?
- Are all optimizations necessary?
- What is the cost of adding optimization?
- What does a practical optimized implementation look like?

[Phase 07 →](./phase07_Optimized/)

---

# 📊 Performance Metrics

Each phase focuses on measuring the application's behavior rather than relying on assumptions.

The project tracks metrics such as:

| Metric            | Purpose                                |
| ----------------- | -------------------------------------- |
| Render Count      | How often a component renders          |
| Filter Count      | How often filtering executes           |
| Execution Time    | How long expensive work takes          |
| Total Products    | Size of the dataset                    |
| Visible Products  | Number of products currently displayed |
| Component Renders | How often specific components render   |

The measurements allow us to compare phases objectively.

For example:

```text
                  Naive    useMemo    React.memo
--------------------------------------------------
Parent renders       10        10          10
Filter executions    10         3           3
Card renders       1000      1000         100
```

The exact values will depend on the implementation and experiment.

The important principle is:

> **Optimize based on measured behavior, not assumptions.**

---

# 🧩 Core Application Concepts

The project uses a product filtering application to demonstrate React rendering.

### Product Data

Products contain:

```js
{
  (id, name, category, brand, price);
}
```

A large dataset can be generated:

```js
generateProducts(10000);
```

### Filtering

Filtering is kept separate from the UI:

```text
Products
   ↓
filterProducts()
   ↓
Filtered Products
   ↓
ProductList
   ↓
ProductCard
```

This allows the filtering operation to remain consistent across different phases.

---

# 🧱 Core Components

```text
ProductList
    │
    └── ProductCard
```

Filtering controls:

```text
SearchFilter
CategoryFilter
BrandFilter
PriceFilter
```

Supporting components include:

```text
Statistics
Navbar
Footer
Body
```

The goal is to keep the application organized into reusable components while allowing each phase to focus on rendering behavior.

---

# 🎓 Concepts Covered

By completing the project, the following concepts will be explored:

### React Fundamentals

- Components
- Props
- State
- Event handling
- Component hierarchy

### React Rendering

- State updates
- Parent renders
- Child renders
- Re-rendering
- Component rendering behavior
- Reconciliation
- Referential equality

### Performance Optimization

- `useMemo`
- `React.memo`
- `useCallback`
- Debouncing
- Virtualization

### Architecture

- Feature organization
- Reusable components
- Custom hooks
- Shared utilities
- Separation of UI and logic

---

# 🔬 Experiment Philosophy

Every phase follows the same basic process:

```text
1. Build
   ↓
2. Observe
   ↓
3. Measure
   ↓
4. Identify the bottleneck
   ↓
5. Introduce one optimization
   ↓
6. Measure again
   ↓
7. Compare
   ↓
8. Document
```

This approach is intentional.

The purpose of the project is not:

> "Learn a list of React optimization APIs."

It is:

> **"Understand a performance problem first, then choose the appropriate solution."**

---

# 🏆 End Goal

By completing this project, the goal is to move beyond knowing **what** React performance APIs do and understand:

- **Why** they exist
- **What problem** each one solves
- **When** to use them
- **When not** to use them
- **What trade-offs** they introduce
- **How to measure** their impact
- **How different optimizations interact**
- **How to reason about React performance in real applications**

The final objective is not to make every component memoized.

It is to develop the ability to look at a React performance problem and reason:

```text
What is rendering?
        ↓
Why is it rendering?
        ↓
What work is happening?
        ↓
Is the work actually expensive?
        ↓
Can the work be avoided?
        ↓
Which optimization addresses the problem?
        ↓
Did the optimization actually improve performance?
```

---

# 🚀 Development Roadmap

```text
Phase 01 ── Naive Rendering
     │
     ▼
Phase 02 ── useMemo
     │
     ▼
Phase 03 ── React.memo
     │
     ▼
Phase 04 ── useCallback
     │
     ▼
Phase 05 ── Debounce
     │
     ▼
Phase 06 ── Virtualization
     │
     ▼
Phase 07 ── Fully Optimized
```

---

## 💡 Final Principle

> **Don't optimize because you can. Optimize because you measured a problem.**

This project is an attempt to learn React performance the same way performance problems are approached in real applications:

**Build → Measure → Understand → Optimize → Compare.**
