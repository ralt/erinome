all:
	make background
	make popup
	make miaou
	make gmail
	make options

background:
	./node_modules/.bin/browserify src/background/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/background.js

popup:
	./node_modules/.bin/browserify src/popup/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/popup.js

miaou:
	./node_modules/.bin/browserify src/miaou/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/miaou.js

gmail:
	./node_modules/.bin/browserify src/gmail/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/gmail.js

options:
	./node_modules/.bin/browserify src/options/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/options.js

debug:
	make debug-background
	make debug-popup
	make debug-miaou
	make debug-gmail
	make debug-options

debug-background:
	./node_modules/.bin/browserify -d src/background/index.js > extension/background.js

debug-popup:
	./node_modules/.bin/browserify -d src/popup/index.js > extension/popup.js

debug-miaou:
	./node_modules/.bin/browserify -d src/miaou/index.js > extension/miaou.js

debug-gmail:
	./node_modules/.bin/browserify -d src/gmail/index.js > extension/gmail.js

debug-options:
	./node_modules/.bin/browserify -d src/options/index.js > extension/options.js

.PHONY: background popup miaou gmail options debug-background debug-popup debug-miaou debug-gmail debug-options
