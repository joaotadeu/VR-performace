import http from 'k6/http';
import { check, sleep } from 'k6';

// se preocupando com o desempenho do sistema
export let options = {
    stages: [
      {duration: '1m', target: 100 },
      {duration: '2m', target: 100 },
      {duration: '1m', target: 0} 
    ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1']
  }
    
};

export default function () {
  const response = http.get('https://portal.vr.com.br/api-web/comum/enumerations/VRPAT');
  //console.log(response.body);
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}