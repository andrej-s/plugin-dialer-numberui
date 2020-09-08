# Twilio Flex CallerId Selection

This plugin customizes the behavior of [Twilio Flex](https://www.twilio.com/flex). Specifically, it adds the option to select an Outbound Caller Id in the new [Outbound Dialpad](https://www.twilio.com/docs/flex/dialpad/use):

![Dialpad extension](/img/outbound_dialpad.jpg?raw=true)

If using click to dial, Flex will show a number selection sidebar:

![ClicktoDial sidebar](/img/outbound_clicktodial.jpg?raw=true)

This plugin is meant for educational purposes, comes with no guarantee, and should not be used as-is in production.

## Configuration

Each TaskRouter worker should have two new attributes:

- `callerIds` - an array of caller ids the worker is allowed to use, e.g. `"callerIds":["+160123456","+160654321"]`
- `autoInvalidate` - boolean, if `true`, a caller id must be picked on every click to dial, if false, Flex will pick the last chosen caller id until changed in the dialpad

If the Flex Action [StartOutboundCall](https://www.twilio.com/docs/flex/ui/actions#voice) is triggered with the attribute `callerId`, the plugin will not overwrite this function and just initiate the call.

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3001 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

When you are ready to deploy your plugin, in your terminal run:

```bash
npm run deploy
```

This will publish your plugin as a Private Asset that is accessible by the Functions & Assets API. If you want to deploy your plugin as a Public Asset, you may pass --public to your deploy command:

```bash
npm run deploy --public
```

For more details on deploying your plugin, refer to the [deploying your plugin guide](https://www.twilio.com/docs/flex/plugins#deploying-your-plugin).

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.
