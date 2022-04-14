## Multi-access Edge Computing (MEC)
In the examples shown previously we assumed that the IoT devices were in a fixed
location and hence we knew were to place the edge computing resources. But for
cases where the IoT devices can move we will know longer know where to place
the edge computing resources. Multi-access Edge Computing addresses this issue
by placing the edge computing resources at the edge of the cellular network in
the Radio Access Network (RAN) edge. Is the RAN part of the LTE base station?

For a 4G mobile device to communicate with a cloud service it will have to
go through the following components:
```
       UE                                                EPC
 +--------------+      +-----------+               +-------------+
 | Mobile device|<---->|  Radio    |    +------+   | MME     HSS |                    Cloud/Data center
 +--------------+      |  Interface|--->|Cell  |-->|             |    +---------+    +--------+
                       +-----------+    +------+   | S-GWY P-GWY |--->| internet|--->| service|
                                                   +-------------+    +---------+    +--------+
   
                           5ms           5ms    10ms    4ms               4ms            2ms     
```
This is about 35 ms one way and a round trip would be around 70 ms.

Now, with MEC we would move the service into the operators network, somewhere
to the left of the EPC:
```
       UE                                                EPC
 +--------------+      +-----------+               +-------------+
 | Mobile device|<---->|  Radio    |    +------+   | MME     HSS |                    Cloud/Data center
 +--------------+      |  Interface|--->|Cell  |-->|             |    +---------+    +--------+
                       +-----------+    +------+   | S-GWY P-GWY |--->| internet|--->| service|
                                           ↓       +-------------+    +---------+    +--------+
                                        +-------+
                                        |service|
                                        +-------+
   
                           5ms           5ms    
```
Notice that our time is now 10ms one way and 20 ms for a round trip.

This provides applications low latency, high bandwidth, and the environment will
offer cloud computing like capabilities and also realtime radio network
conditions (allowing to act upon changes in network conditions).

Telephone companies (Telco) provide telecommunication services and have
existing infrastructure, but most are not data centers, at least not yet. But
this is changing and these are being converted/updated to be mini data centers
with servers and cloud native network functions virtualization (NFV)
applications.

Network Functions Virtualization is about taking networking functionality which
would prevoiusly have been provided by custom hardare appliances and instead
run these functionalities on commodity hardare, called Commercial Off the Shelf
COTS. This allows for all the benifits of using virtualization in enterprise
clouds with management, scaling etc.
MEC is also based on a virtualized platform much like NFV but instead of
network functionality it allows applications to be run. It should/could be
possible to run both on them platform. This is really powerful and one thing
that stood out to me was the ability to scale up/down on demand, where
previously when custom hardware was used I guess there had to be enough to
handle spikes in traffic and othertime this would just be idle.

There is also a tie in with 5G and MEC which I will dig into later.

MEC provides low latency (closer to end users).

Now, to avoid vendor lock-in (Telco provider) and having specific solutions for
each telco provider a standardized API is need and is what MEC standard provides.
For deployment a framework like Kubernetes is useful. There are slimmed
version of Kubernetes like `K3S` and `KubeEdge` which can be use by these
devices.

I found this [whitepaper](https://www.etsi.org/images/files/ETSIWhitePapers/etsi_wp11_mec_a_key_technology_towards_5g.pdf)
to be a worth while read and has some good example usecases. It states that
MEC's can be deployed in LTE base stations (eNodeB).

In addition to "just" being able to move applications closer to the edge and
deploy them in MEC's the MEC environment will provides a number of
[APIs](https://forge.etsi.org/rep/mec) that these applications can use.

### Architecture overview
```
                                                 MEC system level
  +------+    +---------------------------+
  |Device|----|MEC system level management|
  +------+    +---------------------------+

---------------------------------------------------------------
                                                 MEC host level

  +----------------------------------------+  +----------------+
  |+-------------------+  +--------------+ |  | MEC host level |
  || +-------++-------+|  | MEC Platform | |  | management     |
  || |MEC App||MEC App||  |              | |  |                |
  || +-------++-------+|  |              | |  |                |
  || ...               |  |              | |  |                |
  |+-------------------+  |              | |  |                |
  |+-------------------+  +--------------+ |  |                |
  ||Virualization Layer|                   |  |                |
  ||(e.g. NRVI)        |                   |  |                |
  |+-------------------+                   |  |                |
  +----------------------------------------+  +----------------+

---------------------------------------------------------------
                                                 Networks
  +-------------+  +-----------------+
  |Local Network|  |External network |
  +-------------+  +-----------------+ ...
```
An MEC Host contains MEC platform and the virtualization infrastructure. 

CFS Customer Facing Service

### API
There are currently 7 API for MEC.
Below GS stands for Group Specification.

#### Radio Network Information API
Spec: [GS MEC 012 Radio Network Information API](https://www.etsi.org/deliver/etsi_gs/MEC/001_099/012/01.01.01_60/gs_MEC012v010101p.pdf)

This specification introduces an Radio Network Information Service (RNIS)
which can be used by MEC applications (and the MEC platform) and provides access
to radio network conditions, information about user equipments (UE) connected
to radio node(s) associated the MEC host. This information is contained in a
struture named Radio Network Infomation (RNI). This information can be retreived
using RESTful interfaces or if there is a need to have frequent updates it is
able to subscribe to a message broker topic (the spec does not dictate the
actual protocol to be used).
There are message formats specified for JSON and for protobuf to be used with
the specific communication protocols used.

Consumers of RNIS use the RNI API which supports both queries and subscriptions
over a RESTful API or a message broker.



### Application Package
Is a bundle of files provided by application provider, on-boarded into mobile
edge system and used by the MEC system for application instantiation,
including an application descriptor, a VM image or a URL link to a VM image,
a manifest file, and other optional files.

#### K3S
Provides the full power of Kubernetes but is more light weight but still around
50MB binary, built for ARM.

[K3S](https://k3s.io/)


#### KubeEdge
100% compatible with Kubernetes API, optimized for edge (components and
runtime).

[KubeEdge](https://kubeedge.io/en/)

TODO:
