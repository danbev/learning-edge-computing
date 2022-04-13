## Zenoh
Is a protocol for IoT and Edge computing.
But we already have CoAP, MQTT, OPC UA, DDS, LwM2M why do we need a new
protocol?  
The protocols listed all have differ in someways, different modules like
request/response, pub/sub, etc. They are also all concerned with transporting
data.

For IoT devices will produce data, then transmit this data, then compute/process
and perhaps store this data somewhere, and finally data my be accessed by
something else for futher processing. The protocols listed above not care about
the persisting/retreival/processing of data, they are only concered with the
transmission.

Zenoh unifies data in motion, data in-use, data at rest, and computations. It
uses a pub/sub model. It has built-in support for geographically distributed
storage. An example of this could be that data cannot be moved from a certain
location (not be stored outside of a country for example).

Zenoh can run over TCP, UDP, QUIC or whatever protocol. This is the lower level
of Zenoh called zenoh.net.
Then there it the top layer which is called simply zenoh which has APIs for
pub/sub and distributed queries. Data representation transcoding and an
implementation of the geographical distributed storage and compute
functionality.

Zenoh is written in Rust


