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

## Steps to Upddate
- With the xlsx copy, add data as desired, just make sure to have the above columns and value for the map
- Save the xlsx as a csv
- Open the csv in a text editor (e.g., Notepad)and copy the csv text
- Go to [csv on GitHub](https://github.com/Noznoc/breathe-easy/blob/master/data_DUMMY.csv) and click the pencil to edit the csv
- Paste the copied csv text
- "Commit changes", and a description of what you added

# Contribute
- `index.js`: JavaScript file for the interactive map (which uses the [Mapbox GL JS library](https://docs.mapbox.com/mapbox-gl-js/api/)) and the data download.
- `index.html`: HTML file, which has the text for the `#legend`.
- `index.css`: CSS file that modifies the style for the `#legend` and `#map`.

# Author
Julia Conzon
