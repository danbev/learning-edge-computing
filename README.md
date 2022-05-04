## Learning Edge Computing
Projects to gather notes and examples around edge computing.

Notes:
* [MEC](./notes/mec.md)
* [LTE](./notes/lte.md)
* [RAN](./notes/ran.md)
* [CoAP](./notes/coap.md)
* [Zenoh](./notes/zenoh.md)
* [OPC UA](./notes/opcua.md)
* [MQTT](./notes/mqtt.md)

### Edge computing background
Over the recent years more and more IoT devices have been deployed and these
devices are creating more and more data that we want to use in some way. What is
currently most often the case is that these IoT devices are connected to
some sort of gateway what will route the data to a cloud service for processing
(analysis, processing, storing etc.).

The number of deployed devices is increasing every day and more and more data
needs to be handled, and this is going to cause issues with bandwidth. There are
also more devices that require lower latency from its services. For example,
self driving cars (connected cars) might not have time to wait for cloud service
responses, and another example is servailance cameras that generate huge amounts
of data. These are some of the driving forces, to moving networked computing
resources closer to where the data is created.

Since most IoT devices are resource constrained, like they might not have
powerful processors, or be limit to battery power and therefor need to do as
little processing as possible. Now, these devices "can't" really send this
information directly to a cloud but instead will send small amounts of data
to a gateway node which will in turn send it along to some cloud service,
generally speaking. This is called a Cloud centric Internet of Things (CIot).
```
CIot:
                                                          +-------------------+
                                                          |                   |
                                                          |                   |
                                                          |                   |
   +----------+      +-------+                            |   Cloud Services  |
   |IoT Device|<---->|Gateway|<-------------------------->|                   |
   +----------+  +-->|       |                            |                   |
   +----------+  |   +-------+                            |                   |
   |IoT Device|<-+                                        |                   |
   +----------+                                           +-------------------+
```
Note that in this case the gateway is acting more like a router and does not
store or process the data from the IoT devices.

This architecture has some issues as more and more IoT devices are deployed,
more and more data is going be transmitted to the cloud services which is going
to cause bandwidth issues.

There is also an issue with latency for some types of applications, for example
a self-driving car might not be able to wait for a packet to be transported
to/from a cloud service.
There is also the issue with that an application might not allow for disconnect
to the cloud service. Again a self-driving car must be able to continue if such
an break occurs.

So the idea is to move some of the cloud service functionality closer to the
the IoT devices, to the edge of the network. These are functionalites like
computing, storage, and networking. These are called edge servers/computers:
```
Edge computing:
                                                          +-------------------+
                                                          |                   |
                                                          |                   |
                     +--------+                           |                   |
   +----------+      |Edge    |                           |   Cloud Services  |
   |IoT Device|<---->|compute |<------------------------->|                   |
   +----------+  +-->|resource|                           |                   |
   +----------+  |   +--------+                           |                   |
   |IoT Device|<-+                                        |                   |
   +----------+                                           +-------------------+
```

An edge server is a compute resource located where, or close to where,
data is being generated. So it receives data from IoT devices like sensors and
can store, process, and/or send the data to the cloud (or all three I guess).
But data does not need to be sent to the cloud and might be processed by the
edge compute resources itself.

Now, the environment where these compute resources are located will look very
different. For example, ~ets say that I'm at home watching IP based TV
or using an application on a WIFI connected device. To move an application
closer to my location would be placing/deploying it perhaps in my ISP network
or somewhere in Sweden (I think Netflix does this for example). I imagine that
doing this would be like deploying in a kubernetes like environment, at
least it would be a non-resource contrained environment where a full operating
system and memory resources are available. The runtime used in this case could
be any runtime for Java, JavaScript (Node.js, Deno), DotNet etc.

```                 
                                                          +-------------------+
                Internet Service Provider environment     |                   |
                                                          |                   |
                     +--------+                           |                   |
   +----------+      |Edge    |                           |   Cloud Services  |
   | IP TV    |<---->|compute |<------------------------->|                   |
   +----------+      |resource|                           |                   |
                     +--------+                           |                   |
                    "Normal servers"                      |                   |
                                                          +-------------------+
```

Now, lets say I switch to my mobile phone and start using the application on it.
This would now be using my telco operator and going over their network. Placing
the same application closer would in this case be placing it in the telco
operators environment (like in a base station). This environment is similar to
a cloud operator environment now where they have moved from hardware specific
network devices to virtualized software that can be run on commondity hardware
and managed in much the same way as cloud environment using platforms like
kubernetes. So in this case we have access to similar non-resources constrained
environment where I expect the runetime to be the same as the previous example,
that is any runtime for Java, JavaScript (Node.js, Deno), DotNet, etc.

