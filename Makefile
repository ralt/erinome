all:
	make background
	make popup
	make miaou

background:
	./node_modules/.bin/browserify background/index.js | ./node_modules/.bin/uglifyjs2 -mc > background.js

popup:
	./node_modules/.bin/browserify popup/index.js | ./node_modules/.bin/uglifyjs2 -mc > popup.js

miaou:
	./node_modules/.bin/browserify miaou/index.js | ./node_modules/.bin/uglifyjs2 -mc > miaou.js

debug:
	make debug-background
	make debug-popup
	make debug-miaou

debug-background:
	./node_modules/.bin/browserify -d background/index.js > background.js

debug-popup:
	./node_modules/.bin/browserify -d popup/index.js > popup.js

debug-miaou:
	./node_modules/.bin/browserify -d miaou/index.js > miaou.js

.PHONY: background popup miaou debug-background debug-popup debug-miaou

