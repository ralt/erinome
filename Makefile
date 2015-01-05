all:
	make background
	make popup
	make miaou

background:
	./node_modules/.bin/browserify src/background/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/background.js

popup:
	./node_modules/.bin/browserify src/popup/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/popup.js

miaou:
	./node_modules/.bin/browserify src/miaou/index.js | ./node_modules/.bin/uglifyjs2 -mc > extension/miaou.js

debug:
	make debug-background
	make debug-popup
	make debug-miaou

debug-background:
	./node_modules/.bin/browserify -d src/background/index.js > extension/background.js

debug-popup:
	./node_modules/.bin/browserify -d src/popup/index.js > extension/popup.js

debug-miaou:
	./node_modules/.bin/browserify -d src/miaou/index.js > extension/miaou.js

.PHONY: background popup miaou debug-background debug-popup debug-miaou
