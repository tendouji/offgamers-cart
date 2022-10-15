const mix = require("laravel-mix");

const styleBuildPath = "src/assets/css";

mix.setPublicPath(styleBuildPath);
mix
  .sass("src/assets/scss/styles.scss", `${styleBuildPath}/styles.css`)
  .options({
    processCssUrls: false,
  })
  .sourceMaps(true, "inline-source-map");
