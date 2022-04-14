### Open Platform Communication Unified Architecture (OPC UA)
OPC Foundation are the ones that control the OPC standards (the govering body).
There is a previous standard or set of standards that only worked on windows
operating systems which is now called OPC Classic.

OPC UA is a communications protocol for Industry 4.0 (IIoT?) and IoT. So this
was originally for industrial usage to allow for programmable logic controllers
(PLC) to communicate with each other. The  PLC would often come from different
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
The OPC Server is a software component that exposes an OPC UA interface and
translates request into the protocol used by the PLC that is the server manages.


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
