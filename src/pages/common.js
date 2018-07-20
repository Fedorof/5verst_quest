import React from "react";
import IoSocialFacebook from "react-icons/lib/io/social-facebook";
import IoSocialTwitter from "react-icons/lib/io/social-twitter";


export const share = (text='Інтерактивне оповідання "Лиха Година"', label='Поділитися') => (
    <div className="share">
        { label }:
        <a href={ 'https://www.facebook.com/sharer/sharer.php?u='
                  + encodeURIComponent(window.location.href)
                  + '&quote=' + encodeURIComponent(text)}
           target="_blank"
           title="Facebook">
               <IoSocialFacebook/>
        </a>
        <a href={ 'https://twitter.com/intent/tweet?text='
                   + encodeURIComponent(text + ': ' + window.location.href)
                   + '&source='+ encodeURIComponent(window.location.href)}
           target="_blank"
           title="Twitter">
               <IoSocialTwitter/>
        </a>
    </div>
);
