The basic idea here is to take ideas from different storage projects and put them together in a unique way which I think will provide a more then just the sum of these projects.

Redis:   Single threaded and fast access
CouchDB: Data Views using map/reduce
Riak:    Chained map/reduce, used to create views of views
Mongo:   Document oriented


Status
======
Just getting started but a basic in memory key/value storage is in place.

Todo
====
 * Add JSON commands
 * Add array based commands
 * Allow SET operations
 * Add Map/Reduce for views on top of the data
 * Signaling
 * Tests
 * Travis CI
