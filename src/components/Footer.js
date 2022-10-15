import React from 'react';

export default class Footer extends React.Component {
  render() {
    const carlosLinkedIn = 'https://www.linkedin.com/in/carlosbprado/';
    const ebraimLinkedIn = 'https://www.linkedin.com/in/ebraimoliveira2236/';
    const leonardoLinkedIn = 'https://www.linkedin.com/in/leonardo-selegar/';
    const lucianoLinkedIn = 'https://www.linkedin.com/in/lucianoalmeidajr/';
    const viniciusLinkedIn = 'https://www.linkedin.com/in/vinicius-bortoletto/';

    return (
      <footer className="text-slate-400 text-sm mt-10">
        <p>Desenvolvido por</p>
        <p className="font-bold">
          <a
            href={ carlosLinkedIn }
            className="hover:underline"
          >
            Carlos Prado
          </a>
          ,
          <a
            href={ ebraimLinkedIn }
            className="hover:underline"
          >
            {' '}
            Ebraim Oliveira
          </a>
          ,
          <a
            href={ leonardoLinkedIn }
            className="hover:underline"
          >
            {' '}
            Leonardo Selegar
          </a>
          ,
          <a
            href={ lucianoLinkedIn }
            className="hover:underline"
          >
            {' '}
            Luciano Almeira
            {' '}
          </a>
          e
          <a
            href={ viniciusLinkedIn }
            className="hover:underline"
          >
            {' '}
            Vinicius Bortoletto
          </a>
          .
        </p>
      </footer>
    );
  }
}
