const overrideWebpackConfig = ({ context, webpackConfig, pluginOptions }) => {
  const throwError = (message, githubIssueQuery) =>
    throwUnexpectedConfigError({
      packageName: 'legacy-svg-components',
      githubRepo: 'https://github.com/IngenieroLata/legacy-svg-components.git',
      message,
      githubIssueQuery
    });

  pluginOptions = pluginOptions || {};

  const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
  if (!oneOfRule) {
    throwError(
      `Can't find a 'oneOf' rule under module.rules in the ${context.env} webpack config!`,
      'webpack+rules+oneOf'
    );
  }

  const SVGRule = {
    test: /\.svg$/,
    exclude: /node_modules/,
    use: {
      loader: 'svg-react-loader',
      options: {
        name: 'ReactComponent'
      }
    }
  };

  oneOfRule.oneOf.unshift(SVGRule);

  return webpackConfig;
};

module.exports = {
  overrideWebpackConfig
};
