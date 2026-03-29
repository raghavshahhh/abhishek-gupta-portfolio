# Bugfix Requirements Document

## Introduction

This document addresses multiple organizational, performance, and accessibility issues found in the portfolio website audit. The portfolio is a single-page HTML application deployed on Vercel featuring a Flutter engineer's work. While the visual design and animations work correctly, the codebase suffers from structural inefficiencies, duplicate files, performance bottlenecks, and accessibility concerns that need systematic resolution without breaking existing functionality.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the project structure is examined THEN the system contains an empty `src/` directory with nested folders (app/sections, components/layout, components/sections, lib/db, lib/validations) that serve no purpose

1.2 WHEN CV files are reviewed THEN the system contains both `Abhishek Gupta CV.pdf` and `Abhishek_Gupta_CV.pdf` causing confusion about which file is current

1.3 WHEN the HTML file is loaded THEN the system loads 6 external CDN libraries (Tailwind, GSAP, ScrollTrigger, Lenis, Font Awesome, Google Fonts) without optimization

1.4 WHEN the HTML file is analyzed THEN the system contains 900+ lines of inline CSS within the `<style>` tag instead of an external stylesheet

1.5 WHEN the HTML file is analyzed THEN the system contains all JavaScript inline (approximately 400+ lines) instead of external JS files

1.6 WHEN the HTML file is measured THEN the system has 1,957 total lines in a single file with no modular structure

1.7 WHEN the page loads THEN the system has no minification or bundling of assets leading to slower load times

1.8 WHEN assistive technologies interact with the custom cursor THEN the system's custom cursor interferes with screen readers and keyboard navigation

1.9 WHEN interactive elements are examined THEN the system is missing ARIA labels on buttons, links, and interactive cards

1.10 WHEN the sitemap.xml is reviewed THEN the system shows lastmod date as 2026-03-27 (a future date) instead of a current or past date

1.11 WHEN SEO meta tags are examined THEN the system is missing additional meta tags for improved discoverability (theme-color, canonical URL, etc.)

### Expected Behavior (Correct)

2.1 WHEN the project structure is examined THEN the system SHALL have a clean folder structure with either removed empty folders or properly utilized folders for external CSS/JS files

2.2 WHEN CV files are reviewed THEN the system SHALL contain only one CV file with consistent naming (`Abhishek_Gupta_CV.pdf`)

2.3 WHEN the HTML file is loaded THEN the system SHALL maintain the 6 CDN libraries with proper preconnect/dns-prefetch hints for performance optimization

2.4 WHEN the HTML file is analyzed THEN the system SHALL have CSS extracted to an external `styles.css` file for better caching and organization

2.5 WHEN the HTML file is analyzed THEN the system SHALL have JavaScript extracted to an external `script.js` file for better caching and organization

2.6 WHEN the HTML file is measured THEN the system SHALL have a reduced HTML file (under 500 lines) with modular external resources

2.7 WHEN the page loads THEN the system SHALL have optimized asset loading with proper resource hints (preload, prefetch) for critical resources

2.8 WHEN assistive technologies interact with the page THEN the system SHALL provide an option to disable custom cursor or ensure it doesn't interfere with assistive technologies

2.9 WHEN interactive elements are examined THEN the system SHALL include proper ARIA labels (aria-label, aria-labelledby) on all interactive elements including navigation links, buttons, project cards, and social links

2.10 WHEN the sitemap.xml is reviewed THEN the system SHALL show a current or recent past date in the lastmod field (e.g., 2025-01-15)

2.11 WHEN SEO meta tags are examined THEN the system SHALL include additional meta tags including theme-color, canonical URL, and proper Open Graph images

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the page is loaded THEN the system SHALL CONTINUE TO display all visual design elements exactly as before (colors, gradients, glass effects, animations)

3.2 WHEN users interact with animations THEN the system SHALL CONTINUE TO execute all GSAP animations, scroll triggers, and Lenis smooth scrolling identically

3.3 WHEN the phone mockup is viewed THEN the system SHALL CONTINUE TO display the 3D phone mockup with floating icons and app scroll animation

3.4 WHEN users navigate the site THEN the system SHALL CONTINUE TO provide smooth scrolling, mobile menu functionality, and anchor link navigation

3.5 WHEN the page is viewed on mobile devices THEN the system SHALL CONTINUE TO maintain full mobile responsiveness with all breakpoints working correctly

3.6 WHEN users hover over elements THEN the system SHALL CONTINUE TO show hover effects on cards, buttons, and links

3.7 WHEN the stats section is scrolled into view THEN the system SHALL CONTINUE TO animate the counter numbers

3.8 WHEN the timeline section is viewed THEN the system SHALL CONTINUE TO animate the timeline path drawing and item reveals

3.9 WHEN particles are rendered THEN the system SHALL CONTINUE TO display the particle animation canvas with connections

3.10 WHEN the custom cursor is active on desktop THEN the system SHALL CONTINUE TO show the custom cursor with hover scale effects (unless disabled for accessibility)

3.11 WHEN external links are clicked THEN the system SHALL CONTINUE TO open Play Store, App Store, GitHub, and LinkedIn links in new tabs

3.12 WHEN the download resume button is clicked THEN the system SHALL CONTINUE TO download the CV file correctly
