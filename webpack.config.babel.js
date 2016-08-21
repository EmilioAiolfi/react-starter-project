import path from 'path';
import webpack from 'webpack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';


// Variables & defaults
// ---
let isDev = (process.env.NODE_ENV === 'development');
const ENV = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  PROXY_HOST: process.env.PROXY_HOST || 'localhost',
  PROXY_PORT: process.env.PROXY_PORT || 3100,
  VERBOSE_LOGGING: process.env.VERBOSE_LOGGING || false
};

// Paths
// ---
const ROOT = './';
const CLIENT_ROOT = path.resolve(__dirname, ROOT + 'src');

const PATHS = {
  clientRoot: CLIENT_ROOT,
  client: path.resolve(CLIENT_ROOT, 'main.jsx'),
  build: path.resolve(__dirname, ROOT + 'build')
};


// Style configuration
// ---
const CSS_CHUNK_NAMING = '[name]__[local]___[hash:base64:5]';
const STYLE_LOADERS = [
  'css-loader?modules&importLoaders=1&localIdentName=' + CSS_CHUNK_NAMING,
  'postcss-loader',
  'sass-loader'
];

// Webpack Plugins
// ---
const DEV_PLUGINS = [
  new ProgressBarPlugin({ width: 40 }),

  new webpack.optimize.OccurenceOrderPlugin(),

  // build status system notification
  new WebpackNotifierPlugin(),

  // globally enable hot code replacement
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),

  new BrowserSyncPlugin(
    {
      // BrowserSync options - see: http://www.browsersync.io/docs/options/

      // Use http://localhost:3000/ for development, proxy Dev Server.
      host: ENV.PROXY_HOST, port: ENV.PROXY_PORT,
      proxy: `http://${ENV.HOST}:${ENV.PORT}/`,
      // Stop the browser from automatically opening.
      open: false,
      // Scrolls & Form inputs on any device will be mirrored to all others.
      ghostMode: {
        clicks: false,
        scroll: true,
        forms: true,
      },
      // Show what browsers are connected.
      logConnections: true,
    },
    {
      // Webpack Plugin options

      // Prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this.
      reload: false
    }
  ),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('development') },
  })

];

const PROD_PLUGINS = [
  // Extract css into one file for production, minify javascript
  new ExtractTextPlugin('app.css', { allChunks: true }),

  // Minify javascript
  new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),

  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
  })

];


// Resulting webpack config
// ---
let config = {
  context: PATHS.clientRoot,
  debug: true,

  devtool: isDev ?
    'eval-source-map'
    : 'eval',

  entry: [
    'webpack/hot/dev-server',
    PATHS.client
  ],

  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'app.js'
  },

  devServer: {
    hot: true,
    inline: true,
    progress: true,
    port: ENV.PORT,
    contentBase: 'public',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },

    stats: {
      colors: true,
      assets: false,
      timings: true,
      reasons: true,
      children: ENV.VERBOSE_LOGGING,
      hash: ENV.VERBOSE_LOGGING,
      version: ENV.VERBOSE_LOGGING,
      chunks: ENV.VERBOSE_LOGGING,
      chunkModules: ENV.VERBOSE_LOGGING,
      cached: ENV.VERBOSE_LOGGING,
      cachedAssets: ENV.VERBOSE_LOGGING,
    }
  },

  module: {

    preLoaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel',
        babelrc: false,
        query: {
          presets: ['airbnb', 'es2015', 'react'],
          env: {
            development: {
              presets: ['react-hmre']
            }
          },
          plugins: [
            'transform-runtime',
            isDev ? [] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements'
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: /src/,
        loaders: ['style', 'css', 'scss']
      },
      {
        test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
        exclude: /node_modules/,
        loader: 'url?limit=100000'
      },
      // Use separate style-tags for developemnt,
      // extract CSS into one file for production.
      isDev ? {
        test: /\.scss$/,
        loaders : ['style-loader'].concat(STYLE_LOADERS)
      } : {
        test: /\.scss$/,
        loader : ExtractTextPlugin.extract('style-loader', STYLE_LOADERS)
      }
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    modulesDirectories: ['./src', './node_modules'],
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
  },

  eslint: {
    useEslintrc: false,
    configFile: path.resolve(__dirname, ROOT + '.eslintrc')
  },

  sassLoader: {
    includePaths: [ path.resolve(__dirname, ROOT + 'src/style') ]
  },

  // Webpack plugins
  plugins: isDev ?
    DEV_PLUGINS
    : PROD_PLUGINS,
};

export default config;
