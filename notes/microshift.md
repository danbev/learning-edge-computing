## MicroShift
[MicroShift](https://microshift.io) is an version of OpenShift optimized for
edge computing.

Github: https://github.com/redhat-et/microshift

### Installation
I needed to upgrade to Fedora 35 to make sure the versions lined up.
I got the following error when following the steps in
[getting-started](https://microshift.io/docs/getting-started/):
```console
$ sudo dnf module enable -y cri-o:1.21
[sudo] password for danielbevenius: 
Copr repo for inspectrum owned by domrim                                                                          1.9 kB/s | 1.5 kB     00:00    
Fedora 35 - x86_64                                                                                                 16 MB/s |  79 MB     00:04    
Fedora 35 openh264 (From Cisco) - x86_64                                                                          1.8 kB/s | 2.5 kB     00:01    
Fedora Modular 35 - x86_64                                                                                        4.6 MB/s | 3.3 MB     00:00    
Fedora 35 - x86_64 - Updates                                                                                       11 MB/s |  29 MB     00:02    
Fedora Modular 35 - x86_64 - Updates                                                                              2.4 MB/s | 2.9 MB     00:01    
Copr repo for aarch64-linux-gnu-toolchain owned by lantw44                                                        131 kB/s | 132 kB     00:01    
Copr repo for intel-opencl owned by jdanecki                                                                       46 kB/s |  22 kB     00:00    
Modular dependency problem:

 Problem: conflicting requests
  - nothing provides module(platform:f34) needed by module cri-o:1.17:3420200831181224:058368ca.x86_64
Dependencies resolved.
The operation would result in switching of module 'cri-o' stream '1.17' to stream '1.21'
Error: It is not possible to switch enabled streams of a module unless explicitly enabled via configuration option module_stream_switch.
It is recommended to rather remove all installed content from the module, and reset the module using 'dnf module reset <module_name>' command. After you reset the module, you can install the other stream.
```
I was able to remove/reset the cri-o module:
```console
$ sudo dnf module reset cri-o:1.17
```
And the install
```console
$ sudo dnf module enable -y cri-o:1.21
$ sudo dnf install -y cri-o cri-tools
$ sudo systemctl enable crio --now
```
