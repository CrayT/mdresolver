export default {
    saveAndDownload (content, filename) {
        var blob = new Blob([content], {type: 'text/plain'});

        window.URL = window.URL || window.webkitURL;
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link); // Firefox workaround, see #6594

        link.href = URL.createObjectURL(blob);
        link.download = filename || 'data.json';
        link.click();
    }
}