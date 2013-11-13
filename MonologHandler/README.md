Symfony2 Monolog Handler
==========

Symfony2 monolog handler for Prosto Monitoring.

monolog:
    handlers:
        prosto_monitoring:
            type: service
            id: monolog.prosto_monitoring_handler

services:
    monolog.prosto_monitoring_handler:
        class: Prosto\FrameworkBundle\MonologHandler\ProstoMonitoringHandler
        arguments: ["udp://91.218.212.175:1180", 300]
