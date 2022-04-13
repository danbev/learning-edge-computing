## MQ Telemetry Transport (MQTT)
This is a message based protocol for Machine to Machine (M2M) and originally
this was developed by at least one person from IBM and the MQ is from IBM's
MQ Series (Message Queue) product. Uses a p publish subscribe model which
decouples the publisher from the subscriber.

MQTT messages are small and can be as small as 2 bytes compared to HTTP requests
which are larger due to HTTP headers. Also with a a broker it is possible to
send the same message to multiple devices.

Runs on TCP but there is a UDP version named MQTT-SN.

### Quality of Service (QoS)
Each connection to the broker can specify an int value between 0-2:
```
0 = at most once (fire and forget, so no ack)
1 = at least once. The message is sent multiple times until an ack is recieved.
2 = exactly once. Sender and receiver use a two level handshake to ensure
    only one copy of the message is received.


### Eclipse Mosquitto
A very lightweight MQTT broker useful for embedded deployments.
```console
$ sudo dnf install mosquitto
```

Start mosquitto:
```console
$ mosquitto
1649850732: mosquitto version 2.0.14 starting
1649850732: Using default config.
1649850732: Starting in local only mode. Connections will only be possible from clients running on this machine.
1649850732: Create a configuration file which defines a listener to allow remote access.
1649850732: For more details see https://mosquitto.org/documentation/authentication-methods/
1649850732: Opening ipv4 listen socket on port 1883.
1649850732: Opening ipv6 listen socket on port 1883.
1649850732: mosquitto version 2.0.14 running
```

Subscribe to a topic:
```console
$ mosquitto_sub -t test_topic
```
Publish to the topic:
```console
$ mosquitto_pub -t test_topic -m "bajja"
```
This will show the message in the `mosquitto_sub' console.

### Eclipse Amien
Is a clusterable MQTT broker more suited for Enterprise deployment.
