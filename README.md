# erinome

A Chrome extension to use PGP in your browser, using your local gpg installation.

Has to be used with the native application [erinome-native][0].

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

## Implemented communications

- [x] Miaou user sends me a message:
  - [x] content_script -> background
  - [x] background -> native
  - [x] native -> background
  - [x] background storage of decrypted messages
  - [x] background -> popup
- [x] I want to send an encrypted message:
  - [x] popup -> background
  - [x] background storage of decrypted messages
  - [x] background -> native
  - [x] native -> background
  - [x] background -> content_script
- [x] I want to get decrypted messages that were sent to me:
  - [x] popup -> background
  - [x] background -> popup

## Roadmap before release

- [x] Use HTML templates
- [x] Put the delivered extension in a folder
- Add the "you sent a message" messages when reading miaou messages in
  the content script
- Make it clear who sends a message to who (using me/sender classes)
- Make it possible to sign and encrypt at the same time
- Make it possible to decrypt and verify at the same time
- Handle errors correctly
- Integrate with GMail
  - Find a way to mix miaou and gmail in popup
  - Add buttons in gmail interface
    - Verify
	- Sign
	- Encrypt
	- Sign and encrypt
	- Decrypt

## License

MIT license.


  [0]: https://github.com/Ralt/erinome-native
