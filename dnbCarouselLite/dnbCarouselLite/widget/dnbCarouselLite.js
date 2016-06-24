/*global logger*/
/*
    dnbCarouselLite
    ========================

    @file      : dnbCarouselLite.js
    @version   : 1.0
    @author    : Trevor Fitzgerald
    @company   : Dun & Bradstreet Ltd
    @date      : 24/06/2016
    @copyright : 2016
    @license   : Apache v2

    Documentation
    ========================
    Widget to create a light-weight image carousel.
*/

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom",
    "dojo/_base/fx",
    "dojo/fx",
    "dojo/fx/easing",
    "dojo/text",
    "dojo/text!dnbCarouselLite/widget/ui/dnbCarouselLite.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, baseFx, fx, easing, dojoText, widgetTemplate) {
    "use strict";

    // Declare widget's prototype.
    return declare("dnbCarouselLite.widget.dnbCarouselLite", [_WidgetBase, _TemplatedMixin], {

        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        wrapperNode: null,

        // Parameters configured in the Modeler.
        imagesObject: null,
        widthValue: 0,
        heightValue: 0,
        slideValue: 0,
        transitionValue: 0,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _timer: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            logger.debug(this.id + ".constructor");
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget.
        postCreate: function() {
            logger.debug(this.id + ".postCreate");

            // do sanity checks
            // make minimum transition 0.5 second
            if (this.transitionValue < 500) {
                this.transitionValue = 500;
            }
            // slideValue cannot be longer than transitionValue
            if (this.slideValue > this.transitionValue) {
                this.slideValue = this.transitionValue;
            }

            // build the carousel html and style
            this.buildCarousel();

            // goto carousel
            this._timer = setInterval(dojo.hitch(this, "showNextImage", this.imagesObject.length), this.transitionValue);

        },

        buildCarousel: function() {
            // for each item in image object
            for (var i = 0; i < this.imagesObject.length; i++) {
                // create wrapper div and item template
                var carItem = document.createElement("div");
                var carLabel = document.createElement("p");

                // add item class attributes
                if (i == 0) {
                    carItem.className = "dnbCarouselLite-item dnbCarouselLite-active";
                } else {
                    carItem.className = "dnbCarouselLite-item dnbCarouselLite-hideMe";
                }

                // add item data-carousel-item attribute
                carItem.setAttribute("data-carousel-item", i + 1);

                // add background image
                carItem.style.backgroundImage = "url(" + this.imagesObject[i].ImageURL + ")";

                // add height and width 
                carItem.style.height = this.heightValue + "px";
                carItem.style.width = this.widthValue + "px";

                // if label text exists then add to the carousel item
                if (this.imagesObject[i].ImageLabel != "") {
                    // add item label class
                    carLabel.setAttribute("class", "dnbCarouselLite-label");

                    // add item label inner html
                    carLabel.innerHTML = this.imagesObject[i].ImageLabel;

                    // append label to carousel item
                    carItem.appendChild(carLabel);
                }

                // append item to wrapperNode
                this.wrapperNode.appendChild(carItem);
            }

            // set carousel height and width
            this.wrapperNode.style.height = this.heightValue + "px";
            this.wrapperNode.style.width = this.widthValue + "px";

        },

        showNextImage: function(carouselItemsCount) {
            // find element active item
            var activeItem = this.wrapperNode.querySelector(".dnbCarouselLite-active");
            var activeItemNumber = activeItem.getAttribute("data-carousel-item");

            // calc next item number
            var nextItemNumber = 1;
            if (activeItemNumber != carouselItemsCount) {
                nextItemNumber = parseInt(activeItemNumber) + 1;
            }

            // get next item
            var nextItem = this.wrapperNode.querySelector("div[data-carousel-item='" + nextItemNumber + "']");

            // move next image to right of carousel and remove hideMe class
            nextItem.style.left = this.widthValue + "px";
            mendix.dom.removeClass(nextItem, "dnbCarouselLite-hideMe");

            // combine animations together
            var anim = fx.combine([
                baseFx.animateProperty({
                    node: activeItem,
                    properties: {
                        left: -this.widthValue,
                        unit: "px"
                    },
                    easing: easing.linear,
                    duration: this.slideValue
                }),
                baseFx.animateProperty({
                    node: nextItem,
                    properties: {
                        left: 0,
                        unit: "px"
                    },
                    easing: easing.linear,
                    duration: this.slideValue,
                    onEnd: function() {
                        afterAnim()
                    }
                })

            ]);

            // play animation
            anim.play();

            // after animation actions
            var afterAnim = function() {
                mendix.dom.removeClass(activeItem, "dnbCarouselLite-active");
                mendix.dom.addClass(activeItem, "dnbCarouselLite-hideMe");
                mendix.dom.addClass(nextItem, "dnbCarouselLite-active");

                activeItem.style.left = 0;
                nextItem.style.left = 0;
            };

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");

            clearInterval(this._timer);
        },

        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function(e) {
            logger.debug(this.id + "._stopBubblingEventOnMobile");
            if (typeof document.ontouchstart !== "undefined") {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }
            }
        }

    });
});

mxui.dom.addCss(require.toUrl("dnbCarouselLite/widget/ui/css/dnbCarouselLite.css"));
require(["dnbCarouselLite/widget/dnbCarouselLite"]);