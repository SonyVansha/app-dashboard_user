![Screenshot_3](https://github.com/user-attachments/assets/05cbb815-8bc8-4189-9515-0e31c57adf4f)


![alt text](image.png)

# Web Login and Signup
This Web from  Device, you must be set from the database SQL for mariadb.

# Setup Database MariaDB Local
To set the user and password on the database, use the command in the instructions below:
setting the user
```
CREATE DATABASE data_ukt;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON nama_database.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

# Application
## Install nodejs
`curl -fsSL https://rpm.nodesource.com/setup_21.x | sudo bash -`<br/>
`sudo yum install -y nodejs git`

## Install Dependencies
`npm install`

# Envinronment Variable
Setting the environment variable on your path application, use the name .env, and set the variable name on the instruction below:<br/>
`DB_HOST=YOUR_ENDPOINT`<br>
`DB_USER=YOUR_USER`<br>
`DB_PASS=YOUR_PASSWORD_DATABASE`<br>
`DB_NAME=YOUR_NAME_DATABASE`<br>

# Command run application
`npm run start`
