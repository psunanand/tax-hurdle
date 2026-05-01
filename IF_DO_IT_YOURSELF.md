# How to Build the Tax-Hurdle Calculator from Scratch

This guide outlines the steps to recreate the Tax-Hurdle calculator application from the ground up.

## Phase 1: Project Setup & Basic Structure

1.  **Create Project Directory:**
    ```bash
    mkdir Tax-Hurdle
    cd Tax-Hurdle
    ```

2.  **Create `index.html`:**
    Create an `index.html` file with the basic HTML5 boilerplate.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tax-Hurdle Calculator</title>
        <!-- Add CSS links here -->
    </head>
    <body>
        <!-- Project content will go here -->
        <script src="script.js"></script>
    </body>
    </html>
    ```

3.  **Create `script.js`:**
    Create an empty `script.js` file that will contain all the application logic.

## Phase 2: Styling with Tailwind CSS

1.  **Include Tailwind CSS:**
    The easiest way to include Tailwind CSS for a simple project like this is via CDN. Add the following `<script>` tag within the `<head>` of your `index.html`:

    ```html
    <script src="https://cdn.tailwindcss.com"></script>
    ```

2.  **Custom CSS:**
    You can add custom styles within a `<style>` tag in the `<head>` or in a separate `style.css` file.

    ```css
    /* Example custom styles */
    :root { /* Define variables */ }
    body { /* Base styles */ }
    .formula { /* Style for formulas */ }
    .tooltip { /* Style for tooltips */ }
    .lang-icon { /* Style for flag icons */ }
    .lang-icon.active { /* Style for active flag */ }
    ```

## Phase 3: Core JavaScript Logic

1.  **Get DOM Elements:**
    Get references to all the necessary HTML elements (sliders, output displays, canvas, etc.).

    ```javascript
    const taxInput = document.getElementById('taxInput');
    // ... other elements
    ```

2.  **Calculation Function:**
    Implement the core function to calculate the break-even hurdle rate.

    ```javascript
    function calculateHurdle(T, rf, n) {
        const T_dec = T / 100;
        const rf_dec = rf / 100;
        if (T_dec >= 1) return 100;
        const r_be = ( (1 + rf_dec) / Math.pow((1 - T_dec), (1 / n)) ) - 1;
        return (r_be * 100);
    }
    ```

3.  **Update Data Function:**
    Create a function that reads input values, performs calculations, updates the display, and prepares data for the chart.

    ```javascript
    function updateData() {
        // Read inputs
        // Calculate hurdle rates for different years
        // Update dashboard values
        // Update chart data
        hurdleChart.update();
    }
    ```

4.  **Chart.js Integration:**
    *   Include Chart.js via CDN in `index.html`.
    *   In `script.js`, initialize a Chart.js instance targeting the `<canvas>` element.
    *   Configure the chart with datasets for the DIY hurdle rate and the fund return.

    ```javascript
    function init() {
        const ctx = document.getElementById('hurdleChart').getContext('2d');
        hurdleChart = new Chart(ctx, {
            type: 'line',
            data: { /* ... chart data */ },
            options: { /* ... chart options */ }
        });
        // Add event listeners to inputs
        // Call updateData initially
    }
    ```

5.  **Event Listeners:**
    Attach event listeners (e.g., `input` event) to the sliders to trigger `updateData` whenever the values change.

## Phase 4: Content and UI Implementation

1.  **HTML Structure:**
    Build the complete HTML structure as seen in the current `index.html`, including:
    *   Header (with title, description, and language toggle elements if implemented).
    *   Sidebar for input controls.
    *   Main area for the chart and dashboard.
    *   Educational section with explanations and derivations.
    *   Footer.
    *   Ensure all elements intended for dynamic text updates have unique IDs.

2.  **Content Management (i18n - Optional but Recommended):**
    *   Define JavaScript objects (`contentEN`, `contentTH`) to hold all translatable strings.
    *   Implement a `setContent(lang)` function to update the UI based on the selected language.
    *   Add event listeners to language toggle elements (flags).

## Phase 5: Testing and Refinement

1.  **Cross-Browser Testing:** Test the application in different web browsers (Chrome, Firefox, Safari, Edge) to ensure compatibility.
2.  **Responsiveness:** Verify that the layout adapts correctly to various screen sizes (desktop, tablet, mobile).
3.  **Calculation Accuracy:** Double-check the calculations against manual examples.
4.  **User Experience:** Ensure the interactivity is smooth and intuitive.
