import http from 'k6/http';
import { check, sleep } from 'k6';

//resiliencia, recuperação, mudanças abruptas e em curtos periodos
export let options = {
  stages: [
    { duration: '1m', target: 50 }, // Inicia com 50 usuarios virtuais
    { duration: '10s', target: 300 }, // Aumenta rapidamente para 300 usuarios em 10 segundos
    { duration: '3m', target: 300 }, // Mantém 300 usuarios por 3 minutos
    { duration: '10s', target: 50 }, // Reduz rapidamente para 50 usuarios em 10 segundos
    { duration: '1m', target: 50 }, // Mantém 50 usuarios pelo restante do tempo
  ],
};

export default function () {
  const response = http.get('https://portal.vr.com.br/api-web/comum/enumerations/VRPAT');
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
