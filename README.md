## Requirements
* ADB (>=1.0.39)
* NodeJS (>=8.0.0)
* NPM dependencies:
    ```bash
    npm install
    ```
* Output file from [log-searcher](https://github.com/ISNIT0/log-searcher)
* Exported [MetricsReloaded](https://github.com/BasLeijdekkers/MetricsReloaded) CSV


## Usage
```bash
> node ./index.js compareLogsAndComplexity --logSearcherOutput ../log-searcher/data.json --metricsReloadedCSV ~/Desktop/complexity.csv
```

This will create out.json

To view a report on this data, run:
```bash
> npm run serve
```


## Purpose
This tool helps find complex code that does not have much logging to back it up.
It was originally built to help with research done by Julian Harty and Joseph Reeve on logging placement.
The output is a JSON file and an HTML report, describing which files need more logging attention.