### MEC Node exploration code
The sole purpose of this example is to gain an understanding of the RESTful API
provided by MEC and in particular the publish/subscribe model using HTTP(s).

I can't remember ever implementing a client that uses HTTPS with a pub/sub model
and was not sure about what it would look like. The idea here is to simulate
the MEC Radio Network Information (RNI) service, which is done by
[server.js](./server.js).

The server can be started using (after running `npm i`):
```console
$ node server.js
Services:
URL: /rni/v1/subscriptions/cell_changed
```
The server will listen for requests and add these subscribers to a Map. It will
regularly process this Map and send notifications to the subscribers to
simlulate an event.

The main focus here is the client code as the server would be implemented by
the MEC Host provider (like a Telecommunications Operator). A client will
POST a subscription request to the server. The body of the POST request will
contain a field named `callbackReference` which should be the URL that the
server will POST to when a cell_changed event happens and is used to notify the
client of this event.

```console
$ node client.js
cell_changed notification
{
  timeStamp: 1650371488901,
  srcEcgi: { mcc: 's-123', mnc: 's-456', cellId: '999' },
  trgEcgi: { mcc: 't-123', mnc: 't-456', cellId: '999' },
  hoStatus: 3,
  tempUeId: { mmec: '1', mtmsi: '1' }
}
```
Now if we look at this code it is not nice at all, even overlooking the fact
that it is just example code written in as little time as possible to not
sink/waste too much time. The code has the a HTTP(S) client and HTTP(S) server.

Perhaps we could offer a module that hides some of this and makes it simpler
for an end users to handle. 
```
$ node client2.js
Nodeshift MEC init
cell_changed notification
{
  timeStamp: 1650373708096,
  srcEcgi: { mcc: 's-123', mnc: 's-456', cellId: '999' },
  trgEcgi: { mcc: 't-123', mnc: 't-456', cellId: '999' },
  hoStatus: 3,
  tempUeId: { mmec: '1', mtmsi: '1' }
```
So the functionality is the same but there is less code in
[client2.js](./client.js). 

Just to be clear this code only meant as a suggestion and can obviously be
improved but I mostly wanted to explore this and get some feedback from others
on the team.
