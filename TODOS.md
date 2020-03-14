# TODOS

This is just a dumping ground of things that could/should be implemented, as well as various ideas and complaints.

- We need to host our own server to connect to. We could host it in PCF or in Sentinel's AWS space or in my Heroku one
- CICD would be cool. I manually trigger builds in Heroku, but if we give GitHub Team Access to Heroku then we can have a one-click setup pipeline
- Currently when chatting, you only see the incoming messages and not the ones that you've typed. There's a `messages` array in the `ConnectionContext` that you could probably `push` messages onto and then `pop` off of in the `ChatBox` component.
- There is no error handling, and it's possible to run into a state where the server is overloaded or your peerID is not unique. This is currently hidden from the user.
- There are no loading indicators, but there are a ton of state hooks available to conditionally show/hide one
- Uh it probably doesn't work on mobile. I'm like, 90% sure video/audio is not working
- We use one giant `ConnectionContext` for everything. Maybe we want individual contexts for:
  - `OutgoingConnection(s)` // who you are connected to
  - `IncomingConnection(s)` // who is connected to you
  - `ChatContext` // where all of the chat messages live
  - `CallContext` // where all of the video call stuff happens
  - `PeerContext` // idk, this is probably what the `ConnectionContext` already is
- The app is ugly as hell
- I'd really like to put this behind some Auth. Preferably a Cognito UserPool and using the `WithAuthentication` HOC from `react-amplify`
