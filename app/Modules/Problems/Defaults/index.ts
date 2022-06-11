import { ModelType } from 'App/Shared/Interfaces/BaseInterface'
import Category from 'App/Modules/Problems/Models/Category'

export const CategoriesDefaults: Array<ModelType<typeof Category>> = [
  {
    name: 'Iniciante',
    description: 'Problemas básicos para quem está iniciando na programação... ',
  },
  {
    name: 'Ad-Hoc',
    description: 'Problemas de Simulação, Datas e Ad-Hoc no geral... ',
  },
  {
    name: 'Strings',
    description: 'Palindromos, Frequência, Ad-Hoc, LCS, Manipulação de Strings... ',
  },
  {
    name: 'Estruturas e Bibliotecas',
    description: 'Filas, Pilhas, Ordenação, Mapas... ',
  },
  {
    name: 'Matemática',
    description: 'Sistemas Numéricos, Número Primos, BigInteger... ',
  },
  {
    name: 'Paradigmas',
    description: 'Programação Dinâmica, Busca Binária, Gulosos, Backtracking... ',
  },
  {
    name: 'Grafos',
    description: 'Flood Fill, MST, SSSP, DAG, Fluxo Máximo, Árvores... ',
  },
  {
    name: 'Geometria Computacional',
    description: 'Pontos e Linhas, Polígonos... ',
  },
  {
    name: 'SQL',
    description: 'Linguagens de Consulta: Seleção, Inserção, Atualização, Criação ',
  },
]
