---
sidebar_position: 3
---

Guide to install Metacall CLI on Windows.

MetaCall is a powerful CLI tool that lets you run functions across different programming languages seamlessly. Follow these simple steps to install it on Linux.

### Step 1 : Open Terminal ###

Open the `Terminal` app on your Linux system. You can usually find it in your applications menu or by pressing `Ctrl + Alt + T`.

### Step 2 : Run the Install Command ###

Copy and paste the following command into your Terminal to install MetaCall CLI:

``` 
 powershell -NoProfile -ExecutionPolicy unrestricted -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; &([scriptblock]::Create((Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/metacall/install/master/install.ps1')))"
```

### Step 3 : Verify Installation ###

Once the installation is complete, verify it by running the `metacall` command:

```
 metacall
```

If the installation was successful, you’ll see the following message:

import WinInstall from "/static/img/win-install.png";

<img src={WinInstall} />
<br/>
To exit the MetaCall CLI, type `exit` in the Metacall CLI:

import WinExit from '/static/img/win-un.png';

<img src={WinExit} />
<br/>
You’re all set! Now you can start using MetaCall to run functions across multiple programming languages. 🚀