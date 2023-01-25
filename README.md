<br />
<p align="center">

  <h3 align="center">Hire App | Peworld</h3>
  <p align="center">
    <image align="center" width="200" src='https://res.cloudinary.com/dnu5su7ft/image/upload/v1674602322/Group_980_1_gtukdx.png' />
  </p>

  <p align="center">
    <br />
    <a href="https://github.com/helmipradita/be-hire"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://api-hire.helmipradita.dev">View Demo</a>
  </p>
</p>



## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Run Locally](https://github.com/helmipradita/be-telegram/edit/main/README.md#run-locally)
* [Demo](https://github.com/helmipradita/be-telegram/edit/main/README.md#demo)
  *  [x] [API Reference - Auth](#api-reference---auth)
  *  [x] [API Reference - Skill](#api-reference---skill)
  *  [x] [API Reference - Experience](#api-reference---experience)
  *  [x] [API Reference - Portofolio](#api-reference---portofolio)
  *  [x] [API Reference - Hire](#api-reference---hire)
  *  [x] [API Reference - Message](#api-reference---message)
* [Related Project](#related-project)
* [Contact](#contact)

## About The Project

The Hire App is a website that can be used to find workers for companies, this website makes it easy for companies to find workers they want to hire at their company. On the landing page there is information about the hireapp website. There are 2 roles in this system as employee and company, for the employee page for employees to register and look for work by inputting personal data and skills, then for the company the focus is on finding employees and hiring if they match the conditions you are looking for.

## Run Locally

Clone the project

```bash
  git clone https://github.com/helmipradita/be-hire
```

Go to the project directory

```bash
  cd be-hire
```

Install dependencies

```bash
  npm install
```

Setup .env copy from .env.example

```bash
  HOST=localhost
  PORT=8000

  JWT_KEY=

  PG_CONNECT=
  PG_USER=
  PG_HOST=
  PG_NAME=
  PG_PASS=
  PG_PORT=

  MAIL_USERNAME=
  MAIL_PASSWORD=
  OAUTH_CLIENTID=
  OAUTH_CLIENT_SECRET=
  OAUTH_REFRESH_TOKEN=

  PHOTO_CLOUD_NAME=
  PHOTO_KEY=
  PHOTO_SECRET=
```

Start the server

```bash
  npm run dev
```

## Demo

API deploy 

```bash
https://api-hire.helmipradita.dev
```

## API Reference - Auth

<details>
<summary>Show</summary>
<br>

#### Register employee

```
  POST /auth/register/employee
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `name` | `string` | **Required**. name          |
| `email`    | `string` | **Required**. with format email |
| `phone`    | `string` | **Required**. with format phone |
| `password` | `string` | **Required**. password          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "email": "helmi1@gmai.com",
    "otp": "821402"
  },
  "message": "register success please check your email"
}
```

#### Register company

```
  POST /auth/register/company
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `name` | `string` | **Required**. name          |
| `email`    | `string` | **Required**. with format email |
| `phone`    | `string` | **Required**. with format phone |
| `password` | `string` | **Required**. password          |
| `company_name` | `string` | **Required**. company_name          |
| `postition` | `string` | **Required**. postition          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "email": "helmi.pradita.a@gmail.com",
    "otp": "973809"
  },
  "message": "register success please check your email"
}
```

#### Login

```
  POST /auth/login
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `password` | `string` | **Required**. password          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "0a67ed4a-a7bb-43f2-834f-2adbe4f35452",
    "name": "Helmi Pradita",
    "email": "helmi.pradita.a@gmail.com",
    "phone": "085708572498",
    "role": "company",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBhNjdlZDRhLWE3YmItNDNmMi04MzRmLTJhZGJlNGYzNTQ1MiIsIm5hbWUiOiJIZWxtaSBQcmFkaXRhIiwiZW1haWwiOiJoZWxtaS5wcmFkaXRhLmFAZ21haWwuY29tIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NzQ2MDUxMzgsImV4cCI6MTY3NDYwODczOH0.90_pzGLbDdCdU0VbElkBNJdUMNitOF0tIhS_e7UPw4s",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBhNjdlZDRhLWE3YmItNDNmMi04MzRmLTJhZGJlNGYzNTQ1MiIsIm5hbWUiOiJIZWxtaSBQcmFkaXRhIiwiZW1haWwiOiJoZWxtaS5wcmFkaXRhLmFAZ21haWwuY29tIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NzQ2MDUxMzgsImV4cCI6MTY3NDY5MTUzOH0.KbzESbIE11CP4LUiQQyViwq9XCAXkanxGgQLVc3qdVk"
  },
  "message": "login success"
}
```

#### Verification

```
  POST /auth/verification
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `otp` | `string` | **Required**. otp          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": "helmi.pradita.a@gmail.com",
  "message": "verification account success"
}
```

#### Edit profile company

```
  PUT /auth/update-company
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `company_name` | `string` | **Required**. company_name |
| `position`     | `string` | **Required**. position     |
| `province`    | `file`   | **Required**. province    |
| `city`    | `file`   | **Required**. city    |
| `description`    | `file`   | **Required**. description    |
| `company_email`    | `file`   | **Required**. company_email    |
| `company_phone`    | `file`   | **Required**. company_phone    |
| `linkedin`    | `file`   | **Required**. linkedin    |
| `photo`    | `file`   | **Required**. photo    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "0a67ed4a-a7bb-43f2-834f-2adbe4f35452",
    "company_name": "PT. Indonesia update",
    "position": "HRD update",
    "province": "Jawa Timur update",
    "city": "Mojokerto update",
    "description": "Sebuah startup update",
    "company_email": "admin@ptindonesia.com update",
    "company_phone": "021333444 update",
    "linkedin": "linkedin.com update",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674605301/arutala/bxo6sttam9es4p18k4oq.png"
  },
  "message": "update data success"
}
```

#### Edit profile employee

```
  PUT /auth/update-employee
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `job`     | `string` | **Required**. job     |
| `province`    | `file`   | **Required**. province    |
| `city`    | `file`   | **Required**. city    |
| `workplace`    | `file`   | **Required**. workplace    |
| `description`    | `file`   | **Required**. description    |
| `photo`    | `file`   | **Required**. photo    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "2d530145-965e-483d-8812-871c15258b3f",
    "job": "Web developer",
    "province": "Jawa Timur",
    "city": "Mojokerto",
    "workplace": "Freelance",
    "description": "Saya seorang website developer dengan skill node js",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674605409/arutala/fo6rahzj7prwalmrppdw.png"
  },
  "message": "update data success"
}
```

#### Get profile

```
  GET /auth/profile
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "0a67ed4a-a7bb-43f2-834f-2adbe4f35452",
      "name": "Helmi Pradita",
      "email": "helmi.pradita.a@gmail.com",
      "phone": "085708572498",
      "company_name": "PT. Indonesia update",
      "position": "HRD update",
      "province": "Jawa Timur update",
      "city": "Mojokerto update",
      "description": "Sebuah startup update",
      "company_email": "admin@ptindonesia.com update",
      "company_phone": "021333444 update",
      "linkedin": "linkedin.com update",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674605301/arutala/bxo6sttam9es4p18k4oq.png"
    }
  ],
  "message": "get company profile success"
}
```

#### Get all employee
```
  GET /employee
```

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "result": [
      {
        "id": "e7ed9acd-50a7-4378-9dee-ba4c4c14e673",
        "name": "Sri",
        "email": "sri@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "8860b6ab-dce8-4c6b-82df-cf1d53799044",
        "name": "Rizky",
        "email": "rizky@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "505fb2fc-6ca5-47ef-bb2d-d4108ac83f09",
        "name": "pram",
        "email": "pram@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "bf4ad019-3199-4f05-a536-1bf35898fc14",
        "name": "Pradita",
        "email": "pradita@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "de870fe3-2bfb-408b-bd45-5de0ab11798c",
        "name": "mawmo",
        "email": "mawmo@gmail.com",
        "job": "Web Developer",
        "province": "Jawa Tengah",
        "city": "Klaten",
        "workplace": "Cafe",
        "description": "Hi there Im using hireapp",
        "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673234118/arutala/xoao93jwtaczs5dptycj.jpg"
      },
      {
        "id": "136702b1-6368-4e26-a0ad-e61e8cb62f55",
        "name": "Lidiya",
        "email": "lidiya@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "36f68084-d50b-4b76-a138-51624d3bbfc6",
        "name": "Lidiya",
        "email": "lidiya1@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "8bbec821-6e94-4efd-8129-b6f8e33deed2",
        "name": "irfan",
        "email": "irfan@gmai.com",
        "job": null,
        "province": null,
        "city": null,
        "workplace": null,
        "description": null,
        "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
      },
      {
        "id": "440b0eb7-c752-4cf7-8539-9d4b42c642bc",
        "name": "Helmi Pradita",
        "email": "hel.mipraditaa@gmail.com",
        "job": "Web Developer",
        "province": "Sumatera Barat",
        "city": "Padang",
        "workplace": "Freelance",
        "description": "lalala yeyye lalala yeyye lalala yeyye lalala yeyye lalala yeyye lalala yeyye lalala yeyye ",
        "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1672978177/arutala/xszx7tjldv0lsnmtg1ob.png"
      },
      {
        "id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
        "name": "Helmi Pradita",
        "email": "helmipraditaa@gmail.com",
        "job": "Web developer",
        "province": "Jawa Timur",
        "city": "Mojokerto",
        "workplace": "Freelance",
        "description": "Saya seorang website developer dengan skill node js",
        "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1672977081/arutala/y1ki9tlj6wxl0eov3kk3.png"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "limit": 10,
      "totalData": 18,
      "totalPage": 2
    }
  },
  "message": "get employee success"
}
```

#### Get employee by id
```
  GET /employee/:id
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from employee_id     |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
    "name": "Helmi Pradita",
    "email": "helmipraditaa@gmail.com",
    "job": "Web developer",
    "province": "Jawa Timur",
    "city": "Mojokerto",
    "workplace": "Freelance",
    "description": "Saya seorang website developer dengan skill node js",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1672977081/arutala/y1ki9tlj6wxl0eov3kk3.png",
    "skill": [
      {
        "id": "de23a97b-ecfe-4406-bf15-6b007e755d25",
        "name": "Bootstrap lagi"
      },
      {
        "id": "9eb9b658-1818-4d8d-a082-4bb0346fc522",
        "name": "Bootstrap"
      },
      {
        "id": "d35e4cf3-8019-4511-8c76-2ca9fa6f3a97",
        "name": "Express JS"
      },
      {
        "id": "c5387fe1-d6d6-4f32-9c06-4479890a9634",
        "name": "CSS update bangettt"
      },
      {
        "id": "7b9997eb-8b30-464e-8358-c4dadd6b5fd1",
        "name": "Express JS"
      }
    ],
    "portofolio": [
      {
        "id": "e47b7b99-dd5d-4a1d-b87c-97b262084059",
        "repo_link": "github.com/helmipradita/arutalaUPDATE",
        "repo_type": "private",
        "photo": "undefined",
        "description": "REST API backend update"
      },
      {
        "id": "e70bc06f-fb6a-45b3-bc23-9f70f88c7f70",
        "repo_link": "linkrepo.com",
        "repo_type": "public",
        "photo": "https://res.cloudinary.com/dxrsjyu6o/image/upload/v1672569626/ccg86myaiuqodx2drgof.png",
        "description": "Website untuk pemetaan penjual sayur"
      }
    ],
    "experience": [
      {
        "id": "6a6ea41e-e263-4198-ad85-e9f6eae7d3fe",
        "position": "Backend website",
        "company_name": "PT. Mojoketo",
        "work_start": "2022-04-30T17:00:00.000Z",
        "work_ended": "2022-06-30T17:00:00.000Z",
        "description": "Bekerja di PT. Mojokerto sebagai backend website"
      },
      {
        "id": "6cea5150-c760-4ba8-8c31-ed7300bddaf6",
        "position": "Frontend website",
        "company_name": "PT. Mojoketo",
        "work_start": "2022-04-30T17:00:00.000Z",
        "work_ended": "2022-06-30T17:00:00.000Z",
        "description": "Bekerja di PT. Mojokerto sebagai frontend website"
      },
      {
        "id": "c01b8af3-1415-4778-9430-1dea13a21a8d",
        "position": "Frontend website",
        "company_name": "PT. Mojokerto Jawa Timur",
        "work_start": "2022-02-09T17:00:00.000Z",
        "work_ended": "2022-03-09T17:00:00.000Z",
        "description": "Bekerja di PT. Mojokerto sebagai frontend website"
      },
      {
        "id": "b85a056b-75a2-45d7-99ae-690b8f6ef955",
        "position": "Backend website",
        "company_name": "PT. Mojokerto Jawa Timur",
        "work_start": "2022-02-09T17:00:00.000Z",
        "work_ended": "2022-03-09T17:00:00.000Z",
        "description": "Bekerja di PT. Mojokerto sebagai backend website"
      },
      {
        "id": "eed1ca1c-661c-4f7a-b200-ddd5da44be47",
        "position": "Fullstack website",
        "company_name": "PT. Helmi Creative",
        "work_start": "2022-01-09T17:00:00.000Z",
        "work_ended": "2022-02-09T17:00:00.000Z",
        "description": "Bekerja di PT. Helmi Creative sebagai fullstack website"
      }
    ]
  },
  "message": "get employee by id success"
}
```


</details>

## API Reference - Skill

<details>
<summary>Show</summary>
<br>

#### Insert Skill

```
  POST /skill/add
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `name`     | `string` | **Required**. name of skill    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "63aac150-305e-41e4-b88d-81bc06f0b0c6",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "name": "Express JS"
  },
  "message": "insert skill success"
}
```

#### Get all skill

```
  GET /skill
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "63aac150-305e-41e4-b88d-81bc06f0b0c6",
      "user_id": "2d530145-965e-483d-8812-871c15258b3f",
      "name": "Express JS"
    },
    {
      "id": "fd2297a7-ff05-4984-a15c-5aba69dce636",
      "user_id": "2d530145-965e-483d-8812-871c15258b3f",
      "name": "HTML"
    }
  ],
  "message": "get skill success"
}
```

#### Get skill by user id

```
  GET /skill/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from user_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "de23a97b-ecfe-4406-bf15-6b007e755d25",
      "user_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
      "name": "Bootstrap lagi"
    },
    {
      "id": "9eb9b658-1818-4d8d-a082-4bb0346fc522",
      "user_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
      "name": "Bootstrap"
    },
    {
      "id": "d35e4cf3-8019-4511-8c76-2ca9fa6f3a97",
      "user_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
      "name": "Express JS"
    },
    {
      "id": "c5387fe1-d6d6-4f32-9c06-4479890a9634",
      "user_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
      "name": "CSS update bangettt"
    },
    {
      "id": "7b9997eb-8b30-464e-8358-c4dadd6b5fd1",
      "user_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
      "name": "Express JS"
    }
  ],
  "message": "get skill success"
}
```

#### Update skill

```
  PUT /skill/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from skill_id    |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `name`     | `string` | **Required**. name of skill    |


Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "63aac150-305e-41e4-b88d-81bc06f0b0c6",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "name": "Express JS update"
  },
  "message": "update skill success"
}
```

#### Delete skill

```
  PUT /skill/:id
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `id` | `string` | **Required**. id from skill_id        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "fd2297a7-ff05-4984-a15c-5aba69dce636",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "name": "HTML"
  },
  "message": "delete skill success"
}
```

</details>

## API Reference - Experience

<details>
<summary>Show</summary>
<br>

#### Insert Experience

```
  POST /experience/add
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `name`     | `string` | **Required**. name of skill    |
| `company_name`     | `string` | **Required**. company_name    |
| `work_start`     | `string` | **Required**. work_start    |
| `work_ended`     | `string` | **Required**. work_ended    |
| `description`     | `string` | **Required**. description    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "69514344-9efe-47ee-806e-c862d834e50a",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "position": "Frontend website",
    "company_name": "PT. Helmi ",
    "work_start": "2022-02-10",
    "work_ended": "2022-04-10",
    "description": "Bekerja di PT. Helmi Creative sebagai frontend website"
  },
  "message": "insert experience success"
}
```

#### Get all experience

```
  GET /experience/
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "result": [
      {
        "id": "69514344-9efe-47ee-806e-c862d834e50a",
        "user_id": "2d530145-965e-483d-8812-871c15258b3f",
        "position": "Frontend website",
        "company_name": "PT. Helmi ",
        "work_start": "10 February  2022",
        "work_ended": "10 April     2022",
        "description": "Bekerja di PT. Helmi Creative sebagai frontend website",
        "created_at": "2023-01-25T01:24:52.198Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "limit": 4,
      "totalData": 1,
      "totalPage": 1
    }
  },
  "message": "get experience success"
}
```

#### Get experience by user id

```
  GET /experience/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from experience_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "69514344-9efe-47ee-806e-c862d834e50a",
      "user_id": "2d530145-965e-483d-8812-871c15258b3f",
      "position": "Frontend website",
      "company_name": "PT. Helmi ",
      "work_start": "10 February  2022",
      "work_ended": "10 April     2022",
      "description": "Bekerja di PT. Helmi Creative sebagai frontend website",
      "created_at": "2023-01-25T01:24:52.198Z"
    }
  ],
  "message": "get experience success"
}
```

#### Update experience

```
  PUT /experience/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from experience_id    |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `name`     | `string` | **Required**. name of skill    |
