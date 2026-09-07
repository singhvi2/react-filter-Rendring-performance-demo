# Phase 01 — Naive Rendering

## 🎯 Objective

The goal of Phase 01 is to build a **baseline React filtering application without applying any rendering or performance optimizations**.

This phase intentionally represents a simple, naive implementation.

We are not trying to make the application fast yet.

Instead, we want to answer:

> **What actually happens when state changes in a React application?**

Before introducing `useMemo`, `React.memo`, `useCallback`, debouncing, or virtualization, we first need to understand and measure the problem.

> implemented via two naiveEffectFilter and naiveFilter

1. NaiveEffectFilter : Stores derived state in React state and updates it inside useEffect, causing an extra render cycle -> 2x Render
2. naiveFilter : Calculates filtered results synchronously during every render; -> 1x render

---

# 🧠 What Does "Naive" Mean?

In this project, **Naive Rendering** means that we allow React to follow its normal rendering behavior without intentionally optimizing expensive calculations or child component renders.

The filtering operation is performed directly during the component's render:

```js
const filteredProducts = filterProducts(products, filters);
```

Whenever the component renders, this calculation is executed again.

There is no:

- `useMemo`
- `React.memo`
- `useCallback`
- Debouncing
- Virtualization

This gives us a clean baseline for comparison with future phases.

---

# 🏗️ Application Structure

```text
phase01_Naive/
│
├── README.md
│
├── react-filter-performance-demo/
│   │
│   ├── public/
│   │
│   └── src/
│       │
│       ├── assets/
│       │
│       ├── components/
│       │   ├── filters/
│       │   │   ├── SearchFilter.jsx
│       │   │   ├── CategoryFilter.jsx
│       │   │   ├── BrandFilter.jsx
│       │   │   └── PriceFilter.jsx
│       │   │
│       │   ├── layout/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   └── Body.jsx
│       │   │
│       │   ├── ProductCard.jsx
│       │   ├── ProductList.jsx
│       │   └── Statistics.jsx
│       │
│       ├── hooks/
│       │
│       ├── pages/
│       │
│       ├── routes/
│       │
│       └── utils/
│           ├── generateProducts.js
│           └── filterProducts.js
│
└── screenshots/
```

The application is separated into components, utilities, and pages so that the rendering behavior can be observed at different levels of the component tree.

---

# 📦 Dataset

The application uses generated product data rather than a small hard-coded dataset.

Each product contains:

```js
{
  (id, name, category, brand, price);
}
```

Products are generated using:

```js
generateProducts(count);
```

For example:

```js
generateProducts(10000);
```

The purpose of generating a large dataset is to make filtering and rendering work noticeable enough to measure.

With a very small dataset, performance differences may be difficult to observe.

---

# 🔍 Filtering

Filtering logic is separated into:

```text
utils/filterProducts.js
```

The filtering operation can use values such as:

- Search text
- Category
- Brand
- Price

Conceptually:

```text
Products
   │
   ▼
filterProducts()
   │
   ├── Search
   ├── Category
   ├── Brand
   └── Price
   │
   ▼
Filtered Products
```

The filtering logic is kept outside the UI component so that the same filtering operation can be reused in later phases.

This is important because we want the **work being measured to remain comparable between phases**.

---

# 🌳 Component Tree

The main rendering structure is:

```text
NaiveFilter
│
├── Statistics
│
├── SearchFilter
│
├── CategoryFilter
│
├── BrandFilter
│
├── PriceFilter
│
└── ProductList
      │
      ├── ProductCard
      ├── ProductCard
      ├── ProductCard
      └── ...
```

This structure allows us to observe rendering behavior at different levels.

---

# 🔄 Render Flow

Consider the user typing into the search field.

For example:

```text
R
```

The search state changes.

Conceptually:

```text
User types
    ↓
Search input event
    ↓
setSearch()
    ↓
NaiveFilter renders
    ↓
filterProducts() executes
    ↓
ProductList receives filtered products
    ↓
ProductList renders
    ↓
ProductCard components render
```

If the user continues typing:

