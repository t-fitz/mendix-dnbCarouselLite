# mendix-dnbCarouselLite

A simple Mendix image carousel widget

No dependencies. Small size. Uses dojo/fx to scroll the images.

----

### What does it do?

This widget will display a simple image carousel. You specify the size of the carousel, pick the images to display and how fast they'll scroll. There's also the option to add a label to the bottom right of the image. Simples.  

----

### How to get it to work?

Just download the latest release. Add the .mpk file to your projects widget folder. Open your project (press F4 if your project is already open). The dnbCarouselLite widget will now be available in the Add-on dropdown when you're styling a page.

Use an existing image collection or create a new one.

![Adding an image collection](images/AddImageCollection.png?raw=true "Adding an image collection")

Add your images to the image collection.

Put the widget on the page.

Set your image carousel parameters for height, width and animation timings.

![Image Carousel Settings](images/WidgetSettings.PNG?raw=true "Image Carousel Settings")

Open the List of Images

![Images List](images/ListOfImages.PNG?raw=true "Images List")

Click New to add images

![Add Images](images/NewImage.PNG?raw=true "Add Images")

Once you've added all your images you're good to go. Run your project and you're done.

----

### Where will it work?

I've tested this in Mendix 5 so it should be good for use in Mendix 5 and 6.

As this uses the newer widget definition style it won't work, as is, in Mendix 4. Of course that doesn't stop you from scooping out the guts of the widget and putting it in a Mendix 4 widget template. Let me know if you do so I can link to it.

This will also not work properly in IE8 and older as I've used background-size in my CSS. Maybe in future releases I can get a workaround working but for now, if you want to target IE8, it's not going to look pretty.

----

### Bugs and other stuff

Do let me know if you run into any troubles using this widget. Pictures and error codes welcomed.

Any ideas to make this better? What?! Impossible!! Well maybe. Ok, let me know if you need more functionality or if you have ideas to make the code better, faster, stronger.
