## Learning Edge Computing
Projects to gather notes and examples around edge computing.

### Edge computing background
Over the recent years more and more IoT devices have been deployed and these
devices are creating more an more data that we want to use in some way. What is
currently most often the case is that these IoT devices are connected to
some sort of gateway what will route the data to a cloud service for handling
(analysis, processing, storing etc.). The number of deployed devices is
increasing every day and more and more data needs to be handled, and this is
going to cause issues with bandwidth. There are also more devices that require
lower latency from its services. For example, self driving cars might not have
time to wait for cloud service responses, and another example is servailance
cameras that generate huge amounts of data. These are some of the driving
forces, to moving networked computing resources closer to where the data is
created.

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
a self-driving car might be able to wait for a packet to be transported to/from
a cloud service.
There is also the issue with that an application might not allow for disconnect
to the cloud service. Again a self-driving car must be able to continue if such
an break occurs.

Security is also a concern here as these IoT devices are outside of the cloud
services network but if the devices are sending data to the cloud services an
attacker might be able exploit that fact by causing the device to send harmful
or false data to the cloud service.

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
An edge server is server or computer that is located where, or close to where,
data is being generated. So it receives data from IoT devices like sensors and
can store, process, or send the data to the cloud (or all three I guess). But
data does not need to be sent to the cloud and might be processed by the edge
server itself.

I initialy thought of the edge compute resources as a normal server in a rack
for example, but these can be small dedicated devices (small single board
computers) like a [lattepanda](https://www.lattepanda.com/) or a
[udoo bolt](https://www.udoo.org/discover-the-udoo-bolt/), or a
[Khadas Edge V](https://www.khadas.com/edge), or a
[Jetson Nano](https://developer.nvidia.com/embedded-computing).


Now, an extension of the Edge compute resource is to have a mini cloud of sort
that has some of the same features of a cloud, like scalability for example.
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

### Multi-access Edge Computing (MEC)
In the examples shown previously we assumed that the IoT devices were in a fixed
location and hence we knew were to place the edge computing resources. But for
cases where the IoT devices can move we will know longer know where to place
the edge computing resources. Multi-access Edge Computing addresses this issue
by placing the edge computing resources at the egde of the cellular network.
This could be at the cellular base station

Telephone companies (Telco) provide telecommunication services and have
existing infrastructure but most are not data centers, at least not yet. But
this is changing and these are being converted/updated to be mini data centers
with servers and cloud native NFV applications.

Now, to avoid vendor lock-in and having specific solutions for each telco
provider a framework like Kubernetes is useful.

#### K3S
Provides the full power of Kubernetes but is more light weight but still around
50MB binary, built for ARM.

[K3S](https://k3s.io/)


#### KubeEdge
TODO:
[KubeEdge](https://kubeedge.io/en/)
