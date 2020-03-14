# The Floo-Network (Namechange Pending)

## Installation

In the tradition of our people, install all dependencies via `yarn install`.

## Development

You can run the app on (default) port 3000 via `yarn start`. This will hot reload as well. For Production builds, fire off a `yarn build` to create the Production artifact.

## Deploying

If you're logged into the Heroku CLI, setup the remote tracking via: `heroku git:remote -a floonetwork`

After you've been setup, do a `git push heroku master` whenever you want to push the changes from the `master` branch to Heroku.

## Architecture

The Floo-Network is a React app in Typescript that (currently) heavily relies on the Context API for state management. The main dependency is `peerjs` for "easier" WebRTC communication.

## Usage

To use the Floo-Network, simply provide a unique peer ID and press `Connect`. Next, in the text input box below where you entered your peer ID, enter the ID of the person that you wish to connect to. Note that they must first have created their own unique peer ID and pressed the `Connect` button.

For a video call, press the `Call` button after you've been connected. This will open up a video screen for the person you are calling. Similarly, they should call you, I think.

To chat, simply type a message into the text box near the bottom of the screen and press `Send`, or whatever that button says. The person that you are connected to will see your messages in real-time.
