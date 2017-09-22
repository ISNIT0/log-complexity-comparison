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

Code complexity is known to be a good indicator of bugs, and logging is known to make debugging and bug tracking easier. It stands to reason we should consistently log our complex code, especially in large systems.


## Thoughts from application
Having looked at results in detail and attempted to use them to improve logging, it seems this specific heuristic on it's own is not 100% helpful. Some code may be quite readable (e.g. using function chaining and RXJava), but appear to the complexity algorithm to be difficult to read. In order to fully assess this, a wider variety of apps and code-bases will need to be tested.

Often, logging is more useful before and after 'complex' code, I.e. outside of class code, before a method is called. (e.g. "Operation Complete", progressBar.setProgress(100))

The complexity we're currently doing, is just based on file. Not per class, or per method. This means that we may have a large file, with low complexity code flagging as un-readable.

Sometimes the complexity is from if-statements deciding which log message to print or show the user.

We had real issues with getting huge complexity numbers for simple (but large) switch statements.
A K9mail method was given a complexity of over 400, just for having a long switch statement.