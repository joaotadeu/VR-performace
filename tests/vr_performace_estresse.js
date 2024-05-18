import http from 'k6/http';
import { check, sleep } from 'k6';

// estrapolar os requisitos, ir ao extremo
export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Aumenta para 100 usuários em 2 minutos
    { duration: '5m', target: 100 }, // Mantém 100 usuarios por 5 minutos
    { duration: '5m', target: 200 }, 
    { duration: '5m', target: 200 }, 
    { duration: '2m', target: 0 },   // Reduz para 0 usuarios em 2 minutos
  ],
};

export default function () {
  let response = http.get('https://portal.vr.com.br/api-web/comum/enumerations/VRPAT');
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}
