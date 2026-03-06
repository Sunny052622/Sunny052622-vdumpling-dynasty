# VDumpling Dynasty Website Deployment Guide

## Deployment to Hostinger

### Prerequisites
- A Hostinger account
- Access to your Hostinger control panel

### Uploading the Website

1. **Log in to your Hostinger Control Panel**
   - Go to the Hostinger website and log in to your account.

2. **Navigate to File Manager**
   - From your dashboard, locate and click on "File Manager" option.
   - This will take you to the file management interface.

3. **Upload the ZIP Archive**
   - Upload the `vdd-website-deploy.zip` file to your web hosting space.
   - Wait for the upload to complete.

4. **Extract the ZIP File**
   - After uploading, right-click on the ZIP file in the file manager and select "Extract".
   - Extract it to the root directory or your preferred subdirectory.
   - If prompted, make sure to select the option to overwrite existing files.

5. **Set Directory Permissions**
   - Ensure that all directories have the permission set to 755.
   - Ensure that all files have the permission set to 644.
   - You can change permissions by right-clicking on a file/folder and selecting "Permissions".

### Setting Up Domain

1. **Connect Your Domain**
   - If you haven't already, connect your domain to your Hostinger hosting package.
   - Navigate to the "Domains" section in your Hostinger dashboard.
   - Follow the instructions to connect your domain.

2. **Set Up SSL Certificate**
   - It's recommended to enable HTTPS for your website.
   - Navigate to the SSL section and activate a free Let's Encrypt certificate for your domain.

### Testing the Website

1. **Visit Your Website**
   - After completing the steps above, visit your website by typing your domain in a browser.
   - The VDumpling Dynasty website should load properly.

2. **Test Functionality**
   - Test the navigation, menu display, and cart functionality.
   - Verify that images are loading correctly.
   - Test the responsiveness on different devices.

### Troubleshooting

- **404 Errors**: Make sure your document root is set correctly in the Hostinger control panel.
- **Missing Images**: Check if the images folder was extracted properly.
- **Routing Issues**: Since this is a single-page application, you might need to set up URL rewriting.

Create a `.htaccess` file in your root directory with the following content:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

This will redirect all requests to your index.html file, allowing the React router to handle the routes.

## Note About WhatsApp Integration

The "Place Order via WhatsApp" functionality should work as designed. However, if you need to change the WhatsApp number, you'll need to modify the source code and rebuild the application. 