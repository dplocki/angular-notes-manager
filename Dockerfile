FROM node:20-alpine

RUN apk add chromium

RUN printf '#!/bin/sh\nchromium-browser \\\n  --no-sandbox \\\n  --headless \\\n  --disable-gpu \\\n  --remote-debugging-port=9222 \\\n  "$@"\n' >> /usr/bin/google-chrome-stable \
  && chmod +x /usr/bin/google-chrome-stable

ENV CHROME_BIN=/usr/bin/google-chrome-stable

WORKDIR /build

EXPOSE 4200 9876 49153

CMD [ "npm", "run", "start" ]
