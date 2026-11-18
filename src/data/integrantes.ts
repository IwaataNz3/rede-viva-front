import type { Integrante } from '../types/integrante'
import fotoJulio from '../assets/integrantes/foto-julio.jpg'
import fotoGabriella from '../assets/integrantes/foto-gabriella.jpg'
import fotoAna from '../assets/integrantes/foto-ana.jpeg'
import fotoRafael from '../assets/integrantes/foto-rafael.jpg'
import fotoVictor from '../assets/integrantes/foto-victor.jpg'

export const integrantes: Integrante[] = [
  {
    id: 'julio',
    nome: 'Julio Cesar Iwata de Oliveira Barros',
    rm: 'RM573723',
    turma: '1TDSR',
    github: 'https://github.com/IwaataNz3',
    linkedin: 'https://www.linkedin.com/in/julioiwata/',
    foto: fotoJulio,
  },
  {
    id: 'gabriella',
    nome: 'Gabriella Serni Ponzetta',
    rm: 'RM566296',
    turma: '1TDSR',
    github: 'https://github.com/gabriellaserni',
    linkedin: 'https://www.linkedin.com/in/gabriellaserni/',
    foto: fotoGabriella,
  },
  {
    id: 'ana-paula',
    nome: 'Ana Paula Cunha Brum',
    rm: 'RM571359',
    turma: '1TDSR',
    github: 'https://github.com/abbrum',
    linkedin: 'https://www.linkedin.com/in/ana-paula-brum/',
    foto: fotoAna,
  },
  {
    id: 'rafael',
    nome: 'Rafael Santos Dias',
    rm: 'RM574105',
    turma: '1TDSR',
    github: 'https://github.com/realrafaelsd',
    linkedin: 'https://www.linkedin.com/in/rafaelsd/',
    foto: fotoRafael,
  },
  {
    id: 'victor',
    nome: 'Victor Felipe Silva Alencar',
    rm: 'RM574057',
    turma: '1TDSR',
    github: 'https://github.com/alencarVictor',
    linkedin: 'https://www.linkedin.com/in/victor-alencar-58623a3ba/',
    foto: fotoVictor,
  },
]
