```mermaid
sequenceDiagram
    participant browser
    participant server 
    browser->>server: Send user's input by HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->browser: 302 FOUND - Send an URL redirect, ask to set other HTTP GET. 
    browser->>server: Send HTTP GET for note page https://studies.cs.helsinki.fi/exampleapp/notes 
    server-->browser: Response with notes 
    browser->>server: Send HTTP GET for main.css https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->browser: Response with main.css 
    browser->>server: Send HTTP GET for main.js https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->browser: Response with main.js
    browser: start to executing js code which request json data from server
    browser->>server: Send HTTP GET for data.json https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->browser: Response with data.json
    browser: execute event handler which render notes to show to browser 

```





