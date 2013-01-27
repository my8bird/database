The basic idea here is to take ideas from different storage projects and put them together in a unique way which I think will provide a more then just the sum of these projects.

<table>
<tr><td>Redis</td><td>Single threaded and fast access</td></tr>
<tr><td>CouchDB</td><td>Data Views using map/reduce</td></tr>
<tr><td>Riak</td><td>Chained map/reduce, used to create views of views</td></tr>
<tr><td>Mongo</td><td>Document oriented</td></tr>
</table>

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
