# Upty

Uptime monitor for **Detonions**.

## Install

[![Install on Deta](https://deta.space/buttons/dark.svg 'Deta.space')](https://deta.space/discovery/@xarzoa/upty)

🍻**Deta's shipathon winner** for **best app icon**.

**Notes**

- We do not recommend to share your `upty-x-random.deta.app` with anyone. Share your custom domain.
- You have to use `upty-x-random.deta.app` to add/delete your monitors.
- You can share `upty-x-random.deta.app/public`(not recommended) or `your-custom-domain.tld/public`.
- Still under development, Wait until atleast 0.5.0 for stable release.

## Key features

- Public page.
- More details about your page/url/ip.
- Supports IPs.
- No verificaton.
- Public API.
- Open source.
- Discord notifications.
- Dedicated timers for notifications and status checkers.

## FAQ

**How things work?**

Sending get requests to your urls using axios on a schedule.(OSS, if you wanna sneak-peek)

**Setup?**

- Install 
- Goto app
- Add a moniter
- You're live.

**I wanna to check my pages every 10mins.**

- Goto space app settings
- Goto schedules tab
- Change **checking status** time to 10mins.

**I wanna to check my pages every 2days.**

- Goto space app settings
- Goto schedules tab
- Change **sending alerts** time to 2days.

**Is it safe to share my instance url with someone else?**

No, But it's okay while u sharing `/public`. Unless page won't work.

**Public api?**

Yea, you can use,
 - `your-deta-app-url/api/getStatus` - Get status as Object
 - `your-deta-app-url/api/getUrls` - Get your urls as Object

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

By (xarzoa)[https://xat.icu].

Copyright 2023.
