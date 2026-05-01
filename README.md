# Tax-Hurdle: The Math of Tax-Efficiency

This project is an interactive web-based calculator that helps users understand the financial implications of tax-advantaged investment funds versus DIY (do-it-yourself) investment portfolios.

## How it Works

The calculator determines the **"hurdle rate"**—the annual return required for a DIY portfolio to break even with the performance of tax-advantaged funds after accounting for the tax benefits of the latter. It visualizes this by comparing the required DIY return against the fund's net return across different time horizons.

## Features

*   **Interactive Inputs:** Adjust your marginal tax bracket and the fund's net annual return.
*   **Visualizations:** A line chart displays the required DIY return over 1 to 30 years, with a benchmark line for the fund's net return.
*   **Break-Even Targets:** A dashboard shows the specific required DIY return percentage for 5, 10, 20, and 30-year periods.
*   **Mathematical Explanation:** Clear breakdown of the derivation behind the calculations, explaining the concepts of upfront subsidies, time dilution, and liquidity risk.
*   **Responsive Design:** Works across different screen sizes.

## Technologies Used

*   **HTML:** For structure and content.
*   **Tailwind CSS:** For styling and responsive design.
*   **JavaScript:** For interactivity, calculations, and chart rendering.
*   **Chart.js:** For creating the interactive line chart.

## How to Use

1.  **Adjust Tax Bracket:** Use the slider to set your marginal tax rate.
2.  **Set Fund Return:** Use the slider to input the net annual return of the tax-advantaged fund (after fees).
3.  **Analyze Chart & Dashboard:** Observe how the "Required DIY Return" line changes. The dashboard will update with specific break-even percentages for different investment horizons.
4.  **Understand the Math:** Refer to the "The Intuitive Concept" and "Mathematical Derivation" sections for a deeper understanding of why these hurdles exist.
