# Design Guidelines: Laptop Specification Matching Platform

## Design Approach

**Selected System:** Shadcn/UI Design System with Tailwind CSS
**Justification:** MVP-focused, data-heavy application requiring clean, functional interfaces. Shadcn provides pre-built components optimized for forms and data display, perfect for spec matching functionality.

**Core Principles:**
- Clarity over creativity - information must be scannable and comparable
- Functional first - every element serves the matching workflow
- Professional aesthetics - inspire confidence in the matching algorithm

---

## Typography

**Font Stack:** Inter (Google Fonts)
- Headings: font-bold, text-3xl to text-5xl
- Subheadings: font-semibold, text-xl to text-2xl  
- Body: font-normal, text-base
- Labels/Captions: font-medium, text-sm
- Data/Specs: font-mono, text-sm (for technical specifications)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section margins: mb-8, mb-12, mb-16
- Grid gaps: gap-4, gap-6, gap-8
- Container max-width: max-w-7xl

**Page Structure:**
- Header: Fixed navigation with logo left, links right (h-16)
- Main content: pt-16 to clear fixed header
- Footer: Simple, compact (py-8)

---

## Component Library

### Navigation
Top navigation bar with logo, Home/About Us/Matching links, subtle border-bottom

### Matching Page - Primary Focus
**Search Form:** 
- Card-based container with shadow
- Grid layout (2-column on desktop, 1-column mobile)
- Input fields for all specs: name, storage, ram, cpu, gpu, screen specs, weight, price, use-case, tier
- Dropdown selects for categorical data (tier, use-case)
- Number inputs with min/max for quantifiable specs
- Primary CTA button: "Find Best Match" (full-width mobile, auto desktop)

**Results Display:**
- Card grid (3-column desktop, 2-column tablet, 1-column mobile)
- Each laptop card shows: name (heading), all specs in clean rows, price prominent, tier badge
- Match score indicator at top-right of each card
- Hover state: subtle lift with shadow increase

### Home Page
**Hero Section:** 
- Clean, centered layout (h-96)
- Large heading: "Find Your Perfect Laptop"
- Subheading explaining the matching algorithm
- Primary CTA to Matching page
- Background: subtle gradient or tech-themed placeholder image

**Features Section:**
- 3-column grid showcasing: Smart Matching, Comprehensive Database, Best Price-Performance
- Icon + heading + brief description per feature

### About Us Page
**Content Layout:**
- Single column, max-w-3xl centered
- Mission statement section
- How It Works explanation with numbered steps
- Simple, readable text blocks with consistent spacing

### Form Components
- Use Shadcn input, select, and button components
- Labels above inputs, consistent spacing
- Error states with red border and text
- Disabled states clearly distinguished

### Data Display
- Spec rows: label (font-medium) + value (font-mono) in flex layout
- Dividers between spec groups
- Price: larger, bold, primary color
- Tier badges: rounded-full, px-3 py-1, different background per tier

---

## Images

**Hero Image:** Yes - use a high-quality tech/workspace image showing laptops
- Placement: Full-width background in hero section with overlay
- Treatment: Slightly darkened overlay for text contrast
- Buttons on hero: Implement backdrop-blur-sm on button backgrounds

**Product Images:** Laptop thumbnail placeholders in result cards (optional per card, aspect-video)

---

## Accessibility

- All form inputs include labels and aria-labels
- Sufficient contrast ratios for all text
- Focus states visible on all interactive elements
- Semantic HTML structure throughout
- Responsive tap targets (min 44px)

---

## Key Layout Notes

- Matching page is the primary user journey - invest most design effort here
- Results should be instantly comparable - consistent card structure essential
- Mobile-first responsive breakpoints: base, md (768px), lg (1024px)
- Use consistent vertical rhythm: sections separated by py-12 to py-16