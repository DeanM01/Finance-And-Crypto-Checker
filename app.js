const priceElement = document.getElementById("current-price");
const changeElement = document.getElementById("price-change");
const volumeElement = document.getElementById("market-volume");
const coinSelect = document.getElementById("coin-select");

// Instead of a hardcoded string, check the system environment config
const apiKey = window.env?.COINGECKO_API_KEY || "DEVELOPMENT_FALLBACK";
let priceChart = null; // Keeps track of our chart instance so we can destroy/rebuild it on asset swap

// --- Fetch Market Stats & Historical Trend ---
async function updateDashboard(selectedCoin) {
    const statsURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoin}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;
    const chartURL = `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=30&interval=daily`;

    try {
        // Fetch both endpoints simultaneously to maximize performance
        const [statsResponse, chartResponse] = await Promise.all([
            fetch(statsURL, { headers: { 'x-cg-demo-api-key': apiKey } }),
            fetch(chartURL, { headers: { 'x-cg-demo-api-key': apiKey } })
        ]);

        const statsData = await statsResponse.json();
        const chartData = await chartResponse.json();
        
        const coinData = statsData[0];

        // 1. Update Card Metrics
        priceElement.textContent = `$${coinData.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        volumeElement.textContent = `$${coinData.total_volume.toLocaleString()}`;
        
        const changePercent = coinData.price_change_percentage_24h;
        changeElement.textContent = `${changePercent.toFixed(2)}%`;
        changeElement.style.color = changePercent >= 0 ? "var(--success)" : "#ef4444";

        // 2. Process Data Arrays for Chart.js
        // CoinGecko structure sends arrays of [timestamp, price]. We map them out split.
        const labels = chartData.prices.map(dataPoint => {
            const date = new Date(dataPoint[0]);
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        });
        const prices = chartData.prices.map(dataPoint => dataPoint[1]);

        // 3. Render the Line Chart
        renderLineChart(labels, prices, coinData.name);

    } catch (error) {
        console.error("Error syncing dashboard updates:", error);
    }
}

// --- Render Chart.js Architecture ---
function renderLineChart(labels, dataPoints, coinName) {
    const ctx = document.getElementById('cryptoChart').getContext('2d');

    // If a chart already exists from a previous selection, destroy it before rendering a new one
    if (priceChart) {
        priceChart.destroy();
    }

    // Build the visual configuration object
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${coinName} Price (USD)`,
                data: dataPoints,
                borderColor: '#38bdf8', /* Cyan Accent */
                backgroundColor: 'rgba(56, 189, 248, 0.05)',
                borderWidth: 2,
                pointRadius: 0, /* Removes bulky visual dots for clean lines */
                pointHoverRadius: 6,
                fill: true,
                tension: 0.2 /* Adds elegant slight smoothing to graph lines */
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } /* Keeps layout modern and clutter-free */
            },
            scales: {
                x: {
                    grid: { color: 'rgba(51, 65, 85, 0.3)' },
                    ticks: { color: '#94a3b8', font: { family: 'Inter' } }
                },
                y: {
                    grid: { color: 'rgba(51, 65, 85, 0.3)' },
                    ticks: { color: '#94a3b8', font: { family: 'Inter' } }
                }
            }
        }
    });
}

// --- Event Listeners ---
coinSelect.addEventListener("change", (e) => updateDashboard(e.target.value));
updateDashboard("bitcoin");