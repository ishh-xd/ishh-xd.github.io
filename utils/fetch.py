import requests  

class Response:  
    def __init__(self, response):  
        self.status = response.status_code  
        self.ok = response.ok  
        self.text = response.text  
        self.json = None  

        # Try parsing JSON if available  
        try:  
            self.json = response.json()  
        except ValueError:  
            pass  

def fetch(url, options=None):  
    method = options.get('method', 'GET') if options else 'GET'  
    headers = options.get('headers', {}) if options else {}  
    body = options.get('body', None) if options else None  

    response = requests.request(method, url, headers=headers, data=body)  
    return Response(response)
