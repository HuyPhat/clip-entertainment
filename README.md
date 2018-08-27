On DEV: Install it and run:

```bash
npm install
npm run dev
```


ON PRODUCTION:


Deployment on Nginx's reverse proxy
Add reverse proxy to your app inside default location block in Nginx's site configuration

location / {
  # default port, could be changed if you use with custom server
  proxy_pass http://localhost:3000;

  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  
  # if you have try_files like this, remove it from our block
  # otherwise next app will not work properly
  # try_files $uri $uri/ =404;
}
Restart nginx server
$ sudo service nginx restart

Run production app
Build your app with: 
$ npm run build

Start your app with pm2 or other process manager from production build directory:
# for development
pm2 start npm --name "next" -- run dev

# for production
npm run build
pm2 start npm --name "next" -- start

Please note that if you are using a custom server, you will still need to start the custom server from its resident folder rather than running npm run start from the production build directory

#####
## Fix node-sass error access when use sudo
sudo npm install -save node-sass --unsafe-perm