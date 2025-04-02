import React, { useState, useEffect } from 'react';
// 1) Import your country-specific benchmark data:
import { benchmarksByCountry } from './benchmarks';

/**
 * Example channel data. Each channel has:
 *  - name
 *  - allocation percentage for each objective
 *  - metrics for "retail" and "b2b", each with cpc, cpm, cpa
 */
const initialChannels = {
  search: {
    name: "Search Ads",
    allocation: {
      awareness: 25,
      conversion: 35,
      brand: 30,
    },
    metrics: {
      retail: { cpc: 1.0, cpm: 8.0, cpa: 25.0 },
      b2b: { cpc: 3.0, cpm: 18.0, cpa: 60.0 },
    },
  },
  social: {
    name: "Social Ads",
    allocation: {
      awareness: 30,
      conversion: 25,
      brand: 35,
    },
    metrics: {
      retail: { cpc: 0.5, cpm: 5.0, cpa: 20.0 },
      b2b: { cpc: 2.0, cpm: 25.0, cpa: 50.0 },
    },
  },
  display: {
    name: "Display",
    allocation: {
      awareness: 20,
      conversion: 15,
      brand: 15,
    },
    metrics: {
      retail: { cpc: 0.3, cpm: 3.0, cpa: 30.0 },
      b2b: { cpc: 1.5, cpm: 10.0, cpa: 70.0 },
    },
  },
  youtube: {
    name: "YouTube",
    allocation: {
      awareness: 15,
      conversion: 15,
      brand: 15,
    },
    metrics: {
      retail: { cpc: 0.7, cpm: 6.0, cpa: 25.0 },
      b2b: { cpc: 2.5, cpm: 12.0, cpa: 80.0 },
    },
  },
  email: {
    name: "Email",
    allocation: {
      awareness: 10,
      conversion: 10,
      brand: 5,
    },
    metrics: {
      retail: { cpc: 0.2, cpm: 2.0, cpa: 15.0 },
      b2b: { cpc: 0.6, cpm: 5.0, cpa: 25.0 },
    },
  },
};

