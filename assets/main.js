(function() {


    get('title.json')
        .then(addTitle);
    get('chapters.json').then(function(chaptersList) {
        Promise.all(chaptersList.map(get)).then(function(chapters) {
            chapters.map(addChapter);
        });
    })

    function addTitle(title) {
        var h1 = document.createElement('h1');
        h1.innerHTML = title.content;
        document.body.appendChild(h1);
    }

    function addChapter(chapter) {
        var p = document.createElement('p');
        p.innerHTML = chapter.content;
        document.body.appendChild(p);
    }



    function get(url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function() {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    // Resolve the promise with the response text
                    if(/\.json/.test(url)) {
                        resolve(JSON.parse(req.response));
                    }
                } else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });
    }
})();
