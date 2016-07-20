# express-electron-pdf

An Express server wrapped around @fraserxu 's excellecnt [Electron PDF](https://github.com/fraserxu/electron-pdf).

Currently takes a minute or two to generate a PDF – probably due to the fact that this is spinning up a new instance of Electron (Chromium) with every request.

**_This project is a work in progress and isn't feature-complete (or bug-free!) yet. Pull requests welcome!_**

## Getting started

Use Docker.

`docker pull properdesign/express-electron-pdf`

`docker run -d -e "PORT=8080" -e "TOKEN=yoursecrettoken" --name=express-electron-pdf -p 8080:8080 properdesign/express-electron-pdf`

## Generating a PDF

Assuming that you're running this on localhost...

### Basic usage
Downloads a PDF called `output.pdf`.

`http://localhost:8080/?token=yoursecrettoken&url=http://yoursite.com`

### Specify a filename
You can specify your own filename (without the PDF extension) using `filename=yourcustomfilename`.

`http://localhost:8080/?token=yoursecrettoken&url=http://yoursite.com&filename=yourcustomfilename`

## To-do

* Custom stylesheets
* Handling for multiple displays using `xvfb-run -a [mycommand]`