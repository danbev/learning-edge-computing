## Long Term Evolution (LTE)
Is a project that started in 2004 by the Third Generation Partnership Project
(3GPP). It evolved from the Universal Mobile Telecommunication System (UMTS),
which in turn evolved from the Global System for Mobile Communication (GSM).


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

```

 +--------------+        +-----------+         +---------+
 | Mobile device|<------>|  E-UTRAN  |.........|  EPC    |
 +--------------+  Uu    |           |---------|         |-----
      (UE)               +-----------+   S1    |         |  SGi
                                               +---------+

UE = User Equipment
E-UTRAN = Evolved UMTS Terrestrial Radio Access Network
EPC = Evolved Packet Core
```


