---
sidebar_position: 4
tags:
  - machine-learning
  - python
---

Guide to install Metacall CLI on Docker.

MetaCall is a powerful CLI tool that lets you run functions across different programming languages seamlessly. Follow these simple steps to install it on Docker.

### Step 1 : Download Docker and Verify ###

Open the `Terminal` app on your system and check the version of Docker if installed. If Docker is not installed use the following guide: <a href="https://docs.docker.com/engine/install/" target="_blank">`Docker Installation`</a>

```
    docker --version
```

### Step 2 : Pull Metacall Image from Docker Hub ###

```
    docker pull metacall/core
```

### Step 3 : Run Metacall Container ###

After pulling the image, run the container in iteractive mode.

```
 docker run -it metacall/core
```

If the installation was successful, you’ll see the following message:

import DockerInstall from '@site/static/img/docker-install.png';

<img src={DockerInstall} />
<br/>
To exit the MetaCall CLI, type `exit` in the Metacall CLI:

import DockerExit from '@site/static/img/docker-exit.png';

<img src={DockerExit} />
<br/>
You’re all set! Now you can start using MetaCall to run functions across multiple programming languages. 🚀
