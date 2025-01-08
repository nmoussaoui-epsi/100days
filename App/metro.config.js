const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );
  resolver.assetExts = resolver.assetExts.filter((ext) => ext !== "svg");
  resolver.sourceExts.push("svg");

  return config;
})();