```                 
                                                          +-------------------+
                Telco Operator environment                |                   |
                                                          |                   |
                     +--------+                           |                   |
   +-------------+   |Edge    |                           |   Cloud Services  |
   | Mobile Phone|-->|compute |<------------------------->|                   |
   +-------------+   |resource|                           |                   |
                     +--------+                           |                   |
                   "Normal servers"                       |                   |
                                                          +-------------------+
```

But there are also other types of Edges which could be on factory floors, or
located in hospitals, or spread out accross a city, or in cars, where smaller
devices containing edge compute resources need to be placed closer to where data 
is generated and can be acted upon in the shortest time possible. These can also
act as aggragators and limit the amount of data being sent to backend cloud
applications. 

```                 
                Public Environment                        +-------------------+
                Embedded in products                      |                   |
                                                          |                   |
                     +--------+                           |                   |
   +----------+      |Edge    |                           |   Cloud Services  |
   | IP TV    |<---->|compute |<------------------------->|                   |
   +----------+      |resource|                           |                   |
                     +--------+                           |                   |
                  "Contstrained compute devices"          |                   |
                                                          +-------------------+
```
So what options are there for deploying to these resource constrained
environments?  I currently don't know the answer to this question.


I initialy thought of the edge compute resources as a normal server in a rack
for example, but these can be small dedicated devices (small single board
computers) like a [lattepanda](https://www.lattepanda.com/) or a
[udoo bolt](https://www.udoo.org/discover-the-udoo-bolt/), or a
[Khadas Edge V](https://www.khadas.com/edge), or a
[Jetson Nano](https://developer.nvidia.com/embedded-computing).

Now, an extension of the Edge compute resource is to have a mini cloud of sort
that has some of the same features of a cloud, like scalability, managability
and the rest of functionality that enterprise clouds provider.
This is a layer between the edge server (or parhaps even replaces the edge
server, this is not clear to me yet). What are these things called, well they
are called Fog (as in cloud but closer to the ground or something like that):
```
Fog computing:
                                                          +-------------------+
                                                          |                   |
                                                          |                   |
                     +--------+        +--------+         |                   |
   +----------+      |Edge    |        |  Fog   |         |   Cloud Services  |
   |IoT Device|<---->|compute |<-------| layer  |-------->|                   |
   +----------+  +-->|resource|        |        |         |                   |
   +----------+  |   +--------+        +--------+         |                   |
   |IoT Device|<-+                                        |                   |
   +----------+                                           +-------------------+
```
This idea called Fog computing was coined by Cisco in 2014 and later in 2015
IBM coided the term Edge computing.

The Fog layer receives data from the edge layer and can futher filter it down or
can act on the data with or without sending it through to the cloud services.
This allows for saving on bandwidth and also latency.

[OpenFog](https://opcfoundation.org/markets-collaboration/openfog/)

```
Fog layer:
 +-------------+ +---------------+ +------------+ +----------+ +----------+
 | Compute     | | Acceleration  | | Networking | | Control  | | Storage  |
 +-------------+ +---------------+ +------------+ +----------+ +----------+

Compute: VM/Containers, iPaaS/SaaS, On-Demand data Processing (ODP), Context as a Service (CaaS)
Acceleration: Network Function virtualization/Software Defined Networking, GPU/FPGA
Networking: TCP/UDP IP, Http/ CoAP, XMPP/MQTT/AMQP, 802.15.4 (ZigBee), Z-Wave, Bluetooth
Control: Deployment, Actuation, Mediation, Security
Storage: Caching
```

### Usecases 

* Autonomous vehicles
These will generate huge amounts of data and need to repond in real time. This
will require them to have onboard computing resources that can handle this and
will have Edge compute resources onboard. These will b

* Cloud Gaming
Cloud gaming companies are looking to build edge servers as close to gamers as
possible in order to reduce latency and provide a fully responsive and immersive
gaming experience. 

* Health Care
Healthcare data is coming from numerous medical devices, including those in
doctor's offices, in hospitals and from consumer wearables bought by patients
themselves. But all that data doesn't need to be moved to centralized servers
for analysis and storage -- a process that could create bandwidth congestion
and an explosion in storage needs.

In this case artificial intelligence (AI) and machine learning capable edge
compute resources might be needed to deployed at the Edge (somewhere at the
hospital, I imaging this as network connected devices that are small and not
large servers). These would help medical staff make decisions in real time
and minimize the number of false alarms.

* Industrial IoT
There a a lot of sensors and IoT devices in instustrial environments and
having edge compute resources closer to where this data is used provides low
latency to that immediate reponses to problems are possible. And Edge compute
resources with AI/MI can help improve quality assurance.

* Security 
Surveillance systems can benefit from the low latency and reliability of edge
computing because it’s often necessary to respond to security threats within
seconds. Edge computing also significantly reduces bandwidth costs in video
surveillance, since the vast majority of surveillance footage requires no
response. 

