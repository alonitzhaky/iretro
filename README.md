<h1 align="center">
   <b>
        <a href="iretro.netlify.app"><img src="https://iretro.netlify.app/logo.png" /></a><br>
    </b>
</h1>

<p align="center">Online E-Commerce Website for Technology Preservation</p>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/aab0b306-f55a-4205-a7dc-422f46670a6f/deploy-status)](https://app.netlify.com/sites/iretro/deploys)

</div>

We all thought of having an iPhone taken apart and framed for its beauty.

Our initial concept was preserving the internal beauty of our everyday electronic devices inside of a beautiful frame. 

Now, it's possible.

# Introduction
The iRetro Store is a concept website that sells framed, taken apart iPhones. The website is built using a combination of Django (a Python web framework) and React-Typescript (a JavaScript library for building user interfaces), and uses several other technologies, including Django Rest Framework API, React-Redux, PostgreSQL, and JWT. The website features a login/register system, an active cart, PayPal checkout API, and an admin panel using Django Administration. The source code for the website is available on GitHub and can be installed on a local machine by following the step-by-step tutorial in the readme file. 

# Technologies Used
- Django
- Django Rest Framework API
- React-Typescript
- React-Redux
- PostgreSQL
- JWT

# Pre-requisites
Please ensure you have the following installed on your local machine: 
- [Python 3.x](https://www.python.org/downloads/)
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [pip](https://www.geeksforgeeks.org/how-to-install-pip-on-windows/)
- [Django](https://docs.djangoproject.com/en/4.1/topics/install/)
- [Django Rest Framework](https://www.django-rest-framework.org/#installation)
- [React](https://reactjs.org/docs/create-a-new-react-app.html)
- [Redux](https://redux.js.org/introduction/installation#create-a-react-redux-app)

In the event where the pre-requisites aren't being met, please follow the links listed and proceed with the installations. 

**The proccess is identical between Windows and Mac.**

# Step-by-step Tutorial

1. Once all pre-requisites are compeleted, please run the following command in your VSCode / PyCharm Terminal in order to install 'virtualenv': 
```bash
python -m pip install virtualenv
```

2. After installing the 'virtualenv' package with pip, clone this Git repository to your desired folder: 
```bash
git clone https://github.com/alonitzhaky/iretro-store.git
```

3. Use the Powershell / Command Prompt terminal to enter the newly created folder: 
```bash
cd iretro-store
```

After entering the folder, you will need to install all the dependencies for this code (both frontend and backend). 

4. Enter the following to command to enter the backend portion of this code:
```bash
cd backend/
```

5. Run the following command to create a virtual environment:
### Mac: 
```bash
virtualenv env
```

### Windows
```bash
py -m virtualenv venv
```

6. Activate the virtual environment:
### Mac
```bash
source env/bin/activate
```
### Windows
```bash
.\env\Scripts\activate
```

7. Install the Python requirements: 
```bash
python pip install -r requirements.txt
```

8. Return to the previous folder and proceed to enter the frontend folder, containing the React app: 
```bash
cd ..
```

```bash
cd frontend/app
```

9. Follow the installation of the React dependencies: 
```bash
npm install
```
10. Open 2 seperate Terminal windows inside your Visual Studio Code to activate the Django backend server and the React frontend app. 

11. In the first Terminal window, run the following command to start the Django backend server: 

### Mac
```bash
(env) python manage.py runserver
```

### Windows
```bash
(env) py manage.py runserver
```

12. In the second Terminal window, run the following command to start the React frontend app: 
```bash
npm start
```

13. You should now be able to access the iRetro store at http://localhost:3000.

# Existing Features
- Login + Register
- Active Cart
- PayPal Checkout API
- Admin Panel using Django Administration

# Disclaimer
This is a concept website built as a final project for John Bryce Training. All rights are reserved to © Grid Studio, including photos and products. 

## Code Author

- [Alon Itzhaky](https:/www.linkedin.com/alonitzhaky)

## Code Creator

![Credits](https://img.shields.io/badge/Creator-Alon%20Itzhaky-informational)