```text
R
Re
Rea
Reac
React
```

the same process can occur repeatedly.

```text
R
 ↓
render
 ↓
filter

Re
 ↓
render
 ↓
filter

Rea
 ↓
render
 ↓
filter

Reac
 ↓
render
 ↓
filter

React
 ↓
render
 ↓
filter
```

This repeated work is what we want to investigate.

---

# ⚠️ The Performance Problem

The important thing to understand is that there are potentially **multiple kinds of repeated work**.

### 1. Component rendering

A state update can cause the component owning that state to render again.

### 2. Expensive calculations

If filtering is performed directly inside the render:

```js
const filteredProducts = filterProducts(products, filters);
```

the filtering function executes whenever that render occurs.

### 3. Child rendering

When a parent renders, child components may also participate in the rendering process.

For example:

```text
NaiveFilter
     ↓
ProductList
     ↓
ProductCard
```

Phase 01 allows this behavior to happen without memoization.

---

# 📊 Performance Metrics

The purpose of this phase is to establish measurable baseline behavior.

We track:

| Metric           | What it tells us                              |
| ---------------- | --------------------------------------------- |
| Render Count     | How many times the relevant component renders |
| Filter Count     | How many times filtering executes             |
| Filtering Time   | How long the filtering operation takes        |
| Total Products   | Size of the dataset                           |
| Visible Products | Number of products after filtering            |

We can also log individual components to understand their rendering behavior.

For example:

```js
console.log("ProductList Render");
```

and:

```js
console.log("ProductCard Render", product.id);
```

This allows us to observe what happens rather than assuming what happens.

---

# 🔬 Experiment

The basic experiment is:

### Step 1 — Initial Load

Load the application and record:

- Render count
- Filter count
- Filtering time
- Number of products

### Step 2 — Change Search

Type into the search field.

For example:

```text
Product
```

Observe:

- How many times the parent renders
- How many times filtering executes
- How many times `ProductList` renders
- How many `ProductCard`s render

### Step 3 — Change Filters

Change category, brand, or price.

Observe the same metrics.

### Step 4 — Change State That Does Not Directly Affect Filtering

If the application contains unrelated state, change it and observe whether filtering still executes.

This becomes particularly useful in the next phase.

---

# 📸 Screenshots

Screenshots for this phase are stored in:

```text
screenshots/
```

Suggested screenshots include:

```text
screenshots/
├── initial-render.png
├── search-render.png
├── filter-render.png
└── performance-metrics.png
```

The screenshots serve as visual evidence of the experiment and provide a reference point for comparing later phases.

---

# 📈 Baseline Results : NaiveFilter

The results should be recorded after running the actual experiment.
At this stage, the playground measures only the search interaction.
Category and brand filtering will be added in later experiments.

Example format:

| Action                | Parent Renders | Filter Executions | Filter Time |
| --------------------- | -------------: | ----------------: | ----------: |
| Initial Load          |             01 |                01 |           1 |
| Type first character  |       01 -> 02 |          01 -> 02 |         1.4 |
| Type second character |       02 -> 03 |          02 -> 03 |         0.7 |

## table for React Profiler:

| Action / Commit | Component   | Render Duration |
| --------------- | ----------- | --------------: |
| Initial Load    | NaiveFilter |         ~1.4 ms |
| Initial Load    | ProductList |         ~196 ms |
| Search update   | NaiveFilter |         ~1.8 ms |
| Search update   | ProductList |         ~242 ms |

# 📈 Baseline Results : NaiveEffectFilter

The results below are measured from the actual application.

| Action                | Parent Renders | Filter Executions | Filter Time |
| --------------------- | -------------: | ----------------: | ----------: |
| Initial Load          |              2 |                 1 |      0.6 ms |
| Type first character  |              4 |                 2 |      1.3 ms |
| Type second character |              6 |                 3 |      0.5 ms |

