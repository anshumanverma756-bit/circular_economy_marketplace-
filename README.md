# circular_economy_marketplace-
# REMATTER — Circular Material Exchange

**SD-04 · Circular Economy Marketplace**

> Waste has an owner. Give it a *next* one.

REMATTER is a marketplace prototype that lets industries list reusable industrial material instead of discarding it. Every batch is classified by AI, priced by verified impact, and its custody is written to an immutable ledger the moment it changes hands.

Built as a hackathon submission for the **SD-04: Circular Economy Marketplace** problem statement.

---

## The Problem

Industrial byproducts — metal turnings, plastic regrind, fly ash, glass cullet, foundry sand — are routinely sent to landfill even when another factory could reuse them as raw input. Three things block that reuse today:

1. **No standard way to classify what the material actually is** or how pure/usable it is.
2. **No visibility into who has what**, so buyers and sellers never find each other.
3. **No trustworthy record of ownership**, so trades are hard to verify or audit.

REMATTER addresses all three in a single flow: **scan → classify → list → trade → track**.

---

## Features

### 1. Marketplace
Browse material listed by the organizations that generated it. Each listing is a **material passport** — classification, quantity, origin, and carbon value in one record — filterable by material stream (Ferrous Metal, Non-ferrous Metal, Plastic, Mineral Byproduct, Fibre/Paper, Silicate).

### 2. AI Classification
Simulates scanning an incoming batch and generating a material passport on the spot: category, confidence score, and a starting carbon-impact estimate versus virgin material — ready to accept or reject before it's listed.

### 3. Carbon Impact Analytics
Aggregated dashboard of CO₂e avoided by material stream, total material diverted from landfill, and estimated virgin-material procurement cost displaced for buyers.

### 4. Ownership Ledger
Every accepted trade appends a block to a hash-linked chain: material, seller, buyer, and a hash of the previous block, so custody can't be silently reassigned — a lightweight blockchain-style audit trail, viewable and appendable live in the demo.

### Live Ticker
A scrolling feed of recently verified transfers across the network, reinforcing that trades are continuously happening and being verified.

---

##  Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, CSS Grid/Flexbox, no framework) |
| Interactivity | Vanilla JavaScript (no build step, no dependencies) |
| Fonts | Space Grotesk, IBM Plex Mono, Inter (Google Fonts) |

This is a fully static front-end prototype — no backend, no database. All data (listings, chain blocks, chart values) lives in `script.js` and is rendered/mutated client-side, which makes it easy to demo without any setup.

---

## Project Structure

```
circular-economy-marketplace/
├── index.html      # Page structure & sections (Hero, Marketplace, Classifier, Analytics, Ledger)
├── style.css        # Design system: colors, typography, layout, animations
├── script.js         # Data (materials, chain blocks, chart data) + all interactivity
└── README.md
```

---

## Running Locally

No build tools or dependencies required.

```bash
git clone https://github.com/anshumanverma756-bit/circular-economy-marketplace-.git
cd circular-economy-marketplace-
```

Then either:
- Open `index.html` directly in a browser, **or**
- Serve it locally for best results (fonts/animations behave more reliably over HTTP):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Try It Out

- **Scan a batch** — go to the *Classification* section and click **"Scan Next Batch"** to see a simulated AI classification result render as a material passport.
- **Filter the marketplace** — use the stream chips above the listing grid to narrow results by material type.
- **Record a transfer** — go to the *Ownership Ledger* section and click **"+ Record New Transfer"** to append a new block to the chain and watch the chain height update.

---

## Demo Data Disclaimer

This is a **hackathon prototype**. Material listings, classification confidence scores, carbon-impact figures, and ledger transactions are illustrative sample data hard-coded in `script.js`, not live sensor or blockchain data. In a production version, these would be backed by:
- A real ML classification model (image + spec-sheet input)
- A verified carbon-accounting methodology per material category
- An actual distributed ledger / blockchain for the ownership chain
- A backend marketplace API connecting real buyer and seller organizations

---

## Future Scope

- Real image/spec-sheet upload for the classifier (currently simulated)
- User accounts for organizations to list and manage their own batches
- Real-time bidding/negotiation on listings
- Integration with an actual blockchain network for the ownership ledger
- Verified carbon-credit generation from completed trades
- Logistics/matching layer connecting sellers to nearest compatible buyers

---

## Team

Built by **Aditya verma ** and team for the SD-04 hackathon track.

---

