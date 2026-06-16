# Finance-And-Crypto-Checker
A sleek and responsivevweb application to track and pull the current market price and calculates the total volume directly from the CoinGecko API this dashboard allows users to dynamically swap between primary digital assets and view critical data points

**[Live Website Link](https://financeandcryptochecker.netlify.app/)**

Key Features

* **Real-Time Synchronized Metrics:** Tracks current price benchmarks, 24-hour shifting percentages, and rolling total market volumes.
* **Interactive Dynamic Data Charting:** Leverages **Chart.js** to map and animate 30-day historical trendlines with elegant visual metrics.
* **Performance-Driven Dual Streams:** Utilizes asynchronous `Promise.all` logic to fetch concurrent endpoints simultaneously, minimizing network latency.
* **Clean & Modern UI/UX:** Styled using CSS variable architectures with custom slate palettes, explicit layout structures, and intuitive typography feedback for price swings.
* **Fail-Safe API Resilience:** Implements structural response verification to gracefully intercept and handle external server throttling (Status Code `429`).

---

 Built With

* **Front-End:** Vanilla JavaScript (ES6+ Asynchronous Architecture), HTML5, CSS3 Custom Properties
* **Data Visualization:** Chart.js Library (via secure CDN)
* **Data Engine:** CoinGecko Public REST API (Keyless Demo Stream Integration)
* **Deployment & CI/CD:** GitHub, Netlify Continuous Deployment Pipeline

---

 File Structure

```text
index.html        # App interface structure and semantic layout
app.js            # Asynchronous data fetching, DOM state engine, & Chart.js configuration
style.css         # Modern dark-mode UI layout and responsive grid properties
.gitignore        # Keeps local developer dependencies and system cache localized
README.md         # Technical project documentation
