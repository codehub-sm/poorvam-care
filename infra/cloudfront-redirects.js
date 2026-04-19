// CloudFront Function — poorvam-care-redirects
// Deploy to: CloudFront distribution → Functions → Viewer Request
// Purpose:
//   1. 301 redirect trailing slashes (except root) → non-trailing version
//   2. 301 redirect legacy .html URLs (e.g. /occupationalTherapy.html) → /
//   3. Rewrite SPA clean URLs to /index.html so S3 serves the React app
//
// Apply via AWS Console or AWS CLI:
//   aws cloudfront create-function \
//     --name poorvam-care-redirects \
//     --function-config Comment="SPA + 301 redirects",Runtime=cloudfront-js-2.0 \
//     --function-code fileb://infra/cloudfront-redirects.js

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // 1. Legacy .html redirects (case-insensitive)
  var legacy = {
    '/occupationaltherapy.html': '/',
    '/speechtherapy.html': '/',
    '/aba.html': '/',
    '/specialeducation.html': '/'
  };
  var lowerUri = uri.toLowerCase();
  if (legacy[lowerUri]) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: 'https://poorvamcare.in' + legacy[lowerUri] },
        'cache-control': { value: 'max-age=3600' }
      }
    };
  }

  // 2. Trailing slash redirect (except root)
  if (uri.length > 1 && uri.endsWith('/')) {
    var stripped = uri.slice(0, -1);
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: 'https://poorvamcare.in' + stripped },
        'cache-control': { value: 'max-age=3600' }
      }
    };
  }

  // 3. SPA fallback — if URI has no file extension and isn't the root,
  //    rewrite to the prerendered HTML path or fall back to /index.html
  var hasFileExtension = /\.[a-zA-Z0-9]+$/.test(uri);
  if (!hasFileExtension && uri !== '/') {
    // Rewrite /some-page → /some-page/index.html so prerendered output is served.
    // If prerender didn't run for this route, S3 404 handling should rewrite to /index.html.
    request.uri = uri + '/index.html';
  }

  return request;
}
