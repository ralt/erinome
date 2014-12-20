# pgp-ext

A Chrome extension to use PGP in your browser, using your local gpg installation.

Has to be used with the native application [pgp-ext-app][0].

## Communications

*Because I needed to clear up my head.*

The extension works with 4 parts:

- The background script
- The content_scripts script (one for miaou, one for gmail, etc)
- The popup script
- The native app

Here are the communications in each scenario:

- Miaou user sends me a message:
  - content_script -> background -> native -> background (stores
    messages for later retrieval by popup if it isn't open) -> popup
- I want to send an encrypted message:
  - popup -> background -> native -> background -> content_script
- I want to get decrypted messages that were sent to me:
  - popup -> background -> popup

The background -> native connection is opened once at startup, and
kept open until the browser closes. Which means only one listener is
possible.

The content_script -> background -> content_script communications can
be done with `sendMessage(message, fn)`, since the background can use
`sendResponse` to immediately send a response.

The popup -> background -> popup communications have the same
advantage.

The other communications (content_script -> background -> popup, or
popup -> background -> content_script) need to have listeners defined
once too.

For these listeners, the objects exchanged must have an `action` key,
that will define the action to execute, and will tell in which
scenario the message is being passed.

## License

MIT license.


  [0]: https://github.com/Ralt/pgp-ext-app
