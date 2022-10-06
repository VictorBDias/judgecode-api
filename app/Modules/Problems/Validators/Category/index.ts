import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const StoreCategorySchema = schema.create({
  name: schema.string({ trim: true, escape: true }, [
    rules.unique({ table: 'categories', column: 'name', whereNot: { is_deleted: true } }),
  ]),
  description: schema.string.optional({ trim: true, escape: true }, []),
  problems: schema.array.optional().members(
    schema.object().members({
      title: schema.string({ trim: true, escape: true }, []),
      body: schema.string({ trim: true, escape: true }, []),
      language: schema.string({ trim: true, escape: true }, []),
    })
  ),
  problems_ids: schema.array
    .optional()
    .members(
      schema.string({ trim: true, escape: true }, [
        rules.exists({ table: 'problems', column: 'id', whereNot: { is_deleted: true } }),
      ])
    ),
})

export const EditCategorySchema = schema.create({
  name: schema.string.optional({ trim: true, escape: true }, [
    rules.unique({ table: 'categories', column: 'name', whereNot: { is_deleted: true } }),
  ]),
  description: schema.string.optional({ trim: true, escape: true }, []),
  problems: schema.array.optional().members(
    schema.object().members({
      id: schema.string.optional({ trim: true, escape: true }, [
        rules.exists({ table: 'problems', column: 'id', whereNot: { is_deleted: true } }),
      ]),
      title: schema.string.optional({ trim: true, escape: true }, []),
      body: schema.string.optional({ trim: true, escape: true }, []),
      language: schema.string.optional({ trim: true, escape: true }, []),
    })
  ),
  problems_ids: schema.array
    .optional()
    .members(
      schema.string({ trim: true, escape: true }, [
        rules.exists({ table: 'problems', column: 'id', whereNot: { is_deleted: true } }),
      ])
    ),
})
