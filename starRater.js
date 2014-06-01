(function ($) {
    $.fn.starRater = function (options) {
        // Default settings
        var settings = $.extend({
            starCount: 5,
            firstEmpty: false
        }, options);

        // The location of the picker
        var container = $(this);

        // No lock by default
        var locked = 0;

        // Show all the stars
        for (var i = 0; i < settings.starCount; i++) {
            if (i === 0 && !settings.firstEmpty) {
                container.append('<i class="starRater-' + i + ' glyphicon glyphicon-star"></i>');
            } else {
                container.append('<i class="starRater-' + i + ' glyphicon glyphicon-star-empty"></i>');
            }
        }

        // Get all the stars
        var containerStars = container.children("i[class|='starRater']");

        var updateCount = function (children) {
            var sum = 0;
            children.each(function (i) {
                if ($(children.get(i)).hasClass('glyphicon-star')) {
                    sum++;
                }
            });

            children.parent().data('count', sum).trigger('countUpdated');
        };

        updateCount(containerStars);

        // On hover on the stars
        containerStars.mouseenter(function () {
            if (locked !== 0) {
                return;
            }

            var current = $(this);

            current.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            updateCount(containerStars);

            // Mark the previous stars
            var stop = false;
            containerStars.each(function (i) {
                if ($(containerStars.get(i))[0].className == current[0].className) {
                    updateCount(containerStars);
                    stop = true;
                }
                if (!stop) {
                    $(containerStars.get(i)).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                    updateCount(containerStars);
                } else {
                    $(containerStars.get(i + 1)).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                    updateCount(containerStars);
                }
            });
        });

        // When a user clicks a star
        containerStars.click(function () {
            if (locked != $(this)) {
                // Lock the star
                locked = 0;
                $(this).mouseenter();
            }

            locked = $(this);
        });

        return this;
    };
}(jQuery));
