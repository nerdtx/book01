## Activity: Tracing a Packet’s Journey

### Objective:

Help students visualize how data travels across the internet using real tools
and real destinations.

---

### What You’ll Need:

* Any internet-connected computer (Windows, macOS, or Linux)
* Access to the command line (Terminal, Command Prompt, or PowerShell)

---

### Instructions:

#### Step 1: Choose a Destination

Pick a familiar website like:

* `google.com`
* `wikipedia.org`
* `nerdtx.dev`

#### Step 2: Run a Traceroute

| System      | Command                 |
| ----------- | ----------------------- |
| Windows     | `tracert google.com`    |
| macOS/Linux | `traceroute google.com` |

#### Step 3: Observe the Output

Each line shows a router your data passed through:

* You’ll see the IP address of each “hop”
* You may see geographic hints or delays (measured in ms)

---

### Worksheet (Example):

| Hop # | IP Address     | Notes              |
| ----- | -------------- | ------------------ |
| 1     | 192.168.1.1    | My home router     |
| 2     | 10.12.5.1      | ISP internal       |
| 3     | 104.75.129.44  | Regional backbone  |
| 4     | 142.250.65.238 | Google data center |

---

### Bonus Challenges:

* Try tracing to websites in different countries
* Compare the number of hops to different destinations
* Look up any public IPs with tools like `iplocation.net`

---

> **Pendergast’s Helpful Hint:**
> “If you ever wanted to know what happens between pressing Enter and seeing a
> web page, this is it—every ‘hop’ is a handshake across the globe!”

