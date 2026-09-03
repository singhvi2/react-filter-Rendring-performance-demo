# Naive Filtering Approaches

The playground contains two intentionally unoptimized implementations of product filtering.

The purpose is not to recommend either approach, but to understand how React behaves when filtering is performed in different ways.

---

## 1. Naive Filter — Derived During Render

### Implementation

```jsx
const [search, setSearch] = useState("");

const filteredProducts = filterProducts(products, {
  search,
  category: "",
  brand: "",
  price: 5000,
});
```

### Flow

```text
User types
    ↓
setSearch()
    ↓
NaiveFilter renders
    ↓
filterProducts() executes
    ↓
filteredProducts created
    ↓
ProductList renders
```

### What happens?

Every time `NaiveFilter` renders, `filterProducts()` executes again.

For example:

```text
search = ""

render #1
    ↓
filter()

search = "r"

render #2
    ↓
filter()

search = "re"

render #3
    ↓
filter()

search = "rea"

render #4
    ↓
filter()
```

### Important point

The filtered list is **derived data**.

It is calculated directly from:

```text
products + search + other filters
```

It is not stored separately in React state.

### Name

```text
NaiveFilter
```

This is the primary baseline implementation.

---

# 2. Naive Effect Filter — Derived Using useEffect

### Implementation

```jsx
const [search, setSearch] = useState("");
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
  filterCount.current++;

  setFilteredProducts(
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );
}, [search]);
```

### Flow

```text
User types
    ↓
setSearch()
    ↓
NaiveEffectFilter renders
    ↓
useEffect executes
    ↓
filter()
    ↓
setFilteredProducts()
    ↓
NaiveEffectFilter renders AGAIN
    ↓
ProductList renders
```

### Initial render

There is an additional important behavior.

Initially:

```text
filteredProducts = []
```

The component renders first.

Then:

```text
useEffect()
    ↓
filter products
    ↓
setFilteredProducts()
    ↓
render again
```

So the simplified lifecycle is:

```text
Initial render
      ↓
Effect
      ↓
Filtering
      ↓
State update
      ↓
Second render
```

### Why is this interesting?

`filteredProducts` is derived from existing data:

```text
products
+
search
    ↓
filteredProducts
```

Therefore, this implementation introduces another state value:

```jsx
const [filteredProducts, setFilteredProducts] = useState([]);
```

and another render when that state is updated.

This makes it useful as a learning experiment for understanding:

* `useEffect`
* derived state
* state updates
* additional renders
* render → effect → state update → render cycles

### Name

```text
NaiveEffectFilter
```

---

# 3. Side-by-Side Comparison

|                                  | NaiveFilter             | NaiveEffectFilter      |
| -------------------------------- | ----------------------- | ---------------------- |
| Filtering location               | Render                  | `useEffect`            |
| Stores filtered result in state  | ❌                       | ✅                      |
| Filtering happens after render   | ❌                       | ✅                      |
| `setState` caused by filtering   | ❌                       | ✅                      |
| Additional render from filtering | ❌                       | ✅                      |
| Derived data                     | Directly calculated     | Stored as state        |
| Main learning                    | Render-time calculation | Effect + derived state |

---

# 4. Render Flow Comparison

### NaiveFilter

```text
┌──────────────┐
│ State change │
└──────┬───────┘
       ↓
┌──────────────┐
│    Render    │
└──────┬───────┘
       ↓
┌──────────────┐
│    Filter    │
└──────┬───────┘
       ↓
┌──────────────┐
│   ProductList│
└──────────────┘
```

### NaiveEffectFilter

```text
┌──────────────┐
│ State change │
└──────┬───────┘
       ↓
┌──────────────┐
│    Render    │
└──────┬───────┘
       ↓
┌──────────────┐
│  useEffect   │
└──────┬───────┘
       ↓
┌──────────────┐
│    Filter    │
└──────┬───────┘
       ↓
┌──────────────┐
│ setState()   │
└──────┬───────┘
       ↓
┌──────────────┐
│ Render Again │
└──────────────┘
```

---

# 5. Why Keep Both?

These two implementations establish two different baselines.

### Baseline A

> "What happens when I perform filtering during every render?"

```text
NaiveFilter
```

### Baseline B

> "What happens when I store derived filtering results in state and update them through an effect?"

```text
NaiveEffectFilter
```

Later, the optimization experiments can be compared against these baselines.

```text
NaiveFilter
      ↓
     useMemo
      ↓
React.memo
      ↓
 useCallback
      ↓
  Debounce
      ↓
Virtualization
      ↓
Fully Optimized
```

The `NaiveEffectFilter` remains as a separate educational experiment rather than being replaced.