export default function InteractiveBudgetCalculator() {
  // Tabs state
  const [activeTab, setActiveTab] = useState("allocation");

  // Basic form states
  const [businessType, setBusinessType] = useState("retail");
  const [objective, setObjective] = useState("awareness");
  const [budget, setBudget] = useState(1000);

  // 2) Add a country selector state
  const [country, setCountry] = useState("UK");

  // Channel data
  const [channels, setChannels] = useState(initialChannels);

  // History of allocations
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("budgetHistory"));
      if (Array.isArray(savedHistory)) {
        setHistory(savedHistory);
      }
    } catch (err) {
      console.warn("Failed to parse history from localStorage.");
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("budgetHistory", JSON.stringify(history));
  }, [history]);

  // Update metric for a given channel & business type
  const updateChannelMetric = (key, type, metricName, newValue) => {
    setChannels((prev) => {
      const updated = { ...prev };
      const channel = updated[key];
      if (!channel) return prev;
      const numericValue = parseFloat(newValue) || 0;
      updated[key] = {
        ...channel,
        metrics: {
          ...channel.metrics,
          [type]: {
            ...channel.metrics[type],
            [metricName]: numericValue,
          },
        },
      };
      return updated;
    });
  };

  // Update the default allocation for a given channel & objective
  const updateChannelAllocation = (key, obj, newValue) => {
    setChannels((prev) => {
      const updated = { ...prev };
      const channel = updated[key];
      if (!channel) return prev;
      const numericValue = parseFloat(newValue) || 0;
      updated[key] = {
        ...channel,
        allocation: {
          ...channel.allocation,
          [obj]: numericValue,
        },
      };
      return updated;
    });
  };

  // 3) A helper to load default benchmarks from benchmarksByCountry
  const loadBenchmarks = () => {
    // Make sure we actually have data for this country and business type
    const countryData = benchmarksByCountry[country] || {};
    const btData = countryData[businessType] || {};

    // We'll pick the midpoint of the CPC/CPM/CPA range
    // and update each channel in 'channels' to reflect that.
    setChannels((prevChannels) => {
      const newChannels = { ...prevChannels };

      Object.entries(newChannels).forEach(([channelKey, channelObj]) => {
        // Does the benchmarks file have data for the channel?
        // (channelKey might be "search", "social", etc.)
        const channelBench = btData[channelKey];
        if (channelBench) {
          // channelBench is something like { cpc: [0.8,1.6], cpm: [8,16], cpa: [25,45] }
          // We'll pick midpoint if they exist, otherwise keep the old value
          const cpcRange = channelBench.cpc || [channelObj.metrics[businessType].cpc];
          const cpmRange = channelBench.cpm || [channelObj.metrics[businessType].cpm];
          const cpaRange = channelBench.cpa || [channelObj.metrics[businessType].cpa];

          const cpcMid = (cpcRange[0] + (cpcRange[1] || cpcRange[0])) / 2;
          const cpmMid = (cpmRange[0] + (cpmRange[1] || cpmRange[0])) / 2;
          const cpaMid = (cpaRange[0] + (cpaRange[1] || cpaRange[0])) / 2;

          newChannels[channelKey].metrics[businessType].cpc = +cpcMid.toFixed(2);
          newChannels[channelKey].metrics[businessType].cpm = +cpmMid.toFixed(2);
          newChannels[channelKey].metrics[businessType].cpa = +cpaMid.toFixed(2);
        }
      });

      return newChannels;
    });
    alert(`Loaded default ${businessType.toUpperCase()} benchmarks for ${country}`);
  };

  // Calculate how to distribute budget
  const calculateAllocation = () => {
    // Sum of all channels' allocation for this objective
    let totalPerc = 0;
    Object.values(channels).forEach((channel) => {
      totalPerc += channel.allocation[objective] || 0;
    });

    // If sum is 0, avoid division by zero
    if (totalPerc === 0) {
      alert("Your total allocation percentages for this objective are 0!");
      return;
    }

    const newAllocation = Object.values(channels).map((channel) => {
      const perc = channel.allocation[objective];
      const fraction = perc / totalPerc;
      const amount = budget * fraction;
      return {
        channel: channel.name,
        amount,
        percentage: `${perc}%`,
      };
    });

    // Save to history
    const entry = {
      date: new Date().toISOString(),
      budget,
      businessType,
      objective,
      allocation: newAllocation,
    };
    setHistory((prev) => [entry, ...prev]);
    alert("Allocation calculated and saved to history!");
  };

  // Export functionality (simple JSON export)
  const handleExport = () => {
    const dataStr = JSON.stringify({ channels, history }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "budget_calculator_data.json";
    link.href = url;
    link.click();
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 1200, margin: "0 auto" }}>
      <h1>Interactive Budget Calculator</h1>
      <nav style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("allocation")}
          style={{
            marginRight: 8,
            fontWeight: activeTab === "allocation" ? "bold" : "normal",
          }}
        >
          Allocation
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          style={{
            marginRight: 8,
            fontWeight: activeTab === "metrics" ? "bold" : "normal",
          }}
        >
          Metrics
        </button>
        <button
          onClick={() => setActiveTab("history")}
          style={{
            marginRight: 8,
            fontWeight: activeTab === "history" ? "bold" : "normal",
          }}
        >
          History
        </button>
      </nav>

      {activeTab === "allocation" && (
        <div>
          <h2>Budget Allocation</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ marginRight: 8 }}>Total Budget (€):</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
              style={{ width: "120px", marginRight: 16 }}
            />

            <label style={{ marginRight: 8 }}>Business Type:</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              style={{ marginRight: 16 }}
            >
              <option value="retail">Retail</option>
              <option value="b2b">B2B</option>
            </select>

            <label style={{ marginRight: 8 }}>Objective:</label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            >
              <option value="awareness">Awareness</option>
              <option value="conversion">Conversion</option>
              <option value="brand">Brand</option>
            </select>
          </div>

          {/* Channel Allocation Editor */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {Object.entries(channels).map(([key, channel]) => (
              <div
                key={key}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: 16,
                }}
              >
                <strong>{channel.name}</strong>
                <div style={{ marginTop: 8 }}>
                  <label style={{ marginRight: 4 }}>Allocation (%)</label>
                  <input
                    type="number"
                    value={channel.allocation[objective]}
                    onChange={(e) =>
                      updateChannelAllocation(key, objective, e.target.value)
                    }
                    style={{ width: "60px" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={calculateAllocation}
            style={{ marginTop: 16, padding: "8px 16px" }}
          >
            Calculate Allocation
          </button>

          <button
            onClick={handleExport}
            style={{ marginTop: 16, marginLeft: 16, padding: "8px 16px" }}
          >
            Export Data (JSON)
          </button>
        </div>
      )}

      {activeTab === "metrics" && (
        <div>
          <h2>Channel Metrics</h2>

          {/* 4) Let user pick Country and Business Type */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ marginRight: 8 }}>Country:</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ marginRight: 16 }}
            >
              {/* List your countries from benchmarksByCountry keys */}
              {Object.keys(benchmarksByCountry).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label style={{ marginRight: 8 }}>Business Type:</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="retail">Retail</option>
              <option value="b2b">B2B</option>
            </select>

            {/* Button to load default benchmarks */}
            <button
              onClick={loadBenchmarks}
              style={{ marginLeft: 16, padding: "4px 8px" }}
            >
              Load Default Benchmarks
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {Object.entries(channels).map(([key, channel]) => (
              <div
                key={key}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: 16,
                }}
              >
                <strong>{channel.name}</strong>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {businessType.toUpperCase()} metrics
                </p>

                <div style={{ marginTop: 8 }}>
                  <label style={{ marginRight: 4 }}>CPC (€)</label>
                  <input
                    type="number"
                    value={channel.metrics[businessType].cpc}
                    step="0.1"
                    min="0"
                    onChange={(e) =>
                      updateChannelMetric(key, businessType, "cpc", e.target.value)
                    }
                    style={{ width: "80px" }}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <label style={{ marginRight: 4 }}>CPM (€)</label>
                  <input
                    type="number"
                    value={channel.metrics[businessType].cpm}
                    step="0.1"
                    min="0"
                    onChange={(e) =>
                      updateChannelMetric(key, businessType, "cpm", e.target.value)
                    }
                    style={{ width: "80px" }}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <label style={{ marginRight: 4 }}>CPA (€)</label>
                  <input
                    type="number"
                    value={channel.metrics[businessType].cpa}
                    step="0.1"
                    min="0"
                    onChange={(e) =>
                      updateChannelMetric(key, businessType, "cpa", e.target.value)
                    }
                    style={{ width: "80px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <h2>Allocation History</h2>
          {history.length === 0 ? (
            <p>No allocations saved yet.</p>
          ) : (
            history.map((entry, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: 16,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  {new Date(entry.date).toLocaleString()}
                </div>
                <div style={{ marginTop: 4 }}>
                  <strong>
                    €{entry.budget} - {entry.businessType.toUpperCase()} -{" "}
                    {entry.objective.toUpperCase()}
                  </strong>
                </div>
                <ul style={{ marginTop: 8, paddingLeft: 16 }}>
                  {entry.allocation.map((alloc, i) => (
                    <li key={i}>
                      {alloc.channel}: €{alloc.amount.toFixed(2)} ({alloc.percentage})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
