# MetaCall: A Beginner's Guide (Introduction, CLI, FaaS & Deploy)

## What is Metacall?

MetaCall is an extensible, embeddable, and interoperable cross-platform polyglot runtime. It supports NodeJS, Vanilla JavaScript, TypeScript, Python, Ruby, C#, Java, WASM, Go, C, C++, Rust, D, Cobol and more.

**In short:** Metacall allows us to use programming languages interoperably.

### Example:

```javascript
// main.js
const { sum } = require("./sum.py");

let temp = sum(3, 4);

console.log(temp);
```

```python
# sum.py
def sum(a,b):
    return a+b
```

```bash
metacall main.js    # executing the main.js function using metacall
7
```

## How to get started?

You might be eager to make a PR as quickly as possible, but there's a catch. It's not very straightforward to jump directly into the issues. Instead, it's better to first understand Metacall by running and creating examples.

By examples I mean, trying out the use cases of Metacall.

Some are created by contributors here: https://github.com/metacall/examples

### Understanding the Repository Structure

MetaCall Github repo link: https://github.com/metacall

Now, you must be overwhelmed by seeing 100+ repositories, but don't worry we will need only a few of them to get started.

### Main components in the metacall Repositories:

#### (1) CORE

This is the polyglot itself, the bare bones of the project. It is mainly written in C/C++ but it also has other languages which you can work with (NodeJS, Python, C#, Java…), but before getting your hands dirty here make sure you understand C/C++ very well, this is the most complex portion of the Metacall.

#### (2) FAAS

If you've been diving into cloud computing or serverless tech, you might have come across the term FaaS, which stands for **Function as a Service**. In simple terms, FaaS lets developers run small pieces of code (called functions) in the cloud without worrying about managing servers. You write your code, deploy it, and voilà — it runs when needed, scaling automatically!

MetaCall FaaS is a serverless platform created by the folks at MetaCall. It's a high-performance, production-ready environment where you can deploy services, web apps, and serverless functions (lambdas) in seconds.

You might want to watch this: [Deploy a hundred functions in a few clicks with MetaCall](https://www.youtube.com/watch?v=2RAqTmQAWEc)

#### (3) DEPLOY

Metacall Deploy is a command-line tool designed to deploy serverless functions to the MetaCall FaaS (Function as a Service) platform. It simplifies the deployment process, allowing developers to deploy their serverless functions quickly without needing to interact with the MetaCall Dashboard.

Now what is Metacall dashboard? You can get it here: https://dashboard.metacall.io/

This much introduction is sufficient: now let's get started!

## Let's start

### Installing MetaCall

Installation guide: https://github.com/metacall/install

**For Ubuntu:**

```bash
curl -sL https://raw.githubusercontent.com/metacall/install/master/install.sh | sh
```

**For Windows:**

```powershell
powershell -NoProfile -ExecutionPolicy unrestricted -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; &([scriptblock]::Create((Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/metacall/install/master/install.ps1')))"
```

### Running MetaCall CLI

Now, since you have installed metacall, let's run it.

Go to your terminal and write `metacall` and boom! You will get the CLI (Command Line Interface).

If you write `help` you will get all the supported commands.

### Three Most Handy Commands:

- **`load`** - Used when you want to load a file (the python file, the node file etc) to metacall runtime.
- **`inspect`** - Used when you want to check what functions are loaded to metacall runtime.
- **`call`** - Used when you want to call the function which are loaded.

### Example Usage

Let's get back to the `sum.py` file (see the first example of this blog).

Now we will try to load it, we will have to use the command:

```bash
load py sum.py
```

**Note:** We need to specify the runtime of the file. Here it's `py`, similarly for nodejs file it will be `node`.

Now, try to execute the loaded function. Here the loaded function will be `sum`, we will have to use the command like this:

```bash
call sum(1,2)
```

In the CLI it will print the value `3`.

**Note:** Here `0` indicates that the loading of `sum.py` was successful.

Try the `inspect` command by yourself.

## FAAS and Deploy

Now, let's move to FAAS and Deploy and see how it works.

**Note:** Here whenever we will say faas, actually it refers to **local FaaS**.

You must be confused right?

When referring to the Real version of MetaCall FaaS, it should be noted that this refers to the commercialized FaaS cloud service, whereas Local refers to the mimic version. Since we can't share the commercialized FaaS, but developers need to use faas, thus we have a mimic version called the local faas but here I will refer to the local faas as "faas" only.

**Note:** Here I will give you the FaaS and Deploy setup process for Ubuntu (Linux), but it is similar for Windows.

### How to use FaaS?

**Note:** We generally use the FaaS and Deploy tool together.

First of all let us clone the FaaS repo:

https://github.com/metacall/faas

And setup it using the necessary steps given in the readme:

https://github.com/metacall/faas/blob/master/README.md

Now, we need to install the deploy tool. In the terminal use the command:

```bash
npm install -g @metacall/deploy
```

It will install the Deploy tool globally.

### Deploying a Function

Now, let us create a folder named `tutorial` where we will place the `sum.py` file and try to deploy it to FaaS using the Deploy tool.

#### Follow the below steps:

**(1)** Start the FaaS (by moving to the cloned FaaS repository and doing `npm start`)

**(2)** Now let's move to the `tutorial` folder where we placed the `sum.py`

**(3)** Open a new terminal and navigate to this folder, and execute the command:

```bash
metacall-deploy --dev
```

Here it is asking if you want to create a `metacall.json`, select **Y**.

Now, here the Static Files represent other files, just ignore it for now, and select **Python**. It automatically detected that we have a python file in the tutorial folder. Press space and enter, then it will ask you to select the python files. There select `sum.py`.

Now, it is asking if we want to add environment variables, just ignore it as of now, and select **N**.

Nice! Now the deploy tool started to deploy the `sum` function which is inside the `sum.py`.

### Checking the Deployment

Now, let's check if it is deployed or not.

Use the command:

```bash
metacall-deploy --dev --inspect
```

In a new terminal window.

And Boom! We can see our deployed function over the cloud i.e metacall faas.

### Using the Deployed Function

Now, how to use it?

We can make a POST request to the endpoint using curl and get the return value from the `sum` function which was deployed to FaaS.

```bash
curl -X POST "http://localhost:9000/rohan-virtual-machine/tutorial/v1/call/sum" \
     -H "Content-Type: application/json" \
     -d '{"a":5,"b":6}'
```

Now, we expect that we will be getting `11`.

Voilà! It worked, we got `11` as the response.

## Conclusion

I hope this blog has given you a clear understanding of MetaCall, its repositories, and tools like FaaS and Deploy.

Thank you for taking the time to read! If you found this article helpful, then please don't forget to hit the applaud button and also do share your thoughts in the comments below. Your feedback and questions are always welcome.

Happy coding, and keep exploring! 🚀

[Original Article](https://medium.com/@rohankumarmahato345/metacall-a-beginners-guide-introduction-cli-faas-deploy-50bdbbcd37f3)
