### Open Platform Communication Unified Architecture (OPC UA)
OPC Foundation are the ones that control the OPC standards (the govering body).
There was a previous standard, or set of standards, that only worked on windows
operating systems which is now called OPC Classic.

OPC UA is a set of specifications for Industry 4.0 (IIoT?) and IoT. So this
was originally for industrial usage to allow for programmable logic controllers
(PLC) to communicate with each other. The PLC would often come from different
manufacturers which all have thier own ways of communicating. Using OPC UA is
supposed to enable interoperability between such devices.

```
        +------------+
        | OPC Client |
        +------------+
          |         |
          |         |
 +------------+    +------------+
 | OPC Server |    | OPC Server |
 +------------+    +------------+
    |      |           |
    |      |           |
 +-----+ +-----+    +-----+
 | PLC | | PLC |    | PLC |
 +-----+ +-----+    +-----+

```
The OPC Server is a software component provided by a manufacturer for the
hardware they provide, and it that exposes an OPC UA interface which translates
request into the protocols used by the PLC that is the server manages.


The OPC UA consists of the following specifications:
* Concepts
* Security Model
* Address Space Model
* Services
* Information Model
* Mappings
* Profiles
* Data Access
* Alarms and Conditions
* Programs
* Historical Access
* Discovery
* Aggregates
* Pub/Sub 

OPC UA use HTTPS for communication and has a more complex information model
compared to OPC Classic.

The OPC Server exposes services that a client can use.

### Transports
* Binary Encoded Messages or TCP.
* XML Encoded Messages over HTTPS/SOAP Protocol.


### open62541
Is an open source C++ implelentation of OPC UA.

[Documentation](http://www.open62541.org/doc/current/toc.html).
