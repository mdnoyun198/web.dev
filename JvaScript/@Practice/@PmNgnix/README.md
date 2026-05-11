# PM2 + Nginx Node.js App Deployment Guide

This guide explains how to run a Node.js app using **PM2** and set up **Nginx** as a reverse proxy.

---

## 1️⃣ PM2 Installation & Usage

### Install PM2
```
sudo npm -g install pm2
```

### Start your app
```
pm2 start app.js --name myapp
```

### Check app status
```
pm2 status
```



### Auto-start on server reboot
```
pm2 save
```
```
pm2 startup
```
---


### Restart / Stop app
```

pm2 stop myapp
```
```
pm2 restart myapp
```





## 2️⃣ Nginx Installation & Configuration

### Install Nginx
(Ubuntu/Debian)
```
sudo apt update
```
```
sudo apt install nginx
```

### Nginx Configuration

1. Create a new config file:
```
sudo nano /etc/nginx/sites-available/myapp
```

2. Add the following:
```
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

```
 ls -l /etc/nginx/sites-enabled/
```
```
sudo rm /etc/nginx/sites-enabled/default
```



3. Enable the site with a symlink:
```
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
```

4. Test config and restart Nginx:
```
sudo nginx -t
```
```
sudo systemctl restart nginx
```


```
sudo lsof -i :80
```

## stop the service

```
sudo systemctl stop nginx

sudo systemctl stop apache2

sudo systemctl start nginx

sudo systemctl enable nginx
```


---

## 3️⃣ Full Flow

1. Node.js app runs in the background using **PM2**.  
2. Incoming browser requests go through **Nginx** reverse proxy to the Node.js app.  
3. **PM2** auto-restarts the app if it crashes.  
4. Nginx handles domain and SSL easily.

---

## 4️⃣ Optional Extras

- **Setup HTTPS** using Certbot:
```
apt install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

- **Check logs**:
```
pm2 logs myapp
```

- **List PM2 processes**:
```
pm2 list
```

---

Your Node.js app is now safely running in production! 🎉
