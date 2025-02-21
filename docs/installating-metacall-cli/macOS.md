---
sidebar_position: 1
---

Guide to install Metacall CLI on macOS.

MetaCall is a powerful CLI tool that lets you run functions across different programming languages seamlessly. Follow these simple steps to install it on macOS.

### Step 1 : Open Terminal ###

Open the `Terminal` app on your macOS. You can find it in `Applications > Utilities > Terminal`.

### Step 2 : Run the Install Command ###

Copy and paste the following command into your Terminal to install MetaCall CLI:

``` 
 curl -sL https://raw.githubusercontent.com/metacall/install/master/install.sh | sh 
```

Alternatively, you can use `wget` if you have it installed. To install wget, run:

```
 brew install wget
```

Then, use wget to install MetaCall CLI:

```
 wget -O - https://raw.githubusercontent.com/metacall/install/master/install.sh | sh
```

### Step 3 : Verify Installation ###

Once the installation is complete, verify it by running the `metacall` command:

```
 metacall
```

If the installation was successful, you’ll see the following message:

import MacInstall from '@site/static/img/metacall-install-mac.png';

<img src={MacInstall} />
<br/>
To exit the MetaCall CLI, type `exit` in the Metacall CLI:

import MacInstallExit from '@site/static/img/metacall-install-mac-exit.png';

<img src={MacInstallExit} />
<br/>
You’re all set! Now you can start using MetaCall to run functions across multiple programming languages. 🚀









