# SPA Architecture Design

## Overview
The website will be converted from multiple HTML pages to a single-page application (SPA) with the following characteristics:
- Single HTML file that loads all content dynamically
- Navigation menu that updates the content area without page reloads
- URL hash-based routing for bookmarkable pages
- Active state highlighting for current page in navigation
- Responsive design for both desktop and mobile

## Components

### 1. Main Container
- A single index.html file will serve as the container for all content
- Content area with ID "content-container" will be dynamically updated

### 2. Content Loader
- JavaScript function to fetch and load HTML content from page templates
- Content extraction mechanism to pull only the main content from each page
- Content caching to improve performance

### 3. Router
- Hash-based routing (#page-name) for navigation without page reloads
- URL monitoring to detect changes and update content accordingly
- History API integration for back/forward button support

### 4. Navigation
- Dynamic menu generation from page list
- Active state highlighting based on current page
- Mobile-responsive collapsible menu

## Implementation Approach

1. Create a central app.js file to handle:
   - Content loading
   - Routing
   - Navigation state management

2. Update navigation.js to:
   - Use event.preventDefault() on link clicks
   - Update URL hash instead of navigating to new page
   - Handle active state based on current hash

3. Extract content from individual HTML files:
   - Store in separate HTML fragments or
   - Load dynamically from original files and extract main content

4. Update index.html to:
   - Include all necessary scripts
   - Provide content container
   - Load initial content based on URL hash
