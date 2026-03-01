# What-is-Right-For-Me-Tool
# Starlink Customer Decision Tool – Prototype

## Overview
This is a fully functional, interactive prototype designed to guide potential Starlink customers through a simple, educational decision process. The tool helps users quickly identify the right service plan and hardware kit based on their specific needs, while clearly addressing common hesitations around installation, performance, and availability.

Built as a single-page web application using only vanilla HTML, CSS, and JavaScript, it requires **no build tools or server** to run — just open `index.html` in any browser.

## Business Goal
**Primary Objective**: Educate customers on Starlink services and products while seamlessly funneling them toward self-service ordering.

By presenting clear, benefit-focused information and an intuitive decision tree, the tool reduces customer uncertainty, minimizes support inquiries, and increases the likelihood of direct online purchases.

## Expected Benefits
- **Higher Conversion Rates**: Guided path from confusion to confident purchase.
- **Reduced Support Load**: Addresses common questions (installation, roaming, speeds, fees) upfront.
- **Improved Customer Experience**: Fast, mobile-friendly, educational flow that builds trust.
- **Scalable Foundation**: Ready for integration into starlink.com or as a starting point for a full React version.
- **Internal Value**: Demonstrates customer-centric thinking and rapid prototyping capability.

## Key Features
- Clean, Starlink-branded dark theme (mobile-first)
- Three entry points: Quiz, View Services, View Kits
- Interactive quiz with independent multi-select choices that invites customer participation
- Smart recommendation engine (Residential MAX prioritized unless “On the Go” is selected)
- Dedicated pages for Services, Kits, Installation, and Business
- Mock address-based availability & promotion checks
- Professional Installation and Starlink App guidance
- Fully responsive with clean navigation and Back buttons

## Technologies Used
- **HTML5** – Semantic structure
- **CSS3** – Mobile-first responsive design with Starlink aesthetic
- **Vanilla JavaScript** – All interactivity, state management, and logic (no frameworks)
- LocalStorage for persisting user choices during session

## How to Run Locally
1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Right-click `index.html` → **Open with Live Server** (recommended), or simply double-click the file to open in your browser.
4. No installation or build step required.

## File Structure

my-starlink-tool/
├── index.html
├── style.css
├── script.js
├── images/                  # All graphics (standard-dish.png, mini-kit.png, etc.)
└── README.md


## Future Enhancements (Potential Next Steps)
- Integration with real Starlink API for live availability & pricing
- React/Vite version for better scalability and component reuse
- Analytics tracking for user drop-off points
- A/B testing variations of the recommendation engine

---

**Built with initiative to drive customer self-service and business growth.**

Ready for review and discussion.

---

You can copy and paste this directly as `README.md` in your repo. It’s written in a polished, executive-friendly tone that highlights business value without sounding overly technical or casual.

Let me know if you’d like any tweaks (tone, length, or additional sections)! Great work on this project — it’s genuinely impressive. 🚀