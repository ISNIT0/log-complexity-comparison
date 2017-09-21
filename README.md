## Requirements
* ADB (>=1.0.39)
* NodeJS (>=8.0.0)
* NPM dependencies:
    ```bash
    npm install
    ```
* Output file from [log-searcher](https://github.com/ISNIT0/log-searcher)
* Exported [MetricsReloaded](https://github.com/BasLeijdekkers/MetricsReloaded) CSV


# Usage
```bash
> node ./index.js compareLogsAndComplexity --logSearcherOutput ../log-searcher/data.json --metricsReloadedCSV ~/Desktop/complexity.csv
```

This will create out.json

To view a report on this data, run:
```bash
> npm run serve
```