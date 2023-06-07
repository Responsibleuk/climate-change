/**
 * Author: Shadow Themes
 * Author URL: https://shadow-themes.com
 */
"use strict";
let $main = jQuery('main');
let $body = jQuery('body');
let $menu = jQuery('.anita-menu');

function codeHL() {
    // HTML Code Highlighter
    jQuery('.chl-html:not(.is-init)').each(function() {
        let $html = jQuery(this);
        $html.addClass('is-init');

        $html.find('tag').each(function() {
            let $this = jQuery(this),
                text = $this.text();

            $this.prepend('<span>\u003C</span>');
            if (jQuery(this).hasClass('is-closed')) {
                $this.append('<span>/\u003E</span>');
            } else {
                $this.append('<span>\u003E</span>');
            }
        });

        $html.find('.chl-comment').each(function() {
            jQuery(this).text('<!--' + jQuery(this).text() + '-->');
        });
        $html.find('attr').each(function() {
            let $this = jQuery(this),
                text = $this.text();
            if (text.indexOf('id') === 0) {
                $this.addClass('is-id');
            }
            if (text.indexOf('data-') === 0) {
                $this.addClass('is-data');
            }
            if (text.indexOf('class') === 0) {
                $this.addClass('is-class');
            }
            if ( text.indexOf('"') > 0 ) {
                let tSplit = text.split('"');
                if ( tSplit.length == 3 ) {
                    tSplit[1] = '<span class="chl-attr-val">' + tSplit[1] + '</span>';
                    $this.html(tSplit[0] + '"' + tSplit[1] + '"');
                } else {
                    console.warn('Too Many Attributes');
                }
            }
        });
    });

    // CSS Highlighter
    jQuery('.chl-css:not(.is-init)').each(function() {
        let $css = jQuery(this);
        $css.addClass('is-init');

        // Selectors
        $css.find('sel').each(function() {
            let $this = jQuery(this),
                text = $this.text();
            if ( text.indexOf('.') === 0) {
                $this.addClass('is-class');
            } else if ( text.indexOf('#') === 0) {
                $this.addClass('is-id');
            } else if ( text.indexOf(':') === 0) {
                $this.addClass('is-spec');
            } else {
                $this.addClass('is-tag');
            }

            if (text.indexOf('::') > 0) {
                let tSplit = text.split('::');
                $this.html(tSplit[0] + '<span class="chl-dots">::</span>' + '<span class="chl-spec">' + tSplit[1] + '</span>');
            } else if (text.indexOf(':') > 0) {
                let tSplit = text.split(':');
                $this.html(tSplit[0] + '<span class="chl-dots">:</span>' + '<span class="chl-spec">' + tSplit[1] + '</span>');
            }
        });

        // Attributes
        $css.find('attr').each(function() {
            let $this = jQuery(this),
                text = $this.text();
            if ( text.indexOf(':') > 0) {
                let tSplit = text.split(':'),
                    addCl01 = 'chl-css-attr-n',
                    addCl02 = 'chl-css-attr-v'

                if (tSplit[0] == 'content') {
                    $this.addClass('is-content');
                }
                if (tSplit[0] == 'color') {
                    $this.addClass('is-color');
                }
                if (tSplit[1].indexOf('var(') > -1) {
                    addCl02 += ' is-var';
                    let vSplit = tSplit[1].split('(');
                    let vSplit2 = vSplit[1].split(')');
                    tSplit[1] = '<span class="chl-css-var">' + vSplit[0] + '(' + '<span class="chl-css-var-val">'+ vSplit2[0] +'</span>' + ')' + '</span>';
                }
                $this.html('<span class="' + addCl01 + '">' + tSplit[0] +'</span>' + '<span class="chl-dots">:</span>' + '<span class="' + addCl02 + '">' + tSplit[1] + '</span>');
            }
        });
    });
}

// Init
codeHL();