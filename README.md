Interactive Map for [Ecology Ottawa's Breathe Easy Project](https://ecologyottawa.ca/campaigns/active-city/breatheeasy/).

# Update Data
The data layers on the map are filtered based on the "Type" column in the `*.csv` file attached. **The following values must be entered in the "Type" column**:
- "Total Average"
- "Morning Average"
- "Afternoon Average"
- "Weekday Average"
- "Weekend Average"

When uploading new data, the following columns also must be included:
- "Site", with values "Site A" or "Site B"
- "Location", with a neighbourhood name that represent the location of the site
- "AQ_Map", with one of the following values: "Low Risk", "Moderate Risk", "High Risk", "Very High Risk"

# Contribute
- `index.js`: JavaScript file for the interactive map (which uses the [Mapbox GL JS library](https://docs.mapbox.com/mapbox-gl-js/api/)) and the data download.
- `index.html`: HTML file, which has the text for the `#legend`.
- `index.css`: CSS file that modifies the style for the `#legend` and `#map`.

# Author
Julia Conzon
