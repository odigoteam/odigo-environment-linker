class Utils {
    isNotEmpty(string) {
        return !!string;
    }

    /**
     *
     * @param {Array} envs
     * @returns {boolean} True if all env is not displayed
     */
    nothingDisplayed(envs) {
        return envs.every(env => !env.display);
    }

    /**
     * Calculate the length of the longest common subsequence for Client ID with the given term and for the name with the given term.
     *
     * @param {*} env
     * @param {string} term
     * @returns {number} The maximum between the two calculated length.
     */
    lengthOfMatching(env, term) {
        let lengthIdClientMatching = utils.longestCommonSubsequence(env.env.toLowerCase(), term.toLowerCase());
        let lengthNameMatching = utils.longestCommonSubsequence(env.name.toLowerCase(), term.toLowerCase());
        return Math.max(lengthIdClientMatching, lengthNameMatching)
    }

    /**
     * @param {string} text1
     * @param {string} text2
     * @returns {number} The length of the longest common subsequence between text1 and text2.
     */
    longestCommonSubsequence(text1, text2) {
        let dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0))
        for (let i = 1; i < dp.length; i++)
            for (let j = 1; j < dp[i].length; j++)
                if (text1[i - 1] === text2[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else
                    dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
        return dp[text1.length][text2.length]
    }

    /**
     * @returns {string} The name of the browser.
     */
    isChrome() {
        return !!chrome;
    }
}

const utils = new Utils();