---
sidebar_position: 2
---

Guide to install Metacall CLI on Linux.

MetaCall is a powerful CLI tool that lets you run functions across different programming languages seamlessly. Follow these simple steps to install it on Linux.

### Step 1 : Open Terminal ###

Open the `Terminal` app on your Linux system. You can usually find it in your applications menu or by pressing `Ctrl + Alt + T`.

### Step 2 : Run the Install Command ###

Copy and paste the following command into your Terminal to install MetaCall CLI:

``` 
 curl -sL https://raw.githubusercontent.com/metacall/install/master/install.sh | sh 
```

Alternatively, if you prefer using `wget`, you can install `wget` (if not already installed) and then use it to install MetaCall CLI.

On Debian/Ubuntu-based systems:

```
 sudo apt update && sudo apt install wget
```

On Red Hat/CentOS-based systems:

```
 sudo yum install wget
```

Then, use `wget` to install MetaCall CLI:

```
 wget -O - https://raw.githubusercontent.com/metacall/install/master/install.sh | sh
```

### Step 3 : Verify Installation ###

Once the installation is complete, verify it by running the `metacall` command:

```
 metacall
```

If the installation was successful, you’ll see the following message:

import LinuxInstall from '@site/static/img/linux-install.png';

<img src={LinuxInstall} />
<br/>
To exit the MetaCall CLI, type `exit` in the Metacall CLI:

import LinuxExit from '@site/static/img/linux-exit.png';

<img src={LinuxExit} />
<br/>
You’re all set! Now you can start using MetaCall to run functions across multiple programming languages. 🐧


