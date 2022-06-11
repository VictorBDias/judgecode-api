import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const StoreCategorySchema = schema.create({
  name: schema.string({ trim: true, escape: true }, [
    rules.unique({ table: 'categories', column: 'name', whereNot: { is_deleted: true } }),
  ]),
  description: schema.string.optional({ trim: true, escape: true }, []),
})

export const EditCategorySchema = schema.create({
  name: schema.string.optional({ trim: true, escape: true }, [
    rules.unique({ table: 'categories', column: 'name', whereNot: { is_deleted: true } }),
  ]),
  description: schema.string.optional({ trim: true, escape: true }, []),
})
