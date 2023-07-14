```mermaid
sequenceDiagram
    participant browser
    participant server 
    browser->>server: send new notes 
    server->>browser: send an url direct, ask user send https get 
    browser-->server: ask for style sheet 
    browser-->server: ask for js code 
    browser-->server: ask for raw data 

```

