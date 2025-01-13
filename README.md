# Fantasy Showdown API

### Overview

This repository contains the backend API for Fantasy Showdown, built using NestJS. It provides the core functionality, including user authentication, data management, and interaction with external services.

### Setup Instructions

Clone Repository:

```git clone https://gitlab.creasoft.io/fantasyshowdown/FantasyShowdownAPI.git```

### Install Dependencies:

```npm install```

 or

```npm install --legacy-peer-deps```

### Configure Environment Variables:

Create a .env file in the root directory.

Add the following environment variables:

```
APP_NAME="Fantasy Showdown"
NODE_ENV=development
PORT=8080
NEXT_APP="https://[FRONT_END_HOSTNAME]" 

# Database
MONGODB_URL=<MONGO_DB_URI>
REDIS_URL="redis-14731.c241.us-east-1-4.ec2.redns.redis-cloud.com"
REDIS_PORT=14731
REDIS_PASSWORD=XrWhd2GUlwC1p6lVSiYed8CiGVRZFdQI

# https://developer.yahoo.com/fantasysports/guide/
YAHOO_CLIENT_ID=<YAHOO_CLIENT_ID>
YAHOO_CLIENT_SECRET=<YAHOO_CLIENT_SEC>
YAHOO_REDIRECT_URI=https://[HOSTNAME]/auth/yahoo/callback

# SMTP
MAIL_URL=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_PORT=465
MAIL_SECURE="yes"
MAIL_FROM_NAME="Fantasy Showdown"
MAIL_FROM_EMAIL=""	

# Dynamic
PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnU1DMqW1RFjQdaKI8jqr
7aWYqB++j6/F1xeIu4LtV5KNMTEpSfIqccZH1KrZEY35nN2KuW+nPHsT3+h0novj
t34olqQUE8jAHadoxKLudAEeSXuoZOTgGWpT8Za/zM32IJn1V1D87n19Aeq19mK7
zQ8HN+WnLD/bXK0bE9D8opKVxss/LOprpjf8MgUN+qFsi5zR5pcpS9WBsmXBGFGz
zhLghkxANSAlzdxH7DxiL/NyKwiUIpFzvlIBYtGCIMGWwOmzp1B5hCCKlCT42AAY
+sUBxiRumVywSICrWY6nKPKMeKjUG9GmpTEHYa4mFWDgGjGvSzXqiYtDJxUGh3Ns
vDNFgd6DIMc7fd+BEf5wioQ+K6UT3En/y36ZbeKxc6vTUg4h1AyKJ1bf2oNRCLJW
HtNCcoYyMAy8SPrtfghN34TMli697EIp2wGpFG2GbFgGWbd2XNAZ0rSrHSEFbilV
In2cuMAyhAWNj6DJNq+oPzIK2LtvljagUYhJnIyBbf4yQ8tvXvdh1rbhnawARX2P
NQO2hBnDhBvUjOEubrxLCWsBB+N7wXEtw8KdFne0okjQrCBSCJEbMB06wiS6PPM9
zvF67rsG9bCPuVmJ1feEWBUCAwEAAQ==
-----END PUBLIC KEY-----"
DYNAMIC_ENV_ID=<DYNAMIC_ENV_ID>
DYNAMIC_TOKEN=<DYNAMIC_TOKEN>

# For Token Minting  
PRIVATE_KEY=<PRIVATE_KEY>
INFURA_API_KEY=<INFURA_API_KEY>
CONTRACT_ADDRESS=<CONTRACT_ADDRESS>
FS_BOX_ADDRESS=<FS_BOX_ADDRESS>
FS_GearIO=<FS_GearIO>
RESERVOIR_API_KEY=<RESERVOIR_API_KEY>

RPC_URL=https://eth-sepolia.g.alchemy.com/v2/3-_rEWyUc-m9QgySIlzI22-HBVZJfzLn
```

### Run Locally:

```
npm run start:dev
```

### Build and Start for Production:
```
npm run build
npm run start
```


### Key Features

- MongoDB integration for data storage

- Redis for caching and queue management

- OAuth integration with Yahoo Fantasy API

### Deployment

Use PM2 or another process manager for running in production.

Ensure MongoDB Atlas and Redis credentials are correctly configured.