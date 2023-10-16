module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/e2e/features/"
        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/e2e/steps/*.js",
            "src/e2e/hooks/hooks.js"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    }
}