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
The MEC applications can access MEC services, receive traffic rules

```
CFS Customer Facing Service
Mp = Reference points regarding the ME platform
Mm = Reference point for managment services
Mx = Reference point for external services
RAB = Radio Access Bearer
```

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
There are message formats specified for JSON, and for protobuf to be used with
the specific communication protocols used.

Consumers of RNIS use the RNI API which supports both queries and subscriptions
over a RESTful API or a message broker.

##### Radio Access Bearer information
```
GET {apiRoot}/rni/v1/quieries/rab_info
```
The type of information that is returned by this request is:
```
timestamp   
appInsId    Unique Id of the mobile edge app instance (string).
requestId   Unique id assigned by the MEC application app for this RAB request.
cellUserInfo { 0..N
  ecgi  {     
    mmc       Mobile Country Code of the PLMN. For example, 240 for Sweden.
    mnc       Mobile Network Code of the PLMN. For example, 02 for 3/Tre.
    cellId    E-UTRAN Cell Global Identifier. Is this the id of the eNodeb perhaps?
  },
  ueInfo {
    associateId  ??
    erabInfo {
      erabId     Identifier for RAB.
      erabQosParameters {
        qci      Quality of Service Class Identifier.
        qosInformation {
          erabMbrDI   Max Down Link Bit rate
          erabMbrUI   Max Up Link Bit rate
          erabGbrDI   Guaranteed Down Link Bit rate
          erabGbrUI   Guaranteed Up Link Bit rate
        }
      }
    }
}
```

##### Public Land Mobile Network Info
A PLMN is is a network run a one operator in one country.

```
GET {apiRoot}/rni/v1/quieries/plmn_info
```
The type of information that is returned by this request is:
```
appInsId    Unique Id of the mobile edge app instance (string)
ecgi  {     
  mmc       Mobile Country Code of the PLMN. For example, 240 for Sweden.
  mnc       Mobile Network Code of the PLMN. For example, 02 for 3/Tre.
  cellId    E-UTRAN Cell Global Identifier. Is this the id of the eNodeb perhaps?
}
```

##### S1 Bearer Info
Recall that `S1` is the interface between `E-UTRAN` and the Evolved Packet Core:
```

 +--------------+        +-----------+         +---------+
 | Mobile device|<------>|  E-UTRAN  |.........|  EPC    |
 +--------------+  Uu    |           |---------|         |-----
      (UE)               +-----------+   S1    |         |  SGi
                                               +---------+

UE      = User Equipment
E-UTRAN = Evolved UMTS Terrestrial Radio Access Network
EPC     = Evolved Packet Core
Uu      = Interface between UE and E-UTRAN
S1      = Interface between E-UTRAN and EPC 
```

```
GET {apiRoot}/rni/v1/quieries/s1_bearer_info
```

##### Subscriptions
```
GET {apiRoot}/rni/v1/subscriptions
GET {apiRoot}/rni/v1/subscriptions/{subscriptionType}
GET {apiRoot}/rni/v1/subscriptions/{subscriptionType}/{subscriptionId}
POST {apiRoot}/rni/v1/subscriptions/{subscriptionType}

Subscription Types:
cell_changed
rab_est
rab_mod
rab_rel
meas_rep_ue
ta
ca_reconf
s1_bearer
```
The body of the POST request will contain the data specified in section
6.3 Data Model.

To fully understand these values and properties in the messages it is helpful
to learn a little about [LTE](./lte.md).

#### Location API
Spec: [GS MEC 013 Location API](https://www.etsi.org/deliver/etsi_gs/MEC/001_099/013/02.02.01_60/gs_MEC013v020201p.pdf)


#### Bandwitdh Management API
TODO:

#### UE Identity API
https://www.etsi.org/deliver/etsi_gs/MEC/001_099/013/02.02.01_60/gs_MEC013v020201p.pdf

Allows for UE specific traffic rules in the MEC system.

### Application Package
Is a bundle of files provided by application provider, on-boarded into mobile
edge system and used by the MEC system for application instantiation,
including an application descriptor, a VM image or a URL link to a VM image,
a manifest file, and other optional files.

#### K3S
Provides the full power of Kubernetes but is more light weight but still around
50MB binary, built for ARM. This is Rancher's/SuSE's kubernetes distribution
which is equivalent to Red Hat's MicroShift, or Canonical's microK8s, or
Mirantis's k0s.

[K3S](https://k3s.io/)


#### KubeEdge
100% compatible with Kubernetes API, optimized for edge (components and
runtime). It is Huawei's upstream for their IoT platform.

[KubeEdge](https://kubeedge.io/en/)

TODO:


### MobilEdgeX
Is an Edge Computing company that was founded by Germany's Deutsche Telecom in
2018. They were [aquired](https://www.lightreading.com/the-edge/google-cloud-acquires-mobiledgex-will-make-it-open-source/d/d-id/777163)
by Google in April 2022 and their offerings are to be open sourced.

[Article](https://gulfsouthtowers.com/mobileedgexs-first-public-cloud-edge-network-is-live-with-deutsche-telekom/)  
[Github](https://github.com/mobiledgex)  

TODO: Take a closer look at this and see if the offer any MEC APIs. For a while
I was not able to find any information about them but his might have been because
of the aquisition by Google (like I was not able to access there site at all to
read their documentation).


### AWS WaveLength
"AWS Wavelength embeds AWS compute and storage services within 5G networks,
providing mobile edge computing infrastructure for developing, deploying, and
scaling ultra-low-latency applications."

"application traffic from 5G devices reach application servers running in
Wavelength Zones without leaving the telecommunications network. This avoids
the latency that would result from application traffic traversing multiple hops
across the internet to reach its destination, which allows customers to take
full advantage of the latency and bandwidth benefits offered by modern 5G
networks"

Wavelength Zones are now generally available in partnership with Verizon in the
United States, KDDI in Japan, SK Telecom in South Korea, and Vodafone in UK and
Germany.

[Developer Guide](https://docs.aws.amazon.com/wavelength/latest/developerguide/how-wavelengths-work.html)
[JavaScript SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)

I've not been able to find any information about developing applications that
take advantage/use services of the Edge Host environment like the RNIS API or
Location API.

