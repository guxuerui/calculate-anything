import type { Table } from '~/types/index'

export const appName = 'Calculate Anything'

export const appDescription = 'Calculate Anything'

// regexp -> only number and up to one decimal point
export const numReg = /^\d+\.?\d*$/

// table data
export const calculateTable: Table[] = [
  {
    title: 'Clear',
    value: 'clear',
  },
  {
    title: 'Back',
    value: 'back',
  },
  {
    title: '%',
    value: '%',
  },
  {
    title: '÷',
    value: '/',
  },
  {
    title: '7',
    value: 7,
  },
  {
    title: '8',
    value: 8,
  },
  {
    title: '9',
    value: 9,
  },
  {
    title: 'x',
    value: '*',
  },
  {
    title: '4',
    value: 4,
  },
  {
    title: '5',
    value: 5,
  },
  {
    title: '6',
    value: 6,
  },
  {
    title: '-',
    value: '-',
  },
  {
    title: '1',
    value: 1,
  },
  {
    title: '2',
    value: 2,
  },
  {
    title: '3',
    value: 3,
  },
  {
    title: '+',
    value: '+',
  },
  {
    title: '0',
    value: 0,
  },
  {
    title: '.',
    value: '.',
  },
  {
    title: '=',
    value: '=',
  },
]
