## Activity: Simulate the Client–Server Model

### Objective:

Students will act out the flow of a client-server interaction using a classroom
skit.

**Client-Server: A One Act Play!**

---

### Script One: It just works

**Roles:**

* One student is the **User** (human)
* One student is the **Client** (browser)
* One student is the **Server** (website)
* One student is the **Protocol Handler** (HTTP)


User: "Hey browser, show me example.com/hello.html" _normally you'd type this or
use voice to text_

Client: “I would like to visit `https://example.com/hello.html`.”

Protocol Handler: “Routing your request…”

_Protocol Handler walks across the room to the Server_

Server: “Request received! Sending back `hello.html`.”

_Server gives Protocol Handler a page_

Protocol Handler: “Delivering the page to the client..."

_Protocol Handler walks across the room to the Client_

Client: “I received the web page and now I’m displaying it.”

---

### Script Two:  Now let's complicate it!

* One Student is the **User** (human)
* One student is the **Client** (browser)
* One student is the **Server** (website)
* One student is the **Protocol Handler** (HTTP)
* One or more students will act as **Latency** factors, or delay before data is
  transmitted

User: "Hey browser, how about that example.com/hello.html yo..."

Client: “I would like to visit `https://example.com/hello.html`.”

Protocol Handler: “Routing your request…”

_Protocol Handler should walk towards the Server_

_Latency Factors will hamper Protocol Handler ... (don't hurt PH, just slow them
down)_

_Protocol Handler arrives at Server_

Server: “Request received! Sending back `hello.html`.”

_Server hands PH a page_

Protocol Handler: “Delivering the page to the client…”

PH walks back towards Client.. Latency kicks in again_

Client: “I received the web page and now I’m displaying it.”

User: "ABOUT TIME!"

---


Delay (latency), dropped packets (miscommunication), and timeouts
show why networking protocols must be reliable and repeatable.

---

## Visual Aid Suggestion: Client–Server Request Diagram

A labeled horizontal flowchart showing:

```
[Browser (Client)] 
    → “GET /about.html” 
        →
        [Server]
        ← “200 OK + HTML page” 
    ←
```

