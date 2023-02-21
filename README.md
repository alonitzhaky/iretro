<h1 align="center">
   <b>
        <a href="iretro.netlify.app"><img src="https://iretro.netlify.app/logo.png" /></a><br>
    </b>
</h1>

<p align="center">Online E-Commerce Website for Technology Preservation</p>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/aab0b306-f55a-4205-a7dc-422f46670a6f/deploy-status)](https://iretro.netlify.app/)
![Last Commit](https://img.shields.io/github/last-commit/alonitzhaky/iretro?style=flat-square)
![Size](https://img.shields.io/github/languages/code-size/alonitzhaky/iretro?style=flat-square)
![Python](https://img.shields.io/pypi/pyversions/Django?style=flat-square)
![npm](https://img.shields.io/npm/v/react?style=flat-square)
![website](https://img.shields.io/website?down_color=red&down_message=offline&style=flat-square&up_color=success&up_message=live&url=https%3A%2F%2Firetro.netlify.app%2F)
![pull-requests](https://img.shields.io/github/issues-pr/alonitzhaky/iretro?&logo=github&logoColor=white&style=flat-square)
![contributors](https://img.shields.io/github/contributors/alonitzhaky/iretro?color=orange&style=flat-square)

</div>

# Table Of Contents
- [👋 Introduction](#introduction)
- [📔 Features](#features)
- [🌐 Browser Support](#browser-support)
- [👨‍💻 Technologies Used](#technologies-used)
- [🔧 Installation](#installation)
    - [🖥 Deployments](#deployments)
    - [❗ Local Deployment Notice](#local-deployment-notice)
    - [🐋 Docker Installation](#docker-installation)
    - [✏️ Pre-requisites](#pre-requisites)
    - [🖱️ Frontend Installation](#frontend-installation)
    - [⌨️ Backend Installation](#backend-installation)
    - [🗝️ Authentication](#authentication)
- [⚠️ Disclaimers](#disclaimers)
- [✍🏽 Authors](#authors)


# Introduction

We all thought of having an iPhone taken apart and framed for its beauty.

Our initial concept was preserving the internal beauty of our everyday electronic devices inside of a beautiful frame. 

Now, it's possible.


The iRetro Store is a concept website that sells framed, taken apart iPhones. 

The website is built using a combination of Django (a Python web framework) and React-Typescript (a JavaScript library for building user interfaces), and uses several other technologies, including Django Rest Framework API, React-Redux, PostgreSQL, and JWT. 

The website features a login/register system, an active cart, PayPal checkout API, and an admin panel using Django Administration. The source code for the website is available on GitHub and can be installed on a local machine or Docker Desktop by following the step-by-step tutorial in the README.md file. 
# Features
- Login + Register (including registration email)
- Active Cart + PayPal Sandbox API
- Admin Panel using Django Administration
- User Profile + Updating Information
# Browser Support
![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ | 

# Technologies Used
- Django + Rest Framework API
- React-Typescript
- React-Redux
- JWT (JSON Web Token)
- PostgreSQL
- Docker

In the event where the pre-requisites aren't being met, please follow the links listed and proceed with the installations. 

**The proccess is identical between Windows and Mac.**

# Installation
## Deployments
The client-side portion of this project is hosted on [Netlify](https://iretro.netlify.app) and database management is handled by [Render](https://www.render.com).

For Docker deployment / testing on your device, the following instructions are provided. Please note some modifications in the code may be required.
## Local Deployment Notice
To ensure the code functions efficiently with Docker, kindly modify the following settings in the code.

Please clone the project, using the following command:
```bash
git clone https://github.com/alonitzhaky/iretro.git
```

Once you have cloned the project, navigate to the following directory: 

```bash
cd /iretro/frontend/app/src/
```

Open the file titled **'env.ts'** and change the following line: 

```typescript
export const SERVER = "https://iretro.onrender.com"
```

to: 

```typescript
export const SERVER = "http://0.0.0.0:8000"
```

#### Once the necessary code changes have been made, the next step is to install the prerequisites for this repository.

## Docker Installation

Before getting started, please ensure that Docker Desktop is installed on your system. If you haven't already, you can download and install Docker Desktop by following this [link](https://www.docker.com/products/docker-desktop/).


Once you have cloned the Git repository, enter the following command to change the directory to the project directory:

```bash
cd iretro/
```

Start the containers using the Docker Compose conmmand: 

```
docker compose up
```

#### Visit http://localhost:3000 in your browser after your containers have been initialized and activated.

## Pre-requisites
Please ensure you have the following installed on your local machine: 
- [Python 3.x](https://www.python.org/downloads/)
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [pip](https://www.geeksforgeeks.org/how-to-install-pip-on-windows/)
- [Django](https://docs.djangoproject.com/en/4.1/topics/install/)
- [Django Rest Framework](https://www.django-rest-framework.org/#installation)
- [React](https://reactjs.org/docs/create-a-new-react-app.html)
- [Redux](https://redux.js.org/introduction/installation#create-a-react-redux-app)


Once all pre-requisites are fufilled and you've cloned the repository, make sure you are in the right directory: 

```bash
$ /iretro
```

# Frontend Installation

Enter the frontend directory by running the following command: 

```bash
cd frontend/app
```

Follow the installation of the React dependencies: 
```bash
npm install
```

Once all package installations are complete, you have finished this step.

# Backend Installation

Enter the backend directory by running the following command: 

```bash
cd /backend
```

Please run the following command in your VSCode / PyCharm Terminal in order to install 'virtualenv': 
```bash
python -m pip install virtualenv
```

Run the following command to create a virtual environment:
### Mac: 
```bash
virtualenv env
```

### Windows
```bash
py -m virtualenv venv
```

Activate the virtual environment:
### Mac
```bash
source env/bin/activate
```
### Windows
```bash
.\env\Scripts\activate
```

Install the Python requirements: 
```bash
python pip install -r requirements.txt
```

### Open 2 seperate Terminal windows inside your Visual Studio Code to activate the Django backend server and the React frontend app. 

In the first Terminal window, run the following command to start the Django backend server: 

### Mac
```bash
(env) python manage.py runserver
```

### Windows
```bash
(env) py manage.py runserver
```

In the second Terminal window, run the following command to start the React frontend app: 
```bash
npm start
```

### You should now be able to access the iRetro store at http://localhost:3000.

# Authentication

To access the admin panel of Django, please use the following credentials:

```text
Username: Alon
Password: 123
```

Please note that the admin panel is only accessible to users with appropriate permissions. If you do not have the necessary permissions, you will not be able to access the admin panel.

# Disclaimers
This is a concept website built as a final project for John Bryce Training. All rights are reserved to © Grid Studio, including photos and products. 

# Authors

[![Alon Itzhaky](https://img.shields.io/badge/Creator-Alon%20Itzhaky-informational?style=flat-square)](https://www.linkedin.com/in/alonitzhaky)

