#Producer/Consumer Services      [![Build Status](https://travis-ci.org/ecasilla/invision.svg?branch=master)](https://travis-ci.org/ecasilla/invision)

The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

Requirements

At a minimum, we would like to see the following implemented:

The Producer and Consumer as separate NodeJS services.
The Producer generating random addition expressions of two positive integers, e.g. "2+3="
The Consumer computing and returning the correct mathematical result for the each expression it receives
The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
The Consumer and Producer should log all messages they generate and receive.
You are free to support more than simple addition, but it is not required.

The end product should:

Be built in strict JavaScript and run with NodeJS
NOT rely on any external services like Redis, ZeroMQ or similar technologies
NOT use Express (Connect is Ok)
Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
Include Unit tests


##FAQ

###These Are two separate projects under one repository. So you will need to run two separate shells minimum in order to get the two services communicating. Only one Consumer is allowed per port but (N) number of producers can be spawned..


##Configuring The Producer
```bash
 $ cd invision_producer && chmod ugo+x ./install.sh && ./install.sh
```
###Running Producer Tests
```bash
 $ npm test
```
###Starting The Producer

```bash
$ npm start // This will output all activity
$ npm start:response //This will output only response activity
```
##Configuring The Consumer
```bash
$  cd invision_consumer && chmod ugo+x ./install.sh && ./install.sh
```
###Starting The Consumer

```bash
$ npm start // This will output all activity
$ npm start:response //This will output only response activity
```

###Running Consumer Tests
```bash
 $ npm test
```



### UML Activity Diagram
![UML Activity Diagram](https://github.com/ecasilla/invision/blob/master/assets/Activity_Diagram.png?raw=true)



### UML Sequence Diagram
![UML Sequence Diagram](https://github.com/ecasilla/invision/blob/master/assets/Sequence_Diagram.png?raw=true)