all: extension/background.js \
     extension/popup.js \
     extension/miaou.js \
     extension/gmail.js

dist:
	./node_modules/.bin/browserify -t 6to5ify src/background/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/background.js
	./node_modules/.bin/browserify -t 6to5ify src/popup/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/popup.js
	./node_modules/.bin/browserify -t 6to5ify src/miaou/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/miaou.js
	./node_modules/.bin/browserify -t 6to5ify src/gmail/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/gmail.js

BACKGROUND_FILES=$(shell find src/background/ -name '*.js')
POPUP_FILES=$(shell find src/popup/ -name '*.js')
MIAOU_FILE=$(shell find src/miaou/ -name '*.js')
GMAIL_FILES=$(shell find src/gmail/ -name '*.js')

extension/background.js: $(BACKGROUND_FILES)
	./node_modules/.bin/browserify -d -t 6to5ify src/background/index.js > extension/background.js

extension/popup.js: $(POPUP_FILES)
	./node_modules/.bin/browserify -d -t 6to5ify src/popup/index.js > extension/popup.js

extension/miaou.js: $(MIAOU_FILES)
	./node_modules/.bin/browserify -d -t 6to5ify src/miaou/index.js > extension/miaou.js

extension/gmail.js: $(GMAIL_FILES)
	./node_modules/.bin/browserify -d -t 6to5ify src/gmail/index.js > extension/gmail.js
