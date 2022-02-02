class Searcher {

    searchStrict() {
        configuration.environments.forEach(function(env) {
            let filter = searcher.matchWithFilters(env);
            if(configuration.search.length >= 1) {
                let match = searcher.matchWithSearch(env, configuration.search);
                env.display = match && filter;
            } else {
                env.display = filter;
            }
        });
        renderer.render();
        $('#search').focus();
    }


    searchExtended() {
        let maximumLength = Math.max(...configuration.environments.map(env => utils.lengthOfMatching(env, configuration.search)));
        configuration.environments.forEach(env => env.display = searcher.matchWithSearchWithLongestCommonSubsequence(env, configuration.search, maximumLength) && searcher.matchWithFilters(env));
    }

    /**
     * @param {*} env
     * @returns {boolean} True if the env type matches the filters in the config
     */
    matchWithFilters(env) {
        let match;
        switch (env.type) {
            case "DEV":
                match = configuration.getFilterOption("dev");
                break;
            case "INT":
                match = configuration.getFilterOption("int");
                break;
            case "QA":
                match = configuration.getFilterOption("qa");
                break;
            case "PREPROD":
                match = configuration.getFilterOption("preprod");
                break;
            case "PROD":
                match = configuration.getFilterOption("prod");
                break;
            default:
                match = configuration.getFilterOption("others");
                break;
        }

        if(configuration.getFilterOption("aws")) {
            match = match && (env.provider === "AWS");
        }

        if(!configuration.getFilterOption("versions").includes("all")) {
            let occVersionParts = env.occVersion.split(".");
            match = match && configuration.getFilterOption("versions").includes(occVersionParts[0] + "." + occVersionParts[1]);
        }

        return match;
    }

    /**
     *
     * @param {*} env
     * @param {string} term
     * @returns {boolean} True if the term matches the Client ID or the name of the environment
     */
    matchWithSearch(env, term) {
        return (env.env.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
            env.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    /**
     * @param {*} env
     * @param {string} term
     * @param {number} maximumLength
     * @returns {boolean} True if the lengthOfMatching is equals to maximumLength
     */
    matchWithSearchWithLongestCommonSubsequence(env, term, maximumLength) {
        return utils.lengthOfMatching(env, term) === maximumLength;
    }
}

const searcher = new Searcher();