## The Journey of a Web Request

To help you visualize what happens behind the scenes when you visit a website,
let's discuss the various steps involved in connecting to a remote server and
fetching content.

---

### The Steps

We will choose an arbitrary website, such as `https://example.com` (which for
historical technical reasons is always an example) or `https://nerdtx.dev`
(where this textbook lives).

| Step | What Happens                                | Example                         |
| ---- | ------------------------------------------- | ------------------------------- |
| 1    | You type in a URL in your browser           | `https://example.com`           |
| 2    | Browser checks your local network or cache  | —                               |
| 3    | DNS lookup occurs                           | `example.com` → `93.184.216.34` |
| 4    | Request packet is built using HTTP          | Includes method: `GET`          |
| 5    | Packet travels through routers and networks | Home → ISP → backbone → server  |
| 6    | Web server receives request and responds    | Sends back HTML page            |
| 7    | Browser renders the content                 | You see the homepage            |


Don't fear if this is confusing!

We will recreate these steps individually with certain tools later, such as:
`ping`, `traceroute`, `dig`.

---

## Visual Aid: “What Happens When You Visit a Website?”

A clean, poster-style diagram showing:

```
[Your Laptop]
    ↓
[Wi-Fi Router]
    ↓
[ISP]
    ↓
[DNS Lookup]
    ↓
[Multiple Routers]
    ↓
[Web Server]
    ↓
[HTML Sent Back]
    ↓
[Your Browser Displays the Page]
```

Keep in mind some form of these steps (almost...) always occur, they just may
seem instantaneous.


