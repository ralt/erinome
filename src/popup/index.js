'use strict';

// Can't require it yet because: https://github.com/6to5/6to5/issues/427
//require("6to5/polyfill");

var storage = require('../lib/storage');
var communicator = require('../lib/communicator');

var viewsManager = require('./views-manager');
var DiscussionsListView = require('./views/discussions-list');
var discussionsListView = DiscussionsListView(viewsManager, communicator);
var DiscussionView = require('./views/discussion');
var discussionView = DiscussionView(viewsManager, communicator);
var GmailView = require('./views/gmail');
var gmailView = GmailView(viewsManager, communicator);

viewsManager.add(discussionsListView);
viewsManager.add(discussionView);
viewsManager.add(gmailView);
viewsManager.setDefault(discussionsListView);
viewsManager.run();

var switcher = require('./ui/switcher');
switcher(document.getElementById('switcher'), viewsManager).setup();
