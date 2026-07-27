# Notebook Audit: Kasilag_Geronimo_IT31A.ipynb

## Overview
This memory document provides a detailed audit and summary of the data cleaning and exploratory data analysis (EDA) performed in `Kasilag_Geronimo_IT31A.ipynb`. The notebook primarily focuses on processing a movies dataset to prepare it for further analysis, culminating in visualizations and combined metrics.

## File Structure & Steps
The notebook is organized linearly, following a standard data science pipeline:

### 1. Initialization and Data Loading
- **Libraries Imported:** `pandas`, `numpy`, `matplotlib.pyplot`, `seaborn`.
- **Dataset:** Loads a movie dataset (originally from `movies.csv`), containing columns such as `MOVIES`, `YEAR`, `GENRE`, `RATING`, `VOTES`, and `Gross`.

### 2. Data Cleaning Transformations
Significant data cleaning is applied to correct formatting issues and convert string representations into usable numeric types.

*   **Duplicate Removal:** Basic deduplication on the dataset.
*   **`YEAR` Column:** Extracted valid 4-digit years using the regular expression `(\d{4})` to clean out extraneous characters (e.g., parentheses, roman numerals), and converted the column to numeric.
*   **`VOTES` Column:** Removed commas from the string values (e.g., "1,234" to "1234") and cast the column to numeric type.
*   **`Gross` Column:** 
    *   Removed `$` prefixes and `M` suffixes to extract raw numerical values.
    *   Converted to numeric type.
    *   **Audit Note:** The `Gross` column has a significant amount of missing data (observed ~9,539 nulls out of 9,999 rows).
*   **`GENRE` Column:** 
    *   Genres were originally stored as comma-separated lists (e.g., "Action, Adventure, Sci-Fi").
    *   The strings were split by commas and stripped of leading/trailing whitespaces.
    *   The `explode()` function was used to create a new column `GENRE_SINGLE`, transforming the data from a wide format to a long format where each movie-genre combination has its own row.

### 3. Exploratory Data Analysis (EDA)
Following the data cleaning, the notebook performs EDA to extract insights.

*   **Aggregations:** Grouped the data by `GENRE_SINGLE` to compute metrics such as:
    *   Average Rating
    *   Average Votes
    *   Average Gross Profitability
    *   Total number of titles per genre
*   **Visualizations:** Utilized `seaborn` and `matplotlib` to generate bar plots (e.g., average gross per genre using the "mako" palette).
*   **Combined Score Metric:** 
    *   Joined the rating summary and gross summary dataframes.
    *   Normalized the `avg_rating` and `avg_gross` on a scale of 0 to 1.
    *   Calculated a `combined_score` (average of the normalized rating and gross scores) to identify genres that are both highly rated and highly profitable (e.g., Musical, Adventure, Animation).

## Final Output
The structured and cleaned dataset is fully prepared for either exporting (e.g., `Cleaned_Dataset.csv`) or further machine learning tasks, with clean numeric columns and a normalized long-format genre structure.
