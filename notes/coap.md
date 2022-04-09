## Constrained Application Protocol (CoAP)
Is a protocol with low overhead designed for constrained devices.

Is kindof similar with HTTP but its not a subset or a version of HTTP in any way.
It allows Restful style of calls from a node to a server. This differes from
MQTT which never communicate directly to another node but always go through
a broker.
```
Layers:
        +-----------------+
        | Application     |
        +-----------------+                  -+
        | Request/Response|                   |
        +-----------------+                   | CoAP layers
        | Messages        |                   |
        +-----------------+                  -+
        | UDP             |
        +-----------------+
```

### Messages layer
This layer deals with the underlying UDP layer between two endpoints.
Each message has a unique id.
A message consists of a binary header, a compact option, and a payload.
There are confirmable (reliable), a Confirmation message (CON) and these are
ackknowledge by the recipient by it sending an ACK message. If the sender does
not receive an ACK it will resent until it does.
```
Client        CON(ID 0x0001)        Server
             --------------->
              ACK(ID 0x0001)
             <---------------


Client        CON(ID 0x0002)        Server
             --------------->       Problems processing the CON.
                   RST
             <---------------

Client        NON(ID 0x0003)        Server
             --------------->
```


### Request/Response layer
```
Client        CON(ID 0x0001)        Server
              GET /something
              (Token 0x01)
             --------------->
              ACK(ID 0x0001)
              (Token 0x01)
              payload
             <---------------
```

### Message Format
```
+---+----+---+----+-----------+------+--------+-------+
|Ver|Type|TKL|Code|Message ID |Token |Options |Payload|
+---+----+---+----+-----------+------+--------+-------+t

Ver = 2 bits version
Type = 1 bit, 0 = confirmable, 1 = non-confirmable
TKL = 4 bits Token Lenght
Code = 8 bits response code
Message Id = 16 bits, id of message
```
