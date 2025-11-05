import { useState } from 'react';
import { Search } from 'lucide-react';

export default function HTTPStatusSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const statusCodes = [
    // 1xx Informational
    { code: 100, message: 'Continue', description: 'The server has received the request headers and the client should proceed to send the request body' },
    { code: 101, message: 'Switching Protocols', description: 'The requester has asked the server to switch protocols' },
    { code: 102, message: 'Processing', description: 'The server has received and is processing the request, but no response is available yet' },
    
    // 2xx Success
    { code: 200, message: 'OK', description: 'The request succeeded' },
    { code: 201, message: 'Created', description: 'The request succeeded and a new resource was created' },
    { code: 202, message: 'Accepted', description: 'The request has been accepted for processing, but processing has not been completed' },
    { code: 203, message: 'Non-Authoritative Information', description: 'The server successfully processed the request but is returning information from another source' },
    { code: 204, message: 'No Content', description: 'The server successfully processed the request but is not returning any content' },
    { code: 205, message: 'Reset Content', description: 'The server successfully processed the request and is not returning any content, but requires the requester to reset the document view' },
    { code: 206, message: 'Partial Content', description: 'The server is delivering only part of the resource due to a range header sent by the client' },
    
    // 3xx Redirection
    { code: 300, message: 'Multiple Choices', description: 'Multiple options for the resource are available' },
    { code: 301, message: 'Moved Permanently', description: 'The resource has been moved permanently to a new URL' },
    { code: 302, message: 'Found', description: 'The resource has been temporarily moved to a different URL' },
    { code: 303, message: 'See Other', description: 'The response can be found under a different URL using a GET method' },
    { code: 304, message: 'Not Modified', description: 'The resource has not been modified since the last request' },
    { code: 307, message: 'Temporary Redirect', description: 'The resource is temporarily located at a different URL, and the request method should not be changed' },
    { code: 308, message: 'Permanent Redirect', description: 'The resource has been permanently moved to a different URL, and the request method should not be changed' },
    
    // 4xx Client Errors
    { code: 400, message: 'Bad Request', description: 'The server cannot process the request due to client error' },
    { code: 401, message: 'Unauthorized', description: 'Authentication is required and has failed or has not been provided' },
    { code: 402, message: 'Payment Required', description: 'Reserved for future use' },
    { code: 403, message: 'Forbidden', description: 'The server understood the request but refuses to authorize it' },
    { code: 404, message: 'Not Found', description: 'The requested resource could not be found' },
    { code: 405, message: 'Method Not Allowed', description: 'The request method is not supported for the requested resource' },
    { code: 406, message: 'Not Acceptable', description: 'The requested resource is capable of generating only content not acceptable according to the Accept headers' },
    { code: 407, message: 'Proxy Authentication Required', description: 'The client must first authenticate itself with the proxy' },
    { code: 408, message: 'Request Timeout', description: 'The server timed out waiting for the request' },
    { code: 409, message: 'Conflict', description: 'The request conflicts with the current state of the server' },
    { code: 410, message: 'Gone', description: 'The requested resource is no longer available and will not be available again' },
    { code: 411, message: 'Length Required', description: 'The request did not specify the length of its content' },
    { code: 412, message: 'Precondition Failed', description: 'The server does not meet one of the preconditions specified in the request' },
    { code: 413, message: 'Payload Too Large', description: 'The request entity is larger than the server is willing or able to process' },
    { code: 414, message: 'URI Too Long', description: 'The URI provided was too long for the server to process' },
    { code: 415, message: 'Unsupported Media Type', description: 'The request entity has a media type which the server does not support' },
    { code: 416, message: 'Range Not Satisfiable', description: 'The client has asked for a portion of the file, but the server cannot supply that portion' },
    { code: 417, message: 'Expectation Failed', description: 'The server cannot meet the requirements of the Expect request-header field' },
    { code: 418, message: "I'm a teapot", description: 'The server refuses to brew coffee because it is permanently a teapot' },
    { code: 421, message: 'Misdirected Request', description: 'The request was directed at a server that is not able to produce a response' },
    { code: 422, message: 'Unprocessable Entity', description: 'The request was well-formed but contains semantic errors' },
    { code: 423, message: 'Locked', description: 'The resource that is being accessed is locked' },
    { code: 424, message: 'Failed Dependency', description: 'The request failed due to failure of a previous request' },
    { code: 425, message: 'Too Early', description: 'The server is unwilling to risk processing a request that might be replayed' },
    { code: 426, message: 'Upgrade Required', description: 'The client should switch to a different protocol' },
    { code: 428, message: 'Precondition Required', description: 'The origin server requires the request to be conditional' },
    { code: 429, message: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time' },
    { code: 431, message: 'Request Header Fields Too Large', description: 'The server is unwilling to process the request because its header fields are too large' },
    { code: 451, message: 'Unavailable For Legal Reasons', description: 'The resource is unavailable for legal reasons' },
    
    // 5xx Server Errors
    { code: 500, message: 'Internal Server Error', description: 'The server encountered an unexpected condition that prevented it from fulfilling the request' },
    { code: 501, message: 'Not Implemented', description: 'The server does not support the functionality required to fulfill the request' },
    { code: 502, message: 'Bad Gateway', description: 'The server received an invalid response from an upstream server' },
    { code: 503, message: 'Service Unavailable', description: 'The server is currently unavailable (overloaded or down for maintenance)' },
    { code: 504, message: 'Gateway Timeout', description: 'The server did not receive a timely response from an upstream server' },
    { code: 505, message: 'HTTP Version Not Supported', description: 'The server does not support the HTTP protocol version used in the request' },
    { code: 506, message: 'Variant Also Negotiates', description: 'The server has an internal configuration error' },
    { code: 507, message: 'Insufficient Storage', description: 'The server is unable to store the representation needed to complete the request' },
    { code: 508, message: 'Loop Detected', description: 'The server detected an infinite loop while processing the request' },
    { code: 510, message: 'Not Extended', description: 'Further extensions to the request are required for the server to fulfill it' },
    { code: 511, message: 'Network Authentication Required', description: 'The client needs to authenticate to gain network access' },
  ];

  const filteredCodes = statusCodes.filter(status => {
    const query = searchQuery.toLowerCase();
    return (
      status.code.toString().includes(query) ||
      status.message.toLowerCase().includes(query) ||
      status.description.toLowerCase().includes(query)
    );
  });

  const getStatusColor = (code) => {
    if (code < 200) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (code < 300) return 'bg-green-100 text-green-800 border-green-300';
    if (code < 400) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (code < 500) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">HTTP Status Codes</h1>
          <p className="text-slate-300">Search by code number or description</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search status codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-3">
          {filteredCodes.length > 0 ? (
            filteredCodes.map((status) => (
              <div
                key={status.code}
                className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-4 hover:shadow-xl hover:border-slate-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className={`flex-shrink-0 px-3 py-1 rounded-md font-mono font-bold text-lg border-2 ${getStatusColor(status.code)}`}>
                    {status.code}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{status.message}</h3>
                    <p className="text-slate-300 text-sm">{status.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg">No status codes found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {searchQuery === '' && (
          <div className="mt-8 text-center text-sm text-slate-400">
            Showing {filteredCodes.length} status codes
          </div>
        )}
      </div>
    </div>
  );
}

