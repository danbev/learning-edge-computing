## Long Term Evolution (LTE)
Is a project that started in 2004 by the Third Generation Partnership Project
(3GPP). It evolved from the Universal Mobile Telecommunication System (UMTS),
which in turn evolved from the Global System for Mobile Communication (GSM).


In UMTS and GSM there where 3 main components, the core network, the radio
network, and the mobile phone:
```
       UE                                   
 +--------------+      +------------------+       +---------------+
 | Mobile device|<---->|  Radio Access    |------>| Core Network  |
 +--------------+      |  Network         |       |               |
                       |       +---------+|       | +----------+  |
                       |       | GERAN   |----+---->|CS domain |---->PSTN
                       |       +---------+|   |   | +----------+  |
                       |       +---------+|   |   | +----------+  |
                       |       | UTRAN   |----+---->|PS domain |---->Servers
                       |       +---------+|       | +----------+  |  PDNs
                       +------------------+       +---------------+
GERAN = GSM Edge Radio Access Network
UTRAN = UMTS Terrestrial Radio Access Network
CS    = Circuit Switched
PS    = Packet Switched
```
The circuit switched domain transports phone calls accross geographical regions
that the operator covers. It communicated with the Public Switched Telephone
Network (PSTN) which allows mobile phones to make calls to land line, and with
other operator's CS domains. CS sets aside a dedicated bidirectional connection
for each individual phone call which provides a constant data rate and minimal
delay. The connection has enough capacity to handle the case where both parties
are talking at the same time which can be wasteful as that does not really
happen frequently. Also it is not appropriate for data transfers as the data
rate varies for that type of communication.

The packet switched domain transports streams of data between the user and
external packets data networks (PNS) like the internet. In PS data is divided
into packets each which have an address which can be used by routers.

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

MME   = Mobility Management Entity
HSS   = Home Subscriber Server
S-GWY = Servicing Gateway
P-GWY = Packet data network Gateway
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

```

 +--------------+        +-----------+         +---------+
 | Mobile device|<------>|  E-UTRAN  |.........|  EPC    |
 +--------------+  Uu    |           |---------|         |-----
      (UE)               +-----------+   S1    |         |  SGi
                                               +---------+

UE      = User Equipment
E-UTRAN = Evolved UMTS Terrestrial Radio Access Network
EPC     = Evolved Packet Core
UU      = Interface between UE and E-UTRAN
S1      = Interface between E-UTRAN and EPC 
SGI     = 
```

### User Equipment
Has a Mobile Termination (MT) which handles all the communication. I also has
a Terminal Equipment (TE) which terminates the data stream. And ther is also
a Universal Integrated Circuit Card (UICC) which is also known as a SIM card and
this runs an application called Universal Subscriber Identity Module (USIM)
which stores info about a users phonenumber, home network identity, security
keys etc.

### Evolved UMTS Teresstrial Radio Access Network
Handles the radio communication between the mobile and the Evolved Packet Core
(EPC). The components here are called evolved base stations, `eNodeB` or `eNB`
and each of these control mobiles in one or more cells of the mobile network.
The `eNodeB` that a mobile device is communicating with is called its serving
eNB. eNodeB's can be connected to each other eNodeB's using an interface called
X2. This can be used for signaling handover commands. 

Each eNodeB connects to the EPC using an interface named S1


### Home Subscriber Server (HSS)
Is a central database that contains information about the operators subscribers.

### Public Land Mobile Network (PLMN)
Is a network run a one operator in one country. A PLMN is identified by a
globally unique PLMN code. This code consists of Mobile Country Code and a
Mobile Network Code. It is a 5 or 6 digit number in the format: 000-00 or
000-000
For example, the following is the [PLMN](https://en.wikipedia.org/wiki/Mobile_network_codes_in_ITU_region_2xx_(Europe)#Sweden_%E2%80%93_SE)
for my mobile operator:
```
  240-02

Country Code          Mobile Network Code
240=Sweden            02=3 (3/Tre is the name of my mobile Operator)
```

