const csv = require('csv');
const yargs = require('yargs');

const path = require('path');
const fs = require('fs');

yargs
    .command(
        'compareLogsAndComplexity',
        'Send HTTP message to specified CAAS server', {
            logSearcherOutput: {
                require: true,
                describe: 'Path to data.json file generated by ISNIT0/log-searcher',
                coerce: function (jsonPath) {
                    const filePath = path.resolve(__dirname, jsonPath);
                    console.info(`Reading log-searcher data from [${filePath}]`);
                    return require(filePath);
                }
            },
            metricsReloadedCSV: {
                require: true,
                describe: 'Path to CSV output of MetricsReloaded export of package',
                coerce: function (csvPath) {
                    const filePath = path.resolve(__dirname, csvPath);
                    console.info(`Reading MetricsReloaded data from [${filePath}]`);
                    const csvFile = fs.readFileSync(filePath, 'utf8');
                    const body = csvFile.split(/\n/).slice(1).join('\n');
                    const [Method, Class, Package, Module, Project] = body.split('\n\n');

                    const header = Class.split('\n')[0].split(',');
                    const ClassBody = Class.split('\n').slice(1);
                    return ClassBody
                        .map((line) => {
                            const sLine = line.split(',');
                            return header.reduce((acc, key, index) => {
                                if (sLine[index] === 'n/a') {
                                    sLine[index] = 'null';
                                }
                                acc[key] = JSON.parse(sLine[index]);
                                return acc;
                            }, {});
                        });
                }
            }
        },
        compareLogsAndComplexity
    )
    .help()
    .argv;


function compareLogsAndComplexity({
    logSearcherOutput: logs,
    metricsReloadedCSV: metrics
}) {
    console.info(`Successfully read logs and [${metrics.length}] metric entries`);
    const fileNamesXClassNames = Object.keys(logs.data)
        .reduce((acc, fileName) => {
            const className = fileName.split('/').slice(-1)[0].split('.java')[0];
            acc[className] = fileName;
            return acc;
        }, {});


    const out = metrics
        .map(({
            Class,
            OCavg,
            WMC
        }) => {
            const tlcn = Class.split('.').slice(-1)[0];
            const fileName = fileNamesXClassNames[tlcn];
            if (!fileName) return null;
            const numberOfLogs = logs.data[fileName].length;
            return {
                complexity: WMC,
                class: Class,
                file: fileName,
                numberOfLogs,
                attentionRequiredScore: (WMC || 0) / (numberOfLogs || 1)
            };
        })
        .filter(a => a)
        .sort((a, b) => a.attentionRequiredScore < b.attentionRequiredScore ? 1 : -1);

    const outPath = path.resolve(__dirname, './out.json');
    console.info(`Writing output to [${outPath}]`);

    fs.writeFileSync(outPath, JSON.stringify(out), 'utf8');
}