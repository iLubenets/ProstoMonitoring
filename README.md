Prosto Monitoring
==========

**Prosto Monitoring** is a system for measuring application events and metrics.
Prosto Monitoring allows you to collect and process any crucial application data.


![General View](https://github.com/iLubenets/ProstoMonitoring/blob/master/docs/images/GeneralView.png?raw=true)

## Components
### Listener
**Listener** is a Node.js daemon that listens events and metrics from applications. 

### Data storage
Listener saves incoming data to the database.

Now we support only PostgreSQL.

### Reporter
**Reporter** is a application for visualizing saved data. Reporter uses Reporter API.

*In progress.*

### Reporter API
Reporter API allows to query saved data using simple query language.

*In progress.*

### Alerter
Alerter analyses saved data using given criteria and informs assigned persons about criteria triggering.

*In progress

## Installation
1. Install Node.js if you don't have it yet.
2. Configure Prosto Monitoring
3. Start daemon
```
node bin/listener.js
```
4. Configure Symfony Monolog handler or develop your own solution to send application metrics and/or events to the Listener.


### How to stop daemon
```
ps aux | grep -e 'bin/listener' | grep -v grep | awk '{print $2}' | xargs -i kill -SIGINT {}
```

## Prosto Monitoring was designed inspired by
* [New Relic](http://newrelic.com/)
* [StatsD](https://github.com/etsy/statsd/)
* [Cube](http://square.github.io/cube/)
* [Pinba](http://pinba.org/)