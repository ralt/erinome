BROWSERIFY=./node_modules/.bin/browserify
FLAGS=-d -t 6to5ify
DIST_FLAGS=-t 6to5ify
UGLIFY=./node_modules/.bin/uglifyjs2
UGLIFY_FLAGS=-mc

BACKGROUND_FILES=$(shell find src/background/ -name '*.js')
POPUP_FILES=$(shell find src/popup/ -name '*.js')
MIAOU_FILE=$(shell find src/miaou/ -name '*.js')
GMAIL_FILES=$(shell find src/gmail/ -name '*.js')

all: extension/background.js \
     extension/popup.js \
     extension/miaou.js \
     extension/gmail.js

dist:
	$(BROWSERIFY) $(DIST_FLAGS) src/background/index.js | $(UGLIFY) $(UGLIFY_FLAGS) > extension/background.js
	$(BROWSERIFY) $(DIST_FLAGS) src/popup/index.js | $(UGLIFY) $(UGLIFY_FLAGS) > extension/popup.js
	$(BROWSERIFY) $(DIST_FLAGS) src/miaou/index.js | $(UGLIFY) $(UGLIFY_FLAGS) > extension/miaou.js
	$(BROWSERIFY) $(DIST_FLAGS) src/gmail/index.js | $(UGLIFY) $(UGLIFY_FLAGS) > extension/gmail.js


extension/background.js: $(BACKGROUND_FILES)
	$(BROWSERIFY) $(FLAGS) src/background/index.js > extension/background.js

extension/popup.js: $(POPUP_FILES)
	$(BROWSERIFY) $(FLAGS) src/popup/index.js > extension/popup.js

extension/miaou.js: $(MIAOU_FILES)
	$(BROWSERIFY) $(FLAGS) src/miaou/index.js > extension/miaou.js

extension/gmail.js: $(GMAIL_FILES)
	$(BROWSERIFY) $(FLAGS) src/gmail/index.js > extension/gmail.js
