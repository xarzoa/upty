# Upty

Uptime monitor, Made for **Detonions**, Made on **Deta**.

## Install

[![Install on Deta](https://deta.space/buttons/dark.svg 'Deta.space')](https://deta.space/discovery/@xarzoa/upty)

**Notes**
- Don't share your space app url with anyone. (We highly recommend to share custom domain.). If u don't have a custom domain just share `your-appurl/public` with anyone.
- Maybe unstable and maybe got some serious bugs rn. Wait until at least version 0.2.5 for stable update.

## Features

- Public page (`your-public-domain/`, `your-appurl/public`*)
- No verificaton
- Public API
- Open source
- Discord webhook for notifications.

* Not recommeded.

## FAQ

**How things work?**

Doing some magic with _deta actions_.
(Open source, if you wanna sneakpeek)

**How to setup?**

- Install
- Goto app
- Add your monitor
- Yay! You're live.

**How can I change checking time**

- Goto space app settings
- Goto actions tab
- Change action time for your need.

**Do I have API access**

Yea, you can use,

- `your-deta-app-url/api/getStatus` - Get status as Object
- `your-deta-app-ur/api/getUrls` - Get your urls as Object

### Example request

```sh
curl http://your-app-url/api/getStatus

curl http://your-app-url/api/getUrls
```

### Example responce

**/getStatus**

```json
{
  "status": [
    {
      "added_date": "2023-02-10T13:24:52.507Z",
      "code": 200,
      "key": "58fd9754-34b7-461c-b0f5-8d4f3b6ea6cc",
      "last_checked": "2023-02-12T13:34:51.981Z",
      "message": "OK",
      "name": "xat",
      "status": 200,
      "string": "https://xat.icu"
    },
    {
      "added_date": "2023-02-10T20:23:55.423Z",
      "code": 200,
      "key": "92e47d7a-45f9-4ef5-a730-5d0b5bfe3c10",
      "last_checked": "2023-02-12T13:34:52.264Z",
      "message": "OK",
      "name": "Google",
      "status": 200,
      "string": "https://google.com"
    }
  ]
}
```

**/getUrls**

```json
{
  "urls": [
    {
      "key": "58fd9754-34b7-461c-b0f5-8d4f3b6ea6cc",
      "name": "xat",
      "string": "https://xat.icu"
    },
    {
      "key": "92e47d7a-45f9-4ef5-a730-5d0b5bfe3c10",
      "name": "Google",
      "string": "https://google.com"
    }
  ]
}
```

Copyright 2023
