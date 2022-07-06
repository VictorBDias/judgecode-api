import { ModelType } from 'App/Shared/Interfaces/BaseInterface'
import Category from 'App/Modules/Problems/Models/Category'

export const CategoriesDefaults: Array<ModelType<typeof Category>> = [
  {
    name: 'Editor de Código',
    description: '',
  },
  {
    name: 'Ordernar Código',
    description: '',
  },
]
