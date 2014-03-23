Prosto Monitoring
==========

Solution that allows to collect and monitor software events and metrics.

How to launch
node bin/listener.js 2>&1 >> listener.log &

ps aux | grep -e 'bin/listener' | grep -v grep | awk '{print $2}' | xargs -i kill -SIGINT {}