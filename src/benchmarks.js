/**
 * benchmarks.js
 *
 * Approximate CPC/CPM/CPA ranges by Country, Business Type (Retail, B2B), 
 * and Channel (Search, Social, Display, YouTube, Email).
 *
 * These are NOT official or exact numbers; they are ballpark figures 
 * based on public benchmarks and typical averages. Adjust as needed.
 */

export const benchmarksByCountry = {
    UK: {
      retail: {
        search:    { cpc: [0.8, 1.6], cpm: [8, 16],  cpa: [25, 45] },
        social:    { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [20, 35] },
        display:   { cpc: [0.3, 0.6], cpm: [3, 6],   cpa: [30, 50] },
        youtube:   { cpc: [0.6, 1.2], cpm: [6, 12],  cpa: [25, 45] },
        email:     { cpc: [0.1, 0.3], cpm: [1, 3],   cpa: [15, 35] },
      },
      b2b: {
        search:    { cpc: [2.5, 4.5], cpm: [15, 25], cpa: [55, 85] },
        social:    { cpc: [1.5, 3.0], cpm: [20, 35], cpa: [45, 75] },
        display:   { cpc: [0.8, 2.0], cpm: [8, 15],  cpa: [50, 95] },
        youtube:   { cpc: [1.5, 3.0], cpm: [10, 20], cpa: [60, 110] },
        email:     { cpc: [0.3, 0.7], cpm: [3, 8],   cpa: [25, 55] },
      },
    },
  
    Netherlands: {
      retail: {
        search:    { cpc: [0.7, 1.4], cpm: [7, 14],  cpa: [20, 40] },
        social:    { cpc: [0.4, 0.9], cpm: [4, 9],   cpa: [18, 32] },
        display:   { cpc: [0.25, 0.5], cpm: [2, 5],  cpa: [28, 48] },
        youtube:   { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [22, 42] },
        email:     { cpc: [0.1, 0.25], cpm: [1, 3],  cpa: [15, 30] },
      },
      b2b: {
        search:    { cpc: [2.2, 4.0], cpm: [12, 22], cpa: [50, 80] },
        social:    { cpc: [1.3, 2.8], cpm: [18, 30], cpa: [40, 70] },
        display:   { cpc: [0.8, 1.8], cpm: [7, 14],  cpa: [45, 90] },
        youtube:   { cpc: [1.3, 2.8], cpm: [8, 16],  cpa: [55, 100] },
        email:     { cpc: [0.3, 0.6], cpm: [3, 7],   cpa: [25, 50] },
      },
    },
  
    Belgium: {
      retail: {
        search:    { cpc: [0.7, 1.4], cpm: [7, 14],  cpa: [20, 40] },
        social:    { cpc: [0.4, 0.9], cpm: [4, 9],   cpa: [18, 32] },
        display:   { cpc: [0.25, 0.5], cpm: [2, 5],  cpa: [28, 48] },
        youtube:   { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [22, 42] },
        email:     { cpc: [0.1, 0.25], cpm: [1, 3],  cpa: [15, 30] },
      },
      b2b: {
        search:    { cpc: [2.2, 4.0], cpm: [12, 22], cpa: [50, 80] },
        social:    { cpc: [1.3, 2.8], cpm: [18, 30], cpa: [40, 70] },
        display:   { cpc: [0.8, 1.8], cpm: [7, 14],  cpa: [45, 90] },
        youtube:   { cpc: [1.3, 2.8], cpm: [8, 16],  cpa: [55, 100] },
        email:     { cpc: [0.3, 0.6], cpm: [3, 7],   cpa: [25, 50] },
      },
    },
  
    France: {
      retail: {
        search:    { cpc: [0.7, 1.4], cpm: [7, 14],  cpa: [20, 40] },
        social:    { cpc: [0.4, 0.9], cpm: [4, 9],   cpa: [18, 32] },
        display:   { cpc: [0.25, 0.5], cpm: [2, 5],  cpa: [25, 45] },
        youtube:   { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [22, 42] },
        email:     { cpc: [0.1, 0.3], cpm: [1, 3],   cpa: [15, 35] },
      },
      b2b: {
        search:    { cpc: [2.0, 4.0], cpm: [12, 22], cpa: [50, 80] },
        social:    { cpc: [1.3, 2.8], cpm: [15, 30], cpa: [40, 70] },
        display:   { cpc: [0.8, 1.8], cpm: [7, 14],  cpa: [45, 85] },
        youtube:   { cpc: [1.3, 2.8], cpm: [8, 16],  cpa: [55, 100] },
        email:     { cpc: [0.3, 0.6], cpm: [3, 7],   cpa: [25, 50] },
      },
    },
  
    Italy: {
      retail: {
        search:    { cpc: [0.6, 1.3], cpm: [6, 13],  cpa: [18, 35] },
        social:    { cpc: [0.4, 0.8], cpm: [4, 8],   cpa: [15, 30] },
        display:   { cpc: [0.2, 0.45], cpm: [2, 4],  cpa: [25, 42] },
        youtube:   { cpc: [0.4, 0.9], cpm: [4, 9],   cpa: [20, 38] },
        email:     { cpc: [0.1, 0.25], cpm: [1, 3],  cpa: [14, 30] },
      },
      b2b: {
        search:    { cpc: [1.8, 3.8], cpm: [10, 20], cpa: [45, 75] },
        social:    { cpc: [1.2, 2.5], cpm: [14, 28], cpa: [35, 65] },
        display:   { cpc: [0.7, 1.5], cpm: [6, 12],  cpa: [40, 85] },
        youtube:   { cpc: [1.2, 2.5], cpm: [7, 15],  cpa: [50, 90] },
        email:     { cpc: [0.3, 0.6], cpm: [2, 6],   cpa: [25, 45] },
      },
    },
  
    Spain: {
      retail: {
        search:    { cpc: [0.6, 1.2], cpm: [6, 12],  cpa: [18, 35] },
        social:    { cpc: [0.4, 0.8], cpm: [4, 8],   cpa: [15, 28] },
        display:   { cpc: [0.2, 0.4], cpm: [2, 4],   cpa: [25, 40] },
        youtube:   { cpc: [0.4, 0.9], cpm: [4, 9],   cpa: [20, 38] },
        email:     { cpc: [0.1, 0.25], cpm: [1, 3],  cpa: [14, 30] },
      },
      b2b: {
        search:    { cpc: [1.8, 3.5], cpm: [10, 20], cpa: [45, 75] },
        social:    { cpc: [1.2, 2.5], cpm: [14, 28], cpa: [35, 65] },
        display:   { cpc: [0.7, 1.5], cpm: [6, 12],  cpa: [40, 85] },
        youtube:   { cpc: [1.2, 2.5], cpm: [7, 15],  cpa: [50, 90] },
        email:     { cpc: [0.3, 0.6], cpm: [2, 6],   cpa: [25, 45] },
      },
    },
  
    Germany: {
      retail: {
        search:    { cpc: [0.8, 1.6], cpm: [8, 16],  cpa: [25, 45] },
        social:    { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [20, 35] },
        display:   { cpc: [0.3, 0.6], cpm: [3, 6],   cpa: [30, 50] },
        youtube:   { cpc: [0.6, 1.2], cpm: [6, 12],  cpa: [25, 45] },
        email:     { cpc: [0.1, 0.3], cpm: [1, 3],   cpa: [15, 35] },
      },
      b2b: {
        search:    { cpc: [2.5, 4.5], cpm: [15, 25], cpa: [55, 85] },
        social:    { cpc: [1.5, 3.0], cpm: [20, 35], cpa: [45, 75] },
        display:   { cpc: [0.8, 2.0], cpm: [8, 15],  cpa: [50, 95] },
        youtube:   { cpc: [1.5, 3.0], cpm: [10, 20], cpa: [60, 110] },
        email:     { cpc: [0.3, 0.7], cpm: [3, 8],   cpa: [25, 55] },
      },
    },
  
    Sweden: {
      retail: {
        search:    { cpc: [0.8, 1.6], cpm: [8, 16],  cpa: [25, 45] },
        social:    { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [20, 35] },
        display:   { cpc: [0.3, 0.6], cpm: [3, 6],   cpa: [30, 50] },
        youtube:   { cpc: [0.6, 1.2], cpm: [6, 12],  cpa: [25, 45] },
        email:     { cpc: [0.1, 0.3], cpm: [1, 3],   cpa: [15, 35] },
      },
      b2b: {
        search:    { cpc: [2.5, 4.5], cpm: [15, 25], cpa: [55, 85] },
        social:    { cpc: [1.5, 3.0], cpm: [20, 35], cpa: [45, 75] },
        display:   { cpc: [0.8, 2.0], cpm: [8, 15],  cpa: [50, 95] },
        youtube:   { cpc: [1.5, 3.0], cpm: [10, 20], cpa: [60, 110] },
        email:     { cpc: [0.3, 0.7], cpm: [3, 8],   cpa: [25, 55] },
      },
    },
  
    Norway: {
      retail: {
        search:    { cpc: [0.9, 1.7], cpm: [9, 17],  cpa: [28, 48] },
        social:    { cpc: [0.55, 1.1], cpm: [5.5, 11], cpa: [22, 38] },
        display:   { cpc: [0.35, 0.65], cpm: [3.5, 6.5], cpa: [32, 52] },
        youtube:   { cpc: [0.65, 1.3], cpm: [6.5, 13], cpa: [28, 48] },
        email:     { cpc: [0.15, 0.35], cpm: [1.5, 3.5], cpa: [18, 38] },
      },
      b2b: {
        search:    { cpc: [2.7, 4.7], cpm: [16, 26], cpa: [60, 90] },
        social:    { cpc: [1.6, 3.2], cpm: [22, 38], cpa: [48, 78] },
        display:   { cpc: [0.9, 2.1], cpm: [9, 16],  cpa: [55, 100] },
        youtube:   { cpc: [1.6, 3.2], cpm: [11, 21], cpa: [65, 115] },
        email:     { cpc: [0.35, 0.75], cpm: [3.5, 8.5], cpa: [28, 58] },
      },
    },
  
    Denmark: {
      retail: {
        search:    { cpc: [0.8, 1.6], cpm: [8, 16],  cpa: [25, 45] },
        social:    { cpc: [0.5, 1.0], cpm: [5, 10],  cpa: [20, 35] },
        display:   { cpc: [0.3, 0.6], cpm: [3, 6],   cpa: [30, 50] },
        youtube:   { cpc: [0.6, 1.2], cpm: [6, 12],  cpa: [25, 45] },
        email:     { cpc: [0.1, 0.3], cpm: [1, 3],   cpa: [15, 35] },
      },
      b2b: {
        search:    { cpc: [2.5, 4.5], cpm: [15, 25], cpa: [55, 85] },
        social:    { cpc: [1.5, 3.0], cpm: [20, 35], cpa: [45, 75] },
        display:   { cpc: [0.8, 2.0], cpm: [8, 15],  cpa: [50, 95] },
        youtube:   { cpc: [1.5, 3.0], cpm: [10, 20], cpa: [60, 110] },
        email:     { cpc: [0.3, 0.7], cpm: [3, 8],   cpa: [25, 55] },
      },
    },
  };
  