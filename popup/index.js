'use strict';

var storage = require('../lib/storage');
var communicator = require('../lib/communicator');

var viewsManager = require('./views-manager');
var DiscussionsListView = require('./views/discussions-list');
var discussionsListView = DiscussionsListView(viewsManager, communicator);
var DiscussionView = require('./views/discussion');
var discussionView = DiscussionView(communicator);

viewsManager.add(discussionsListView);
viewsManager.add(discussionView);
viewsManager.setDefault(discussionsListView);
viewsManager.run();