| `company_name`     | `string` | **Required**. company_name    |
| `work_start`     | `string` | **Required**. work_start    |
| `work_ended`     | `string` | **Required**. work_ended    |
| `description`     | `string` | **Required**. description    |


Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "69514344-9efe-47ee-806e-c862d834e50a",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "position": "Backend website update",
    "company_name": "PT. Helmi update",
    "work_start": "2022-02-10",
    "work_ended": "2022-04-10",
    "description": "Bekerja di PT. Helmi Creative sebagai backend website update"
  },
  "message": "update experience success"
}
```

#### Delete skill

```
  DELETE /experience/:id
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `id` | `string` | **Required**. id from experience_id        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "ebf630ab-2261-4903-89fa-50e917abb10f",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "position": "Frontend website",
    "company_name": "PT. Helmi ",
    "work_start": "10 February  2022",
    "work_ended": "10 April     2022",
    "description": "Bekerja di PT. Helmi Creative sebagai frontend website",
    "created_at": "2023-01-25T01:27:10.798Z"
  },
  "message": "delete experience success"
}
```

</details>

## API Reference - Portofolio

<details>
<summary>Show</summary>
<br>

#### Insert portofolio

```
  POST /portofolio/add
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `repo_link`     | `string` | **Required**. repo_link    |
| `repo_type`     | `string` | **Required**. repo_type    |
| `description`     | `string` | **Required**. description    |
| `photo`     | `string` | **Required**. photo    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "e45d461b-c071-4a17-98f0-199c703c76aa",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "repo_link": "github.com/helmipradita/arutala",
    "repo_type": "android",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674606547/arutala/wfwlpa5jks1rzkbuxa1b.png",
    "description": "REST API backend"
  },
  "message": "insert portofolio success"
}
```

#### Get all portofolio

```
  GET /portofolio/
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "result": [
      {
        "id": "e45d461b-c071-4a17-98f0-199c703c76aa",
        "user_id": "2d530145-965e-483d-8812-871c15258b3f",
        "repo_link": "github.com/helmipradita/arutala",
        "repo_type": "android",
        "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674606547/arutala/wfwlpa5jks1rzkbuxa1b.png",
        "description": "REST API backend",
        "created_at": "2023-01-25T01:29:08.150Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "limit": 4,
      "totalData": 1,
      "totalPage": 1
    }
  },
  "message": "get portofolio success"
}
```

#### Get portofolio by user id

```
  GET /portofolio/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from portofolio_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "e45d461b-c071-4a17-98f0-199c703c76aa",
      "user_id": "2d530145-965e-483d-8812-871c15258b3f",
      "repo_link": "github.com/helmipradita/arutala",
      "repo_type": "android",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674606547/arutala/wfwlpa5jks1rzkbuxa1b.png",
      "description": "REST API backend",
      "created_at": "2023-01-25T01:29:08.150Z"
    }
  ],
  "message": "get portofolio success"
}
```

#### Update portofolio

```
  PUT /portofolio/:id
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `id`     | `string` | **Required**. id from portofolio_id    |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `repo_link`     | `string` | **Required**. repo_link    |
| `repo_type`     | `string` | **Required**. repo_type    |
| `description`     | `string` | **Required**. description    |
| `photo`     | `string` | **Required**. photo    |


Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "e45d461b-c071-4a17-98f0-199c703c76aa",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "repo_link": "github.com/helmipradita/arutalaUPDATE",
    "repo_type": "private",
    "description": "REST API backend update",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674606547/arutala/wfwlpa5jks1rzkbuxa1b.png"
  },
  "message": "update portofolio success"
}
```

#### Delete portofolio

```
  DELETE /portofolio/:id
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body params

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `id` | `string` | **Required**. id from portofolio_id        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "a7c0a92f-62b2-4956-8e36-a8666cbb8d5d",
    "user_id": "2d530145-965e-483d-8812-871c15258b3f",
    "repo_link": "github.com/helmipradita/arutala",
    "repo_type": "android",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1674606665/arutala/wb6athlwurb1ckrifokh.png",
    "description": "REST API backend",
    "created_at": "2023-01-25T01:31:06.398Z"
  },
  "message": "delete portofolio success"
}
```

</details>

## API Reference - Hire

<details>
<summary>Show</summary>
<br>

#### Insert hire by employee id

```
  POST /hire/add/:id
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field params

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `id`     | `string` | **Required**. id from employee_id    |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `position`     | `string` | **Required**. position    |
| `description`     | `string` | **Required**. description    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "66e84961-c8ce-4827-9988-826bfe87d768",
    "position": "Fullstack webdeveloper",
    "company_id": "0a67ed4a-a7bb-43f2-834f-2adbe4f35452",
    "employee_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
    "description": "Haloo saya ingin menghire anda"
  },
  "message": "insert hire success"
}
```

#### Get all hire

```
  GET /hire/all
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "66e84961-c8ce-4827-9988-826bfe87d768",
      "employee_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
      "name": "Helmi Pradita",
      "position": "Fullstack webdeveloper",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1672977081/arutala/y1ki9tlj6wxl0eov3kk3.png"
    }
  ],
  "message": "get hire success"
}
```

</details>

## API Reference - Message

<details>
<summary>Show</summary>
<br>

#### Insert message by hire id

```
  POST /message/:id
