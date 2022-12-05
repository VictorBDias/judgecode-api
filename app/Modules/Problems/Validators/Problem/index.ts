import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const StoreProblemSchema = schema.create({
  title: schema.string({ trim: true, escape: true }, []),
  body: schema.string({ trim: true }, []),
  language: schema.string({ trim: true, escape: true }, []),
  owner_id: schema.string.optional({ trim: true, escape: true }, [
    rules.exists({ table: 'users', column: 'id', whereNot: { is_deleted: true } }),
  ]),
})

export const EditProblemSchema = schema.create({
  title: schema.string.optional({ trim: true, escape: true }, []),
  body: schema.string.optional({ trim: true }, []),
  language: schema.string.optional({ trim: true, escape: true }, []),
  owner_id: schema.string.optional({ trim: true, escape: true }, [
    rules.exists({ table: 'users', column: 'id', whereNot: { is_deleted: true } }),
  ]),
})
