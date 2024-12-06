function loadGoogleAnalytics() {
    // Create the <script> tag for gtag.js
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = "https://www.googletagmanager.com/gtag/js?id=G-9QCRQ7NQCZ";

    // Append the <script> tag to the <head>
    document.head.appendChild(scriptTag);

    // Set up the gtag configuration after the script loads
    scriptTag.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-9QCRQ7NQCZ');
    };
}

window.onload = function () {
    loadGoogleAnalytics();
};




