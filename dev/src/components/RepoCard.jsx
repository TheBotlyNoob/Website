import React, { useState, useEffect } from "react";
import replace from "string-replace-to-array";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * This is a utility hook for fetching miscellaneous content.
 * The other hooks use this one to get content from GitHub.
 *
 * @returns The content that is fetched, a loading boolean, and a hasError boolean
 */
export const useFetch = (url) => {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
            setResponse(yield resp.json());
            setLoading(false);
        }))
            .catch(() => {
            setHasError(true);
            setLoading(false);
        });
    }, [url]);
    return [response, loading, hasError];
};
/**
 * This is a hook for fetching the [emoji names](https://api.github.com/emojis) from the official GitHub API.
 *
 * @returns The content that is fetched, a loading boolean, and a hasError boolean
 */
export const useEmojis = () => useFetch("https://api.github.com/emojis");
/**
 * This is a hook for fetching the GitHub colors from [ozh/github-colors](https://raw.githubusercontent.com/ozh/github-colors/master/colors.json).
 *
 * @returns The content that is fetched, a loading boolean, and a hasError boolean
 */
export const useColors = () => useFetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
/**
 * This is a hook for fetching the [repository information](https://api.github.com/repos/) from the official GitHub API.
 *
 * @returns The content that is fetched, a loading boolean, and a hasError boolean
 */
export const useGitHubRepo = (username, repository) => useFetch(`https://api.github.com/repos/${username}/${repository}`);
export const GitHubEmoji = ({ name }) => {
    const [emojis, loading] = useEmojis();
    if (loading || !emojis[name])
        return React.createElement("span", null, name);
    if (emojis[name]) {
        return (React.createElement("span", null,
            React.createElement("img", { alt: name, src: emojis[name], style: { width: "1rem", height: "1rem", verticalAlign: "-0.2rem" } })));
    }
};
/**
 * Use this default export to get the GitHub repository card component.
 *
 * ```js
 * import React from "react";
 * import RepoCard from "react-repo-card";
 *
 * export const App = () => (
 *   <>
 *     <h1>Check out my repositories!</h1>
 *     <RepoCard username="dawsonbooth" repository="ascii-art" />
 *   </>
 * );
 * ```
 *
 * @returns React GitHub repository card component
 */
const RepoCard = ({ username, repository, Loading }) => {
    const [data, loadingData] = useGitHubRepo(username, repository);
    const [colors, loadingColors] = useColors();
    if (loadingData || loadingColors) {
        return Loading ? React.createElement(Loading, null) : React.createElement(React.Fragment, null);
    }
    let emojiCount = 0;
    if (data.description)
        data.description = replace(data.description, /:\w+:/g, (match) => {
            emojiCount += 1;
            return (React.createElement(GitHubEmoji, { key: emojiCount, name: match.substring(1, match.length - 1) }));
        });
    return (React.createElement("div", { style: {
            fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
            border: "1px solid #e1e4e8",
            borderRadius: "6px",
            background: "black",
            padding: "16px",
            fontSize: "14px",
            lineHeight: "1.5",
            color: "grey"
        } },
        React.createElement("div", { style: { display: "flex", alignItems: "center" } },
            React.createElement("svg", { style: { fill: "grey", marginRight: "8px" }, viewBox: "0 0 16 16", version: "1.1", width: 16, height: 16, "aria-hidden": "true" },
                React.createElement("path", { fillRule: "evenodd", d: "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" })),
            React.createElement("span", { style: { fontWeight: 600, color: "#0366d6" } },
                React.createElement("a", { style: { textDecoration: "none", color: "inherit" }, href: data.html_url }, data.name))),
        React.createElement("div", { style: {
                display: data.fork ? "block" : "none",
                fontSize: "12px",
                color: "grey"
            } },
            "Forked from",
            " ",
            React.createElement("a", { style: { color: "inherit", textDecoration: "none" }, href: data.fork ? data.source.html_url : "" }, data.fork ? data.source.full_name : "")),
        React.createElement("div", { style: {
                fontSize: "12px",
                marginBottom: "16px",
                marginTop: "8px",
                color: "grey"
            } }, data.description),
        React.createElement("div", { style: { fontSize: "12px", color: "grey", display: "flex" } },
            React.createElement("div", { style: { marginRight: "16px" } },
                React.createElement("span", { style: {
                        width: "12px",
                        height: "12px",
                        borderRadius: "100%",
                        backgroundColor: colors[data.language]?.color,
                        display: "inline-block",
                        top: "1px",
                        position: "relative"
                    } }),
                "\u00A0",
                React.createElement("span", null, data.language)),
            React.createElement("div", { style: {
                    display: data.stargazers_count === 0 ? "none" : "flex",
                    alignItems: "center",
                    marginRight: "16px"
                } },
                React.createElement("svg", { style: { fill: "grey" }, "aria-label": "stars", viewBox: "0 0 16 16", version: "1.1", width: 16, height: 16, role: "img" },
                    React.createElement("path", { fillRule: "evenodd", d: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" })),
                "\u00A0 ",
                React.createElement("span", null, data.stargazers_count)),
            React.createElement("div", { style: {
                    display: data.forks_count === 0 ? "none" : "flex",
                    alignItems: "center"
                } },
                React.createElement("svg", { style: { fill: "grey" }, "aria-label": "fork", viewBox: "0 0 16 16", version: "1.1", width: 16, height: 16, role: "img" },
                    React.createElement("path", { fillRule: "evenodd", d: "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" })),
                "\u00A0 ",
                React.createElement("span", null, data.forks_count)))));
};

export default RepoCard;
