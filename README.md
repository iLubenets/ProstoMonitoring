Prosto Monitoring
==========

**Prosto Monitoring** is a system for collecting and monitoring software events and metrics.

## Components
### Listener
**Listener** is a Node.js daemon that listens events and metrics from applications sent over UDP. 

### Data storage
Listener saves incoming data to the database.

Now we support only PostgreSQL.

### Reporter
**Reporter** is a application for visualizing saved data. Reporter uses Reporter API.

*In progress.*

### Reporter API
Reporter API allows to query saved data using simple language.

*In progress.*

### Alerter
Alerter analyses saved data using given criteria and informs assigned persons about criteria triggering.

*In progress.*

### How to launch daemon
```
node bin/listener.js
```
### How to stop daemon
```
ps aux | grep -e 'bin/listener' | grep -v grep | awk '{print $2}' | xargs -i kill -SIGINT {}
```

## Inspired by
* [New Relic](http://newrelic.com/)
* [StatsD](https://github.com/etsy/statsd/)
* [Cube](http://square.github.io/cube/)