```
Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field params

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `id`     | `string` | **Required**. id from hire_id    |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `message`     | `string` | **Required**. message    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "hire_id": "66e84961-c8ce-4827-9988-826bfe87d768",
    "message": "Bisa pak",
    "sender_id": "f6e76396-068d-481c-ba9d-d1e0fc2b8ec0",
    "reciver_id": "0a67ed4a-a7bb-43f2-834f-2adbe4f35452"
  },
  "message": "insert message success"
}
```

#### Get message by id

```
  GET /message/:id
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field params

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `id`     | `string` | **Required**. id from message_id    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "company_name": "PT. Indonesia update 6 januari",
    "position": "Fullstack webdeveloper",
    "photo": "undefined",
    "chat": [
      {
        "id": 8,
        "hire_id": "d93189ea-15da-453f-b10f-ff1d762bd806",
        "sender_id": "8e5be7b6-a77c-489d-b571-b544a128c995",
        "sender_name": "PT. Indonesia update 6 januari",
        "reciver_id": "440b0eb7-c752-4cf7-8539-9d4b42c642bc",
        "message": "Apakah anda bisa Node JS?",
        "created_at": "2023-01-04T11:28:25.880Z"
      },
      {
        "id": 4,
        "hire_id": "d93189ea-15da-453f-b10f-ff1d762bd806",
        "sender_id": "8e5be7b6-a77c-489d-b571-b544a128c995",
        "sender_name": "PT. Indonesia update 6 januari",
        "reciver_id": "440b0eb7-c752-4cf7-8539-9d4b42c642bc",
        "message": "Haloo saya ingin menghire anda",
        "created_at": "2023-01-04T10:52:44.801Z"
      }
    ]
  },
  "message": "get message success"
}
```

</details>


## Related Project
* [`Backend Project Telegram `](https://github.com/helmipradita/be-telegram)
* [`REST API Telegram`](https://api-telegram.helmipradita.dev)

## Contact

Contributors names and contact info

* Frontend Developers
  * Pramudia Syahrul Fanani [@Fanani23](https://github.com/Fanani23)
  * Lidiya Wati [@Lidiya135](https://github.com/Lidiya135)
  * Irfan 
* Backend Developers
  * Alvin Jamal Azkya [@alvinjamal](https://github.com/alvinjamal)
  * Sri Yuniar [@sriyuniar541](https://github.com/sriyuniar541)
  * Helmi Pradita [@helmipradita](https://github.com/helmipradita)
