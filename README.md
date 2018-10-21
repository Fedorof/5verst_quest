It's the source code of the interactive fiction game "Лиха Година" written in
Ukrainian.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of development guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Publish to GitHub pages
If you have `invoke` installed (see the next section) simply run
`inv gh-release`.

Alternatively run following commands:

```
rm rf ./build
yarn build
yarn deploy
```

# Publish to Facebook Instant Games
Sorry, I'm more like a Python developer so these steps 
are automated with python.

1. Make sure you have Python version 3.6 or higher.
2. Install `invoke` and `requests`: `python3 -m pip install --user invoke requests`.
3. Set your environment variables like so:
   ```
   export HARDWAY_FBIG_TOKEN=EAAY...XkwZDZ
   export HARDWAY_FBIG_APP_ID=2154175081495590
   ```
4. Run `inv release`. Re-run it every time you want to build a deploy a new
   version of an app.

The `invoke` tasks are defined in `tasks.py` file.

If you don't want to play around with Python, there are manual steps:

1. Build the app:
   ```
   rm rf ./build
   yarn build
   ```
2. Replace `build/index.html` with `templates/index.html`
   ```
   cp ./templates/index.html build/index.html
   ```
3. Open `build/index.html` and replace `${css_file}` with the name of the file
   from `build/static/css`, and replace `${js_file}` with the name of the file
   from `build/static/js`.  The names are like `main.422942c1.css` and
   `main.e2d77b5b.js` respectively.
4. Make a zip archive of your `build` directory and upload at the page 
   `https://developers.facebook.com/apps/<APP_ID>/instant-games/hosting/`