| Implementation             | User Action    | Render Count | Filter Count | Commit Duration |         Component Cost | Update Caused By           | Main Observation                                           |
| -------------------------- | -------------- | -----------: | -----------: | --------------: | ---------------------: | -------------------------- | ---------------------------------------------------------- |
| `NaiveFilter`              | Initial render |            1 |            0 |      ~1290 ms\* |  `ProductList` ~196 ms | `RouterProvider`           | Large product list is expensive to render                  |
| `NaiveFilter`              | Type `P`       |            2 |            1 |      ~1168 ms\* |  `ProductList` ~242 ms | `NaiveFilter`              | Every keystroke triggers filtering + ProductList rendering |
| `NaiveFilter`              | Type `Pr`      |            3 |            2 |      ~1284 ms\* |  `ProductList` ~196 ms | `NaiveFilter`              | Filtering runs again for every input update                |
| `NaiveEffectDerivedFilter` | Type `P`       |            2 |            1 |        ~18.9 ms | `ProductList` ~17.8 ms | `NaiveEffectDerivedFilter` | Derived filtered state introduces an additional update     |
| `NaiveEffectDerivedFilter` | Type `Pr`      |            4 |            2 |        ~15.1 ms | `ProductList` ~12.2 ms | `NaiveEffectDerivedFilter` | Input update → effect → state update → another render      |
| `NaiveEffectDerivedFilter` | Later update   |            6 |            3 |        ~10.3 ms |  `ProductList` ~9.5 ms | `NaiveEffectDerivedFilter` | Extra effect-driven render is visible                      |

### Measurements

- **Parent Renders** — number of times the main filter component renders.
- **Filter Executions** — number of times the filtering operation runs.
- **Filter Time** — time taken by the filtering operation, measured using `performance.now()`.

> **Note:** Values are recorded from the actual application and should not be assumed.

---

# 🧩 What We Learned

Phase 01 establishes several important ideas.

### 1. Rendering and calculation are different concepts

A component rendering does not mean that every piece of work inside the application is necessarily expensive.

We need to identify what work happens during that render.

---

### 2. Expensive calculations can repeat

When filtering is performed directly during rendering:

```js
const filteredProducts = filterProducts(products, filters);
```

the calculation can execute again whenever the component renders.

---

### 3. Parent and child components form a rendering tree

The application is not just one component.

It has a hierarchy:

```text
Parent
  ↓
Child
  ↓
Grandchild
```

Understanding this hierarchy is necessary before learning `React.memo`.

---

### 4. We should measure before optimizing

At this stage we intentionally do **not** optimize the application.

We first establish:

> **What is happening?**

Only after understanding and measuring the behavior should we introduce an optimization.

---

# ❌ What We Are NOT Doing Yet

This phase intentionally does not use:

```text
useMemo
React.memo
useCallback
Debounce
Virtualization
```

That is deliberate.

Each technique will be introduced in a later phase so that its effect can be isolated and understood.

---

# 🎯 Why This Phase Matters

It may be tempting to immediately write:

```js
useMemo(...)
```

or:

```js
React.memo(...)
```

But doing that before understanding the problem makes it easy to memorize APIs without understanding their purpose.

Phase 01 establishes the baseline:

```text
Observe
   ↓
Measure
   ↓
Understand
   ↓
Then optimize
```

This baseline will be used as the reference point for every subsequent phase.

---

# 🔜 Next Phase

## Phase 02 — `useMemo`

The next phase will investigate a different question:

> **If the component renders again, do we always need to perform the expensive filtering calculation again?**

We will introduce `useMemo` and compare the result against this naive baseline.

The goal is to understand that:

```text
useMemo
    ↓
memoizes a calculated value
```

rather than assuming:

```text
useMemo
    ↓
prevents component rendering
```

That distinction will be one of the key concepts of the project.

---

## 🏁 Phase 01 Summary

```text
                 PHASE 01
              Naive Rendering
                    │
                    ▼
            State changes
                    │
                    ▼
             Component renders
                    │
                    ▼
             Filtering executes
                    │
                    ▼
             Children render
                    │
                    ▼
              Measure results
                    │
                    ▼
          Establish the baseline
```

**The purpose of Phase 01 is not optimization.**

**The purpose is understanding the problem.**